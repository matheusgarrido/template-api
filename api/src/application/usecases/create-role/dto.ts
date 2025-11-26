import { CurrentUserDto } from '@shared/decorators';
import { EntityId } from '@shared/protocols/entity.protocol';

export interface ICreateRoleInputBody {
  name: string;
  description?: string;
}
export interface ICreateRoleInput extends ICreateRoleInputBody {
  currentUser: CurrentUserDto;
}

export type ICreateRoleOutput = Promise<EntityId>;
