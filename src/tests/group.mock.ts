import { IGroupEntity, Group } from '@entities/group.entity';
import { dateCurrentMock } from './default.mock';

export const groupMockData: IGroupEntity = {
  name: 'Basic Group',
  description: 'Default groups',
  createdAt: dateCurrentMock,
  updatedAt: dateCurrentMock,
};

export const groupMock = new Group(groupMockData, '1');
