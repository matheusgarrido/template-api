import { NotFoundError } from '@shared/protocols/error.protocol';

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('user-not-found', 1);
  }
}

export class GroupNotFoundError extends NotFoundError {
  constructor() {
    super('group-not-found', 2);
  }
}
