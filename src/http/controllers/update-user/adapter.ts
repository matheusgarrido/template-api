import { IAdapter } from '@shared/protocols/adapter.protocol';
import { EntityId } from '@shared/protocols/entity.protocol';
import { userMock } from '@tests/user.mock';
import type { IUpdateUserOutput as O } from '@usecases/update-user/dto';

type AdapterInput = Awaited<O>;
interface IUpdateUserHttpResponse {
  id: EntityId;
}

export class UpdateUserAdapter extends IAdapter<
  IUpdateUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      id: input,
    };
  }
}

export const updateUserAdapterMock = new UpdateUserAdapter(userMock.id);
