import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppService } from './app.service';
import { AllExceptionsFilter } from '@infra/logger/all-exceptions.filter';
import * as modules from '@infra/modules';
import * as services from '@infra/services';

const redact = ['req.headers', 'req.remoteAddress', 'res.headers'];

@Module({
  imports: [
    ...Object.values(modules),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
        autoLogging: false,
        redact,
        serializers: {
          req: () => undefined, // remove req do log
          res: () => undefined, // remove res do log
        },
      },
    }),
  ],
  providers: [
    AppService,
    ...Object.values(services),
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
