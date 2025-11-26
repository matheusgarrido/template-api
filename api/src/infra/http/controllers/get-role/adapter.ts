import { Role } from '@entities/role.entity';
import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { roleMock } from '@tests/role.mock';
import type { IGetRoleOutput as O } from '@usecases/get-role/dto';

type AdapterInput = Awaited<O>;

export interface IGetRoleHttpResponse extends IHateoasLink {
  role: Role;
}

export class GetRoleAdapter extends AbstractAdapter<
  IGetRoleHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IGetRoleHttpResponse {
    return {
      role: input,
      _links: Routes.hateoasRole('role', { roleId: input.id as string }),
    };
  }
}

export const getRoleAdapterMock = new GetRoleAdapter(roleMock);
