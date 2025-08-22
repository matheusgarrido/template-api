import { ConflictError } from '@shared/protocols/error.protocol';

export class UserAlreadyExistsError extends ConflictError {
  constructor() {
    super('user-already-exists', 1);
  }
}
