import { IUserEntity, User } from '@entities/users.entity';
import { dateCurrentMock } from './default.mock';

export const userMockData: IUserEntity = {
  email: 'joao@example.com',
  name: 'João Silva',
  password: '123456',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const userMock = new User(userMockData, '1');
