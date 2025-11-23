import { CurrentUserDto } from '@shared/decorators';
import { EntityId } from '@shared/protocols/entity.protocol';

export interface ICreateGroupInputBody {
  name: string;
  description?: string;
}
export interface ICreateGroupInput extends ICreateGroupInputBody {
  currentUser: CurrentUserDto;
}

export type ICreateGroupOutput = Promise<EntityId>;
