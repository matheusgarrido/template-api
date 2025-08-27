import { User } from '@entities/users.entity';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IGetUserInput {
  id: string;
}

export type IGetUserOutput = Promise<IRepositoryFindAllResponse<User>>;
