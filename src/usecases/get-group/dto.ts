import { EntityId } from '@shared/protocols/entity.protocol';
import { Group } from '@entities/group.entity';
import { CurrentUserDto } from '@shared/decorators';

export interface IGetGroupInput {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IGetGroupOutput = Promise<Group>;
