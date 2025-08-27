import { EntityId } from '@entities/entity';

export interface ICreateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export type ICreateUserOutput = Promise<EntityId>;
