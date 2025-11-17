import { IAdapter } from '@shared/protocols/adapter.protocol';
import type { IListUserOutput as O } from '@usecases/list-users/dto';
import { userMock } from '@tests/user.mock';
import { IPublicUser } from '@entities/user.entity';

type AdapterInput = Awaited<O>;
interface IListUsersHttpResponse {
  items: IPublicUser[];
  count: number;
  total: number;
}

export class ListUsersAdapter extends IAdapter<
  IListUsersHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      items: input.data.map((user) => user.toPublic()),
      count: input.data.length,
      total: input.total,
    };
  }
}

export const listUsersAdapterMock = new ListUsersAdapter({
  data: [userMock],
  total: 1,
});
