import { Entity } from './entity';

export interface IUserEntityProps {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity extends Entity<IUserEntityProps> {
  constructor(properties: IUserEntityProps, id?: string) {
    super(properties, id);
  }

  get name() {
    return this.$properties.name;
  }

  get email() {
    return this.$properties.email;
  }

  get password() {
    return this.$properties.password;
  }

  get createdAt() {
    return this.$properties.createdAt;
  }

  get updatedAt() {
    return this.$properties.updatedAt;
  }
}
