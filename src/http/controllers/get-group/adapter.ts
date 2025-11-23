import { Group } from '@entities/group.entity';
import { IHateoasLink, Routes } from '@http/routes';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';
import { groupMock } from '@tests/group.mock';
import type { IGetGroupOutput as O } from '@usecases/get-group/dto';

type AdapterInput = Awaited<O>;

export interface IGetGroupHttpResponse extends IHateoasLink {
  group: Group;
}

export class GetGroupAdapter extends AbstractAdapter<
  IGetGroupHttpResponse,
  AdapterInput
> {
  adapt(input: AdapterInput): IGetGroupHttpResponse {
    return {
      group: input,
      _links: Routes.hateoasGroup('group', { groupId: input.id as string }),
    };
  }
}

export const getGroupAdapterMock = new GetGroupAdapter(groupMock);
