import { EntityId } from 'src/shared/entity';

export interface ICreateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export interface ICreateUserOutput {
  id: EntityId;
}
