import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateInquiryDto } from './dto/create-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    if (dto.productId) {
      const product = await this.prisma.product.findUnique({
        where: { id: dto.productId },
      });
      if (!product) {
        throw new NotFoundException(`Product ${dto.productId} not found`);
      }
    }
    if (dto.bundleId) {
      const bundle = await this.prisma.bundle.findUnique({
        where: { id: dto.bundleId },
      });
      if (!bundle) {
        throw new NotFoundException(`Bundle ${dto.bundleId} not found`);
      }
    }

    return this.prisma.inquiry.create({ data: dto });
  }

  async findAll(limit?: number) {
    return this.prisma.inquiry.findMany({
      include: { product: true, bundle: true },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: limit } : {}),
    });
  }

  async stats() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [total, last7Days, forProduct, forBundle, topProducts] =
      await Promise.all([
        this.prisma.inquiry.count(),
        this.prisma.inquiry.count({
          where: { createdAt: { gte: sevenDaysAgo } },
        }),
        this.prisma.inquiry.count({ where: { productId: { not: null } } }),
        this.prisma.inquiry.count({ where: { bundleId: { not: null } } }),
        this.prisma.inquiry.groupBy({
          by: ['productId'],
          where: { productId: { not: null } },
          _count: { productId: true },
          orderBy: { _count: { productId: 'desc' } },
          take: 5,
        }),
      ]);

    const topProductIds = topProducts
      .map((row) => row.productId)
      .filter((id): id is string => id !== null);
    const products = await this.prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true },
    });
    const productNameById = new Map(products.map((p) => [p.id, p.name]));

    return {
      total,
      last7Days,
      byType: { product: forProduct, bundle: forBundle },
      topProducts: topProducts.map((row) => ({
        productId: row.productId,
        name: row.productId
          ? (productNameById.get(row.productId) ?? null)
          : null,
        count: row._count.productId,
      })),
    };
  }

  async remove(id: string): Promise<void> {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) {
      throw new NotFoundException(`Inquiry ${id} not found`);
    }
    await this.prisma.inquiry.delete({ where: { id } });
  }
}
