import { EntityId } from '@entities/entity';

export interface IUpdateUserInput {
  id: EntityId;
  name?: string;
  email?: string;
  password?: string;
}

export type IUpdateUserOutput = Promise<EntityId>;
