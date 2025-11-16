import { EntityId } from '@shared/protocols/entity.protocol';
import { IAdapter } from '@shared/protocols/adapter.protocol';
import type { IRemoveUserOutput as O } from '@usecases/remove-user/dto';
import { userMock } from '@tests/user.mock';
import { SafeUser } from '@entities/user.entity';

type AdapterInput = Awaited<O>;
export interface IRemoveUserHttpResponse {
  id: EntityId;
  user: SafeUser;
  deleted: boolean;
}

export class RemoveUserAdapter extends IAdapter<
  IRemoveUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IRemoveUserHttpResponse {
    return {
      deleted: input.deleted,
      id: input.user.id!,
      user: new SafeUser(input.user),
    };
  }
}

export const removeUserAdapterMock = new RemoveUserAdapter({
  user: userMock,
  deleted: true,
});
