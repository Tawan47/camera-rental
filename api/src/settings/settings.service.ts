import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateSettingsDto } from './dto/update-settings.dto';

const SINGLETON_ID = 'singleton';

export type SiteSettings = {
  shopName: string;
  logoImage: string;
  instagramHandle: string;
  contactPhone: string;
  contactPerson: string;
  footerTagline: string;
  businessHoursLine1: string;
  businessHoursLine2: string;
  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubheading: string;
  heroSearchPlaceholder: string;
  popularSearchLabel: string;
  popularSearchTags: string[];

  categoriesHeading: string;
  categoriesSubheading: string;
  brandsHeading: string;
  brandsSubheading: string;
  featuredHeading: string;
  featuredSubheading: string;
};

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(): Promise<SiteSettings> {
    const row = await this.prisma.siteSettings.findUnique({
      where: { id: SINGLETON_ID },
    });
    if (!row) {
      throw new NotFoundException('Site settings not found');
    }
    return row;
  }

  async update(dto: UpdateSettingsDto): Promise<SiteSettings> {
    return this.prisma.siteSettings.update({
      where: { id: SINGLETON_ID },
      data: dto,
    });
  }
}
