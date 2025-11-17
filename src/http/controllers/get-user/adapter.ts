import { IPrivateUser } from '@entities/user.entity';
import { IAdapter } from '@shared/protocols/adapter.protocol';
import { userMock } from '@tests/user.mock';
import type { IGetUserOutput as O } from '@usecases/get-user/dto';

type AdapterInput = Awaited<O>;

interface IGetUserHttpResponse {
  user: IPrivateUser;
}

export class GetUserAdapter extends IAdapter<
  IGetUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      user: input.toPrivate(),
    };
  }
}

export const getUserAdapterMock = new GetUserAdapter(userMock);
