import { IAdapter } from '@shared/protocols/adapter.protocol';
import type { IAuthLoginOutput as O } from '@usecases/auth-login/dto';

type AdapterInput = Awaited<O>;
interface IAuthLoginHttpResponse {
  token: string;
}

export class AuthLoginAdapter extends IAdapter<
  IAuthLoginHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      token: input,
    };
  }
}

export const authloginAdapterMock = new AuthLoginAdapter('access_token');
