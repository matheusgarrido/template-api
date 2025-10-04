import { EntityId } from '@entities/entity';
import { CurrentUser } from '@shared/decorators';

export interface IUpdateUserInputBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUpdateUserInput extends IUpdateUserInputBody {
  id: EntityId;
  currentUser: CurrentUser;
}

export type IUpdateUserOutput = Promise<EntityId>;
