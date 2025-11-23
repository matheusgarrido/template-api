import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { EntityId } from '@shared/protocols/entity.protocol';
import { groupMock } from '@tests/group.mock';
import type { IUpdateGroupOutput as O } from '@usecases/update-group/dto';

type AdapterInput = Awaited<O>;

export interface IUpdateGroupHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class UpdateGroupAdapter extends AbstractAdapter<
  IUpdateGroupHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IUpdateGroupHttpResponse {
    return {
      id: input,
      _links: {
        ...Routes.hateoasGroup('group', { groupId: input as string }),
      },
    };
  }
}

export const updateGroupAdapterMock = new UpdateGroupAdapter(groupMock.id);
