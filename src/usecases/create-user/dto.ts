import { EntityId } from '@entities/entity';

export class ICreateUserInput {
  name: string;
  email: string;
  password: string;
}

export type ICreateUserOutput = Promise<EntityId>;
