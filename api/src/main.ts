import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:4000' });
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
