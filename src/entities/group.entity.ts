import { Entity } from './entity';

export interface IGroupEntity {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Group extends Entity<IGroupEntity> {
  get name() {
    return this.properties.name;
  }

  get description() {
    return this.properties.description;
  }

  get createdAt() {
    return this.properties.createdAt;
  }

  get updatedAt() {
    return this.properties.updatedAt;
  }

  get deletedAt() {
    return this.properties.deletedAt;
  }
}
