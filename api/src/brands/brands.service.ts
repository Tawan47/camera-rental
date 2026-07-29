import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import type { CreateBrandDto } from './dto/create-brand.dto';
import type { UpdateBrandDto } from './dto/update-brand.dto';

export type Brand = {
  id: string;
  name: string;
  logo: string;
  productCount: number;
};

type BrandRow = Prisma.BrandGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

function toBrand(row: BrandRow): Brand {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    productCount: row._count.products,
  };
}

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Brand[]> {
    const rows = await this.prisma.brand.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
    return rows.map(toBrand);
  }

  async findOne(id: string): Promise<Brand> {
    const row = await this.prisma.brand.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!row) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return toBrand(row);
  }

  async create(dto: CreateBrandDto): Promise<Brand> {
    const row = await this.prisma.brand.create({
      data: dto,
      include: { _count: { select: { products: true } } },
    });
    return toBrand(row);
  }

  async update(id: string, dto: UpdateBrandDto): Promise<Brand> {
    const row = await this.prisma.brand.update({
      where: { id },
      data: dto,
      include: { _count: { select: { products: true } } },
    });
    return toBrand(row);
  }

  async remove(id: string): Promise<void> {
    const count = await this.prisma.product.count({ where: { brandId: id } });
    if (count > 0) {
      throw new ConflictException(
        'ไม่สามารถลบยี่ห้อนี้ได้ เนื่องจากยังมีสินค้าของยี่ห้อนี้อยู่',
      );
    }
    await this.prisma.brand.delete({ where: { id } });
  }
}
