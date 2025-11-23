import {
  AbstractAdapter,
  IListAdapter,
} from '@shared/protocols/adapter.protocol';
import type { IListGroupsOutput as O } from '@usecases/list-groups/dto';
import { groupMock } from '@tests/group.mock';
import { Routes } from '@http/routes';
import { Group } from '@entities/group.entity';

type AdapterInput = Awaited<O>;

export interface IListGroupsHttpResponse extends IListAdapter<Group> {}

export class ListGroupsAdapter extends AbstractAdapter<
  IListGroupsHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IListGroupsHttpResponse {
    const response: IListGroupsHttpResponse = {
      items: input.data.map((group) => ({
        item: group,
        _links: Routes.hateoasGroup('group', { groupId: group.id as string }),
      })),
      count: input.data.length,
      total: input.total,
      _links: Routes.hateoasGroup('groups'),
    };

    return response;
  }
}

export const listGroupsAdapterMock = new ListGroupsAdapter({
  data: [groupMock],
  total: 1,
});
