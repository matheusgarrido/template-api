import { EntityId } from '@entities/entity';
import { CurrentUser } from '@shared/decorators';

export interface IRemoveUserInputBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface IRemoveUserInput extends IRemoveUserInputBody {
  id: EntityId;
  currentUser: CurrentUser;
}

export type IRemoveUserOutput = Promise<boolean>;
