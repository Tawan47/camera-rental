import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const togglePublishedSchema = z.object({
  currentValue: z.boolean(),
});

export class TogglePublishedDto extends createZodDto(togglePublishedSchema) {}
