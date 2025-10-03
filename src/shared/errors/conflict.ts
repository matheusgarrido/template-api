import { ConflictError } from '@shared/protocols/error.protocol';

export class UserAlreadyExistsError extends ConflictError {
  constructor() {
    super('user-already-exists', 1);
  }
}

export class UserEmailAlreadyUsedError extends ConflictError {
  constructor() {
    super('user-email-already-used', 2);
  }
}
