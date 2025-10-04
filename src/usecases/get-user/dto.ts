import { User } from '@entities/users.entity';
import { CurrentUser } from '@shared/decorators';

export interface IGetUserInput {
  id: string;
  currentUser: CurrentUser;
}

export type IGetUserOutput = Promise<User>;
