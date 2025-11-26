import { IRemoveRoleInput as I, IRemoveRoleOutput as O } from './dto';
import { IRemoveRoleGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { RoleNotFoundError } from '@shared/errors';

@Injectable()
export class RemoveRoleUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    // TODO: Verificar se o usuário pertence ao grupo

    // TODO: Verificar se o usuário tem permissão para excluir o grupo

    const role = await this.gateway.roleRepository.findByPk(input.id);

    if (!role?.id) {
      throw new RoleNotFoundError();
    }

    const wasDeleted = await this.gateway.roleRepository.remove(role);

    return { role, deleted: wasDeleted };
  }
}
