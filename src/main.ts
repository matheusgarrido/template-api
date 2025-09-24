import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import createDocument from '@infra/docs';
// import { Logger } from 'nestjs-pino';
import { setupGlobalServices } from '@infra/logger/config';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule, {
    bufferLogs: isProd,
  });

  // app.useLogger(app.get(Logger));

  setupGlobalServices(app);
  // app.useLogger(new Logger());

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  createDocument(app);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
