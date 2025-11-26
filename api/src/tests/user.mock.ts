import { IUserEntity, User } from '@entities/user.entity';
import { dateCurrentMock } from './default.mock';
import { CurrentUserDto, ICurrentUser } from '@shared/decorators';
import { EntityId } from '@shared/protocols/entity.protocol';

export const userMockData: IUserEntity = {
  email: 'joao@example.com',
  name: 'João Silva',
  password: '123456',
  passwordHash: 'hashed-password',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const userMock = new User(userMockData, '1');

export const currentUserMockData: ICurrentUser = {
  ...userMock.toPrivate(),
  id: userMock.id as EntityId,
  iat: dateCurrentMock.getTime(),
  exp: dateCurrentMock.getTime() * 24 * 60 * 60 * 1000,
};

export const currentUserMock: CurrentUserDto =
  currentUserMockData as CurrentUserDto;
