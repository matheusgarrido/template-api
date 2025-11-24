import { IRoleEntity, Role } from '@entities/role.entity';
import { dateCurrentMock } from './default.mock';

export const roleMockData: IRoleEntity = {
  name: 'Basic Role',
  description: 'Default roles',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const roleMock = new Role(roleMockData, '1');
