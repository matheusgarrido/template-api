import { User } from '@entities/users.entity';

export interface IListUserPresenter {
  items: Omit<User, 'passwordHash' | 'password'>[];
  count: number;
  total: number;
}
