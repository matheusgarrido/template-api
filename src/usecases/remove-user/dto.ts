import { EntityId } from '@shared/protocols/entity.protocol';
import { CurrentUserDto } from '@shared/decorators';
import { User } from '@entities/user.entity';

export interface IRemoveUserInputBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface IRemoveUserInput extends IRemoveUserInputBody {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IRemoveUserOutput = Promise<{ user: User; deleted: boolean }>;
