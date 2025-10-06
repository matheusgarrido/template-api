import { User } from '@entities/user.entity';
import { CurrentUser } from '@shared/decorators';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IListUserInput {
  currentUser: CurrentUser;
}

export type IListUserOutput = Promise<IRepositoryFindAllResponse<User>>;
