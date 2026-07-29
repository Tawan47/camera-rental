import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

export type Product = {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  published: boolean;
  description: string;
  specs: { label: string; value: string }[];
  includes: string[];
};

const productWithRelations = {
  include: { brand: true, category: true },
};

type ProductRow = Prisma.ProductGetPayload<{
  include: { brand: true; category: true };
}>;

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand.name,
    brandId: row.brandId,
    category: row.categoryId,
    pricePerDay: row.pricePerDay,
    deposit: row.deposit,
    image: row.image,
    rating: row.rating,
    reviewCount: row.reviewCount,
    available: row.available,
    published: row.published,
    description: row.description,
    specs: row.specs as { label: string; value: string }[],
    includes: row.includes,
  };
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({
      ...productWithRelations,
      orderBy: { name: 'asc' },
    });
    return rows.map(toProduct);
  }

  async findPublished(): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({
      ...productWithRelations,
      where: { published: true },
      orderBy: { name: 'asc' },
    });
    return rows.map(toProduct);
  }

  async findOne(id: string): Promise<Product> {
    const row = await this.prisma.product.findUnique({
      ...productWithRelations,
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return toProduct(row);
  }

  async findRelated(
    categoryId: string,
    excludeId: string,
    limit = 3,
  ): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({
      ...productWithRelations,
      where: { categoryId, published: true, id: { not: excludeId } },
      orderBy: { name: 'asc' },
      take: limit,
    });
    return rows.map(toProduct);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const row = await this.prisma.product.create({
      ...productWithRelations,
      data: { ...dto, specs: [], includes: [] },
    });
    return toProduct(row);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const row = await this.prisma.product.update({
      ...productWithRelations,
      where: { id },
      data: dto,
    });
    return toProduct(row);
  }

  async remove(id: string): Promise<void> {
    const bundleItemCount = await this.prisma.bundleItem.count({
      where: { productId: id },
    });
    if (bundleItemCount > 0) {
      throw new ConflictException(
        'ไม่สามารถลบสินค้านี้ได้ เนื่องจากยังถูกใช้อยู่ในเซ็ตเช่า',
      );
    }
    await this.prisma.product.delete({ where: { id } });
  }

  async togglePublished(id: string, currentValue: boolean): Promise<Product> {
    const row = await this.prisma.product.update({
      ...productWithRelations,
      where: { id },
      data: { published: !currentValue },
    });
    return toProduct(row);
  }
}
