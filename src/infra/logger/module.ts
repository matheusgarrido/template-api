// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        // Esta é a configuração mais simples e segura.
        // Ela usa a sintaxe de atalho do Pino para o transport.
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
        // Nível de log para desenvolvimento
        level: 'debug',
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
