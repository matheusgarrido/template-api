import { LoggerModule } from 'nestjs-pino';

export const PinoLogger = LoggerModule.forRoot({
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
});
