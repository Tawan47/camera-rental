import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import type { CreateCategoryDto } from './dto/create-category.dto';
import type { UpdateCategoryDto } from './dto/update-category.dto';

export type Category = {
  id: string;
  name: string;
  icon: string;
  productCount: number;
};

type CategoryRow = Prisma.CategoryGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

function toCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    productCount: row._count.products,
  };
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
    return rows.map(toCategory);
  }

  async findOne(id: string): Promise<Category> {
    const row = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!row) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return toCategory(row);
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const row = await this.prisma.category.create({
      data: dto,
      include: { _count: { select: { products: true } } },
    });
    return toCategory(row);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const row = await this.prisma.category.update({
      where: { id },
      data: dto,
      include: { _count: { select: { products: true } } },
    });
    return toCategory(row);
  }

  async remove(id: string): Promise<void> {
    const count = await this.prisma.product.count({
      where: { categoryId: id },
    });
    if (count > 0) {
      throw new ConflictException(
        'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากยังมีสินค้าอยู่ในหมวดหมู่นี้',
      );
    }
    await this.prisma.category.delete({ where: { id } });
  }
}
