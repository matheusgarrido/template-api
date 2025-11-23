import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import type { IRemoveUserOutput as O } from '@usecases/remove-user/dto';
import { userMock } from '@tests/user.mock';
import { IPublicUser } from '@entities/user.entity';
import { IHateoasLink, Routes } from '@http/routes';

type AdapterInput = Awaited<O>;
export interface IRemoveUserHttpResponse extends IHateoasLink {
  id: EntityId;
  user: IPublicUser;
  deleted: boolean;
}

export class RemoveUserAdapter extends AbstractAdapter<
  IRemoveUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IRemoveUserHttpResponse {
    return {
      deleted: input.deleted,
      id: input.user.id!,
      user: input.user.toPublic(),
      _links: {
        ...Routes.hateoasGroup('user', { userId: input.user.id as string }),
      },
    };
  }
}

export const removeUserAdapterMock = new RemoveUserAdapter({
  user: userMock,
  deleted: true,
});
