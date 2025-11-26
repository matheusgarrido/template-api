import { EntityId } from '@shared/protocols/entity.protocol';
import { User } from '@entities/user.entity';
import { CurrentUserDto } from '@shared/decorators';

export interface IGetUserInput {
  id: EntityId;
  currentUser: CurrentUserDto;
}

export type IGetUserOutput = Promise<User>;
