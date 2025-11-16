import { EntityId } from '@shared/protocols/entity.protocol';
import { IAdapter } from '@shared/protocols/adapter.protocol';
import { userMock } from '@tests/user.mock';
import type { ICreateUserOutput as O } from '@usecases/create-user/dto';

type AdapterInput = Awaited<O>;
interface ICreateUserHttpResponse {
  id: EntityId;
}

export class CreateUserAdapter extends IAdapter<
  ICreateUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      id: input,
    };
  }
}

export const createUserAdapterMock = new CreateUserAdapter(
  userMock.id as string,
);
