import { User } from '@entities/user.entity';
import { CurrentUserDto } from '@shared/decorators';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IListUsersInput {
  currentUser: CurrentUserDto;
}

export type IListUsersOutput = Promise<IRepositoryFindAllResponse<User>>;
