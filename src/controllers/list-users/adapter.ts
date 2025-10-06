import { SafeUser } from '@entities/user.entity';

export interface IListUserPresenter {
  items: SafeUser[];
  count: number;
  total: number;
}
