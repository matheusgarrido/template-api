import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from '@infra/docs';
import { setupGlobalServices } from '@infra/logger/config';
import { createValidationPipe } from '@infra/config/validation/validation.pipe';

export async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule, {
    bufferLogs: isProd,
  });

  app.useGlobalPipes(createValidationPipe());

  setupGlobalServices(app);

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  createDocument(app);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
