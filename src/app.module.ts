import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UsersModule } from '@modules/users.module';
import { HealthModule } from '@modules/health.module';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@infra/logger/all-exceptions.filter';

const redact = ['req.headers', 'req.remoteAddress', 'res.headers'];

@Module({
  imports: [
    UsersModule,
    HealthModule,
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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
