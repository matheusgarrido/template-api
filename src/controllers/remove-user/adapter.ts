import { EntityId } from '@entities/entity';

export interface RemoveUserPresenter {
  id: EntityId;
  deleted: boolean;
}
