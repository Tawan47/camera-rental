import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateBrandSchema = z.object({
  name: z.string().min(1),
  logo: z.string().min(1),
});

export class UpdateBrandDto extends createZodDto(updateBrandSchema) {}
