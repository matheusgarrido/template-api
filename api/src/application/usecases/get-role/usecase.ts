import { Inject, Injectable } from '@nestjs/common';
import { IGetRoleInput as I, IGetRoleOutput as O } from './dto';
import { IGetRoleGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { RoleNotFoundError } from '@shared/errors';

@Injectable()
export class GetRoleUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    const role = await this.gateway.roleRepository.findByPk(input.id);

    if (!role?.id) {
      throw new RoleNotFoundError();
    }

    // TODO: Verificar se o usuário pertence ao grupo

    return role;
  }
}
