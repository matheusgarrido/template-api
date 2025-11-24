import { EntityId } from '@shared/protocols/entity.protocol';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import type { IRemoveRoleOutput as O } from '@usecases/remove-role/dto';
import { roleMock } from '@tests/role.mock';
import { IHateoasLink, Routes } from '@http/routes';
import { Role } from '@entities/role.entity';

type AdapterInput = Awaited<O>;
export interface IRemoveRoleHttpResponse extends IHateoasLink {
  id: EntityId;
  role: Role;
  deleted: boolean;
}

export class RemoveRoleAdapter extends AbstractAdapter<
  IRemoveRoleHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IRemoveRoleHttpResponse {
    return {
      deleted: input.deleted,
      id: input.role.id!,
      role: input.role,
      _links: {
        ...Routes.hateoasRole('role', { roleId: input.role.id as string }),
      },
    };
  }
}

export const removeRoleAdapterMock = new RemoveRoleAdapter({
  role: roleMock,
  deleted: true,
});
