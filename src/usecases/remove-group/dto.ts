import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';
import { Group } from '@entities/group.entity';

export interface IRemoveGroupInput {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IRemoveGroupOutput = Promise<{ group: Group; deleted: boolean }>;
