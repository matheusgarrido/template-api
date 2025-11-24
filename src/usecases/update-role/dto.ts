import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';

export interface IUpdateRoleInputBody {
  name?: string;
  description?: string;
}

export interface IUpdateRoleInput extends IUpdateRoleInputBody {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IUpdateRoleOutput = Promise<EntityId>;
