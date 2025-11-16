import { IAdapter } from '@shared/protocols/adapter.protocol';
import { ISafeUserEntity, SafeUser } from '@entities/user.entity';
import type { IListUserOutput as O } from '@usecases/list-users/dto';
import { userMock } from '@tests/user.mock';
import { EntityJson } from '@shared/protocols/entity.protocol';

type AdapterInput = Awaited<O>;
interface IListUsersHttpResponse {
  items: EntityJson<ISafeUserEntity>[];
  count: number;
  total: number;
}

export class ListUsersAdapter extends IAdapter<
  IListUsersHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      items: input.data.map((user) => new SafeUser(user.properties).toJSON()),
      count: input.data.length,
      total: input.total,
    };
  }
}

export const listUsersAdapterMock = new ListUsersAdapter({
  data: [userMock],
  total: 1,
});
