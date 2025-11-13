import { InternalServerError } from '@shared/protocols/error.protocol';

const DEFAULT_MESSAGE = 'internal-server-error';

export class DatabaseError extends InternalServerError {
  constructor() {
    super(DEFAULT_MESSAGE, 1);
  }
}

export class DatabaseConnectionError extends InternalServerError {
  constructor() {
    super('database-connection-error', 2);
  }
}
