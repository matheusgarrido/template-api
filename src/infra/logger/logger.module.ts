// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

const redact = ['req.headers', 'req.remoteAddress', 'res.headers'];

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
        autoLogging: false,
        redact,
        serializers: {
          req: () => undefined, // remove req do log
          res: () => undefined, // remove res do log
        },
        level: 'debug',
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
