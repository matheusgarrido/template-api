import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';

export interface IUpdateUserInputBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUpdateUserInput extends IUpdateUserInputBody {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IUpdateUserOutput = Promise<EntityId>;
