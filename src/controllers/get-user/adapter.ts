import { ISafeUserEntity, SafeUser } from '@entities/user.entity';
import { IAdapter } from '@shared/protocols/adapter.protocol';
import { EntityJson } from '@shared/protocols/entity.protocol';
import { userMock } from '@tests/user.mock';
import type { IGetUserOutput as O } from '@usecases/get-user/dto';

type AdapterInput = Awaited<O>;

interface IGetUserHttpResponse {
  user: EntityJson<ISafeUserEntity>;
}

export class GetUserAdapter extends IAdapter<
  IGetUserHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput) {
    return {
      user: new SafeUser(input).toJSON(),
    };
  }
}

export const getUserAdapterMock = new GetUserAdapter(userMock);
