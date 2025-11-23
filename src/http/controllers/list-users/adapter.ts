import {
  AbstractAdapter,
  IListAdapter,
} from '@shared/protocols/adapter.protocol';
import type { IListUserOutput as O } from '@usecases/list-users/dto';
import { userMock } from '@tests/user.mock';
import { IPublicUser } from '@entities/user.entity';
import { Routes } from '@http/routes';

type AdapterInput = Awaited<O>;

export interface IListUsersHttpResponse extends IListAdapter<IPublicUser> {}

export class ListUsersAdapter extends AbstractAdapter<
  IListUsersHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IListUsersHttpResponse {
    const response: IListUsersHttpResponse = {
      items: input.data.map((user) => ({
        item: user.toPublic(),
        _links: Routes.hateoasGroup('user', { userId: user.id as string }),
      })),
      count: input.data.length,
      total: input.total,
      _links: Routes.hateoasGroup('users'),
    };

    return response;
  }
}

export const listUsersAdapterMock = new ListUsersAdapter({
  data: [userMock],
  total: 1,
});
