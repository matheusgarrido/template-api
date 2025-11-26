import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { roleMock } from '@tests/role.mock';
import type { ICreateRoleOutput as O } from '@usecases/create-role/dto';
import { IHateoasLink, Routes } from '@http/routes';

type AdapterInput = Awaited<O>;
export interface ICreateRoleHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class CreateRoleAdapter extends AbstractAdapter<
  ICreateRoleHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): ICreateRoleHttpResponse {
    return {
      id: input,
      _links: Routes.hateoasRole('roles', { roleId: input as string }),
    };
  }
}

export const createRoleAdapterMock = new CreateRoleAdapter(
  roleMock.id as string,
);
