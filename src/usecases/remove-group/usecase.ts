import { IRemoveGroupInput as I, IRemoveGroupOutput as O } from './dto';
import { IRemoveGroupGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { GroupNotFoundError } from '@shared/errors';

@Injectable()
export class RemoveGroupUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    // TODO: Verificar se o usuário pertence ao grupo

    // TODO: Verificar se o usuário tem permissão para excluir o grupo

    const group = await this.gateway.groupRepository.findByPk(input.id);

    if (!group?.id) {
      throw new GroupNotFoundError();
    }

    const wasDeleted = await this.gateway.groupRepository.remove(group);

    return { group, deleted: wasDeleted };
  }
}
