import {
  AbstractAdapter,
  IListAdapter,
} from '@shared/protocols/adapter.protocol';
import type { IListRolesOutput as O } from '@usecases/list-roles/dto';
import { roleMock } from '@tests/role.mock';
import { Routes } from '@http/routes';
import { Role } from '@entities/role.entity';

type AdapterInput = Awaited<O>;

export interface IListRolesHttpResponse extends IListAdapter<Role> {}

export class ListRolesAdapter extends AbstractAdapter<
  IListRolesHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IListRolesHttpResponse {
    const response: IListRolesHttpResponse = {
      items: input.data.map((role) => ({
        item: role,
        _links: Routes.hateoasRole('role', { roleId: role.id as string }),
      })),
      count: input.data.length,
      total: input.total,
      _links: Routes.hateoasRole('roles'),
    };

    return response;
  }
}

export const listRolesAdapterMock = new ListRolesAdapter({
  data: [roleMock],
  total: 1,
});
