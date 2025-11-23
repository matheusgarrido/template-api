import { Group } from '@entities/group.entity';
import { CurrentUserDto } from '@shared/decorators';
import { IRepositoryFindAllResponse } from '@shared/protocols/repository.protocol';

export interface IListGroupsInput {
  currentUser: CurrentUserDto;
}

export type IListGroupsOutput = Promise<IRepositoryFindAllResponse<Group>>;
