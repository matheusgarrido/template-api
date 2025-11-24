import { IPrivateUser } from '@entities/user.entity';
import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { userMock } from '@tests/user.mock';
import type { IGetUserOutput as O } from '@usecases/get-user/dto';

type AdapterInput = Awaited<O>;

export interface IGetUserHttpResponse extends IHateoasLink {
  user: IPrivateUser;
}

export class GetUserAdapter extends AbstractAdapter<
  IGetUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IGetUserHttpResponse {
    return {
      user: input.toPrivate(),
      _links: {
        ...Routes.hateoasRole('user', { userId: input.id as string }),
      },
    };
  }
}

export const getUserAdapterMock = new GetUserAdapter(userMock);
