import { EntityId } from '@shared/protocols/entity.protocol';
export interface ICreateGroupInput {
  name: string;
  description?: string;
}

export type ICreateGroupOutput = Promise<EntityId>;
