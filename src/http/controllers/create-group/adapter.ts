import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { groupMock } from '@tests/group.mock';
import type { ICreateGroupOutput as O } from '@usecases/create-group/dto';

type AdapterInput = Awaited<O>;
interface ICreateGroupHttpResponse {
  id: EntityId;
}

export class CreateGroupAdapter extends AbstractAdapter<
  ICreateGroupHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      id: input,
    };
  }
}

export const createGroupAdapterMock = new CreateGroupAdapter(
  groupMock.id as string,
);
