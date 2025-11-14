import { EntityId } from '@entities/entity';
import { CurrentUserDto } from '@shared/decorators';

export interface IRemoveUserInputBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface IRemoveUserInput extends IRemoveUserInputBody {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IRemoveUserOutput = Promise<boolean>;
