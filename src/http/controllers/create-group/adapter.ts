import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { groupMock } from '@tests/group.mock';
import type { ICreateGroupOutput as O } from '@usecases/create-group/dto';
import { IHateoasLink, Routes } from '@http/routes';

type AdapterInput = Awaited<O>;
export interface ICreateGroupHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class CreateGroupAdapter extends AbstractAdapter<
  ICreateGroupHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): ICreateGroupHttpResponse {
    return {
      id: input,
      _links: Routes.hateoasGroup('groups', { groupId: input as string }),
    };
  }
}

export const createGroupAdapterMock = new CreateGroupAdapter(
  groupMock.id as string,
);
