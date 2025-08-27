import { User } from '@entities/users.entity';

export interface IGetUserPresenter {
  items: User[];
  count: number;
  total: number;
}
