import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import type { IRemoveGroupOutput as O } from '@usecases/remove-group/dto';
import { groupMock } from '@tests/group.mock';
import { IHateoasLink, Routes } from '@http/routes';
import { Group } from '@entities/group.entity';

type AdapterInput = Awaited<O>;
export interface IRemoveGroupHttpResponse extends IHateoasLink {
  id: EntityId;
  group: Group;
  deleted: boolean;
}

export class RemoveGroupAdapter extends AbstractAdapter<
  IRemoveGroupHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IRemoveGroupHttpResponse {
    return {
      deleted: input.deleted,
      id: input.group.id!,
      group: input.group,
      _links: {
        ...Routes.hateoasGroup('group', { groupId: input.group.id as string }),
      },
    };
  }
}

export const removeGroupAdapterMock = new RemoveGroupAdapter({
  group: groupMock,
  deleted: true,
});
