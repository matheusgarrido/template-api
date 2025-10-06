import { EntityId } from '@entities/entity';

export interface ICreateGroupInput {
  name: string;
  description?: string;
}

export type ICreateGroupOutput = Promise<EntityId>;
