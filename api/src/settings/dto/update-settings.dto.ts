import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateSettingsSchema = z.object({
  shopName: z.string().min(1),
  logoImage: z.string().min(1),
  instagramHandle: z.string().min(1),
  contactPhone: z.string().min(1),
  contactPerson: z.string().min(1),
  footerTagline: z.string().min(1),
  businessHoursLine1: z.string().min(1),
  businessHoursLine2: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),

  heroEyebrow: z.string().min(1),
  heroTitleLine1: z.string().min(1),
  heroTitleLine2: z.string(),
  heroSubheading: z.string().min(1),
  heroSearchPlaceholder: z.string().min(1),
  popularSearchLabel: z.string().min(1),
  popularSearchTags: z.array(z.string().min(1)),

  categoriesHeading: z.string().min(1),
  categoriesSubheading: z.string().min(1),
  brandsHeading: z.string().min(1),
  brandsSubheading: z.string().min(1),
  featuredHeading: z.string().min(1),
  featuredSubheading: z.string().min(1),
});

export class UpdateSettingsDto extends createZodDto(updateSettingsSchema) {}
