import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import type { CreateBundleDto } from './dto/create-bundle.dto';
import type { UpdateBundleDto } from './dto/update-bundle.dto';

export type BundleItemView = {
  productId: string;
  productName: string;
  quantity: number;
  note: string | null;
};

export type Bundle = {
  id: string;
  name: string;
  brand: string | null;
  brandId: string | null;
  category: string | null;
  categoryId: string | null;
  pricePerDay: number;
  deposit: number;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  published: boolean;
  description: string;
  items: BundleItemView[];
};

const bundleWithRelations = {
  include: {
    brand: true,
    category: true,
    items: { include: { product: true } },
  },
};

type BundleRow = Prisma.BundleGetPayload<{
  include: {
    brand: true;
    category: true;
    items: { include: { product: true } };
  };
}>;

function toBundle(row: BundleRow): Bundle {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand?.name ?? null,
    brandId: row.brandId,
    category: row.categoryId,
    categoryId: row.categoryId,
    pricePerDay: row.pricePerDay,
    deposit: row.deposit,
    image: row.image,
    rating: row.rating,
    reviewCount: row.reviewCount,
    available: row.available,
    published: row.published,
    description: row.description,
    items: row.items.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      note: item.note,
    })),
  };
}

@Injectable()
export class BundlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Bundle[]> {
    const rows = await this.prisma.bundle.findMany({
      ...bundleWithRelations,
      orderBy: { name: 'asc' },
    });
    return rows.map(toBundle);
  }

  async findPublished(): Promise<Bundle[]> {
    const rows = await this.prisma.bundle.findMany({
      ...bundleWithRelations,
      where: { published: true },
      orderBy: { name: 'asc' },
    });
    return rows.map(toBundle);
  }

  async findOne(id: string): Promise<Bundle> {
    const row = await this.prisma.bundle.findUnique({
      ...bundleWithRelations,
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`Bundle ${id} not found`);
    }
    return toBundle(row);
  }

  async create(dto: CreateBundleDto): Promise<Bundle> {
    const { items, ...bundleData } = dto;
    const row = await this.prisma.bundle.create({
      ...bundleWithRelations,
      data: {
        ...bundleData,
        items: { create: items },
      },
    });
    return toBundle(row);
  }

  async update(id: string, dto: UpdateBundleDto): Promise<Bundle> {
    const { items, ...bundleData } = dto;
    const row = await this.prisma.bundle.update({
      ...bundleWithRelations,
      where: { id },
      data: {
        ...bundleData,
        items: {
          deleteMany: {},
          create: items,
        },
      },
    });
    return toBundle(row);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.bundle.delete({ where: { id } });
  }

  async togglePublished(id: string, currentValue: boolean): Promise<Bundle> {
    const row = await this.prisma.bundle.update({
      ...bundleWithRelations,
      where: { id },
      data: { published: !currentValue },
    });
    return toBundle(row);
  }
}
