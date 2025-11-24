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

export class UserAlreadyDeletedError extends ConflictError {
  constructor() {
    super('user-already-deleted', 3);
  }
}

export class RoleAlreadyExistsError extends ConflictError {
  constructor() {
    super('role-already-exists', 4);
  }
}

export class RoleAlreadyDeletedError extends ConflictError {
  constructor() {
    super('role-already-deleted', 5);
  }
}
