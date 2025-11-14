import { Entity } from './entity';

export interface IUserEntity {
  name?: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ISafeUserEntity = Omit<IUserEntity, 'passwordHash' | 'password'>;
export class SafeUser extends Entity<ISafeUserEntity> {}

export class User extends Entity<IUserEntity> {
  get name() {
    return this.properties.name;
  }

  get email() {
    return this.properties.email;
  }

  get password() {
    return this.properties.password;
  }

  get passwordHash() {
    return this.properties.passwordHash;
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

  toSafeJSON(): SafeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordHash, ...safeProperties } = this
      .properties as any;
    return {
      ...safeProperties,
      id: this.id,
    };
  }
}
