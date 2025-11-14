import {
  ISafeUserEntity,
  IUserEntity,
  SafeUser,
  User,
} from '@entities/user.entity';
import { dateCurrentMock } from './default.mock';
import { ICurrentUser } from '@shared/decorators';

export const safeUserMockData: ISafeUserEntity = {
  email: 'joao@example.com',
  name: 'João Silva',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const safeUserMock = new SafeUser(safeUserMockData, '1');

export const userMockData: IUserEntity = {
  ...safeUserMockData,
  password: '123456',
  passwordHash: 'hashed-password',
};

export const userMock = new User(userMockData, '1');

export const currentUserMock: ICurrentUser = {
  ...safeUserMock.toSafeJSON(),
  iat: dateCurrentMock.getTime(),
  exp: dateCurrentMock.getTime() * 24 * 60 * 60 * 1000,
};
