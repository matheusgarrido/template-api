import { IUserEntity, User } from '@entities/user.entity';
import { dateCurrentMock } from './default.mock';
import { CurrentUser } from '@shared/decorators';

export const userMockData: IUserEntity = {
  email: 'joao@example.com',
  name: 'João Silva',
  password: '123456',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const userMock = new User(userMockData, '1');

export const currentUserMock: CurrentUser = {
  ...userMock.toSafeJSON(),
  iat: dateCurrentMock.getTime(),
  exp: dateCurrentMock.getTime() * 24 * 60 * 60 * 1000,
};
