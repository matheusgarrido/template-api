import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { EntityId } from '@shared/protocols/entity.protocol';
import { roleMock } from '@tests/role.mock';
import type { IUpdateRoleOutput as O } from '@usecases/update-role/dto';

type AdapterInput = Awaited<O>;

export interface IUpdateRoleHttpResponse extends IHateoasLink {
  id: EntityId;
}

export class UpdateRoleAdapter extends AbstractAdapter<
  IUpdateRoleHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IUpdateRoleHttpResponse {
    return {
      id: input,
      _links: {
        ...Routes.hateoasRole('role', { roleId: input as string }),
      },
    };
  }
}

export const updateRoleAdapterMock = new UpdateRoleAdapter(roleMock.id);
