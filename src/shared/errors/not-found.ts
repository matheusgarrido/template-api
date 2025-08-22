import { NotFoundError } from '@shared/protocols/error.protocol';

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('user-not-found', 1);
  }
}
