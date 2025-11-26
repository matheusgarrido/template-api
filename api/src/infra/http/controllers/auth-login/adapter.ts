import { IPrivateUser } from '@entities/user.entity';
import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { userMock } from '@tests/user.mock';
import type { IAuthLoginOutput as O } from '@usecases/auth-login/dto';

type AdapterInput = Awaited<O>;

export interface IAuthLoginHttpResponse extends IHateoasLink {
  token: string;
  user: IPrivateUser;
}

export class AuthLoginAdapter extends AbstractAdapter<
  IAuthLoginHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IAuthLoginHttpResponse {
    return {
      token: input.token,
      user: input.user.toPrivate(),
      _links: {
        ...Routes.hateoasRole('auth', { userId: input.user.id as string }),
        user: {
          ...Routes.hateoasRole('users', { userId: input.user.id as string }),
        },
      },
    };
  }
}

export const authloginAdapterMock = new AuthLoginAdapter({
  token: 'access_token',
  user: userMock,
});
