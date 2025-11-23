import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';

export interface IUpdateGroupInputBody {
  name?: string;
  description?: string;
}

export interface IUpdateGroupInput extends IUpdateGroupInputBody {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IUpdateGroupOutput = Promise<EntityId>;
