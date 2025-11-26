import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { EntityId } from '@shared/protocols/entity.protocol';
import { userMock } from '@tests/user.mock';
import type { IUpdateUserOutput as O } from '@usecases/update-user/dto';

type AdapterInput = Awaited<O>;

export interface IUpdateUserHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class UpdateUserAdapter extends AbstractAdapter<
  IUpdateUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IUpdateUserHttpResponse {
    return {
      id: input,
      _links: {
        ...Routes.hateoasRole('user', { userId: input as string }),
      },
    };
  }
}

export const updateUserAdapterMock = new UpdateUserAdapter(userMock.id);
