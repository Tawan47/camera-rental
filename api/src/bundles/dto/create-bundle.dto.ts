import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const bundleItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().positive().default(1),
  note: z.string().optional(),
});

export const createBundleSchema = z.object({
  name: z.string().min(1),
  brandId: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  pricePerDay: z.coerce.number().int().positive(),
  deposit: z.coerce.number().int().nonnegative(),
  image: z.string().min(1),
  description: z.string().min(1),
  available: z.coerce.boolean(),
  published: z.coerce.boolean(),
  items: z.array(bundleItemSchema).min(1),
});

export class CreateBundleDto extends createZodDto(createBundleSchema) {}
