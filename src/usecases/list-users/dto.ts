import { User } from '@entities/user.entity';
import { CurrentUserDto } from '@shared/decorators';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IListUserInput {
  currentUser: CurrentUserDto;
}

export type IListUserOutput = Promise<IRepositoryFindAllResponse<User>>;
