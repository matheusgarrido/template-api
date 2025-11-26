import { UnauthorizedError } from '@shared/protocols/error.protocol';

export class InvalidUserCredentialsError extends UnauthorizedError {
  constructor() {
    super('invalid-user-credentials', 1);
  }
}

export class InvalidTokenAccessError extends UnauthorizedError {
  constructor() {
    super('invalid-token-access', 2);
  }
}
