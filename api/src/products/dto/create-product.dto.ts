import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  brandId: z.string().min(1),
  categoryId: z.string().min(1),
  pricePerDay: z.coerce.number().int().positive(),
  deposit: z.coerce.number().int().nonnegative(),
  image: z.string().min(1),
  description: z.string().min(1),
  available: z.coerce.boolean(),
  published: z.coerce.boolean(),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}
