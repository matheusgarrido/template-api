import { EntityId } from '@shared/protocols/entity.protocol';
export class ICreateUserInput {
  name: string;
  email: string;
  password: string;
}

export type ICreateUserOutput = Promise<EntityId>;
