import { PinoLogger } from 'nestjs-pino';

export interface IGateway {
  readonly logger: PinoLogger;
}
