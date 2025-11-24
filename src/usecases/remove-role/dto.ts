import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';
import { Role } from '@entities/role.entity';

export interface IRemoveRoleInput {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IRemoveRoleOutput = Promise<{ role: Role; deleted: boolean }>;
