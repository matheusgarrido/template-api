import { SafeUser } from '@entities/users.entity';

export interface IListUserPresenter {
  items: SafeUser[];
  count: number;
  total: number;
}
