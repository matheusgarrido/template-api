import { EntityId } from '@shared/protocols/entity.protocol';
import { IAdapter } from '@shared/protocols/adapter.protocol';
import { userMock } from '@tests/user.mock';
import type { ICreateUserOutput as O } from '@usecases/create-user/dto';
import { IHateoasLink, Routes } from '@http/routes';

type AdapterInput = Awaited<O>;

export interface ICreateUserHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class CreateUserAdapter extends IAdapter<
  ICreateUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): ICreateUserHttpResponse {
    return {
      id: input,
      _links: {
        ...Routes.hateoasGroup('users', { userId: input as string }),
      },
    };
  }
}

export const createUserAdapterMock = new CreateUserAdapter(
  userMock.id as string,
);
