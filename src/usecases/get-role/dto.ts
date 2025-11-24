import { EntityId } from '@shared/protocols/entity.protocol';
import { Role } from '@entities/role.entity';
import { CurrentUserDto } from '@shared/decorators';

export interface IGetRoleInput {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IGetRoleOutput = Promise<Role>;
