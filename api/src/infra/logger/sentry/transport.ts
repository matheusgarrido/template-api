import { Writable } from 'stream';
import * as Sentry from '@sentry/node';

class SentryTransport extends Writable {
  _write(chunk: any, encoding: string, callback: () => void): void {
    const log = JSON.parse(chunk.toString());

    // Apenas envie logs de erro para o Sentry
    if (log.level === 50) {
      // O nível 50 corresponde a 'error' no Pino
      Sentry.captureException(log.err, {
        tags: {
          logger: log.name || 'Pino',
        },
        extra: log,
      });
    }
    callback();
  }
}

export const sentryStream = new SentryTransport();
