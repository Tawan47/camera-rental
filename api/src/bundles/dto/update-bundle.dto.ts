import { createZodDto } from 'nestjs-zod';
import { createBundleSchema } from './create-bundle.dto';

export class UpdateBundleDto extends createZodDto(createBundleSchema) {}
