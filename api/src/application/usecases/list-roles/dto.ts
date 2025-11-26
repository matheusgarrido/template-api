import { Role } from '@entities/role.entity';
import { CurrentUserDto } from '@shared/decorators';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IListRolesInput {
  currentUser: CurrentUserDto;
}

export type IListRolesOutput = Promise<IRepositoryFindAllResponse<Role>>;
