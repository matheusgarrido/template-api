import { NotFoundError } from '@shared/protocols/error.protocol';

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('user-not-found', 1);
  }
}

export class RoleNotFoundError extends NotFoundError {
  constructor() {
    super('role-not-found', 2);
  }
}
