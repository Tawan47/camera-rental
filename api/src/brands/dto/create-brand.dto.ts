import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createBrandSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  logo: z.string().min(1),
});

export class CreateBrandDto extends createZodDto(createBrandSchema) {}
