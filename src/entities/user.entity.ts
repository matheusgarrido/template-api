import { EntityId } from '@shared/protocols/entity.protocol';
import { Entity } from './entity';

export interface IUserEntity {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ITokenUser {
  id: EntityId;
}

export type IPublicUser = Pick<User, 'username' | 'id'>;
export type IPrivateUser = IPublicUser &
  Omit<IUserEntity, 'password' | 'passwordHash'>;

export class User extends Entity<IUserEntity> {
  get name() {
    return this.properties.name;
  }

  get username() {
    return this.properties.username;
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

  toPublic(): IPublicUser {
    return {
      id: this.id,
      username: this.username,
    };
  }

  toPrivate(): IPrivateUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordHash, ...safeProperties } = this.toJSON() as any;
    return {
      ...safeProperties,
      id: this.id,
    };
  }

  toToken(): ITokenUser {
    return { id: this.id as EntityId };
  }
}
