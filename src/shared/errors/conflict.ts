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

export class GroupAlreadyExistsError extends ConflictError {
  constructor() {
    super('group-already-exists', 4);
  }
}

export class GroupAlreadyDeletedError extends ConflictError {
  constructor() {
    super('group-already-deleted', 5);
  }
}
