import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateCategorySchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
});

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
