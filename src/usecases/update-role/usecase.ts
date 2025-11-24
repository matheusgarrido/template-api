import { Role } from '@entities/role.entity';
import { IUpdateRoleInput as I, IUpdateRoleOutput as O } from './dto';
import { IUpdateRoleGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { RoleAlreadyExistsError } from '@shared/errors';

@Injectable()
export class UpdateRoleUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    // TODO: Verificar se o usuário pertence ao grupo

    // TODO: Verificar se o usuário tem permissão para excluir o grupo

    // TODO: Filtrar apenas no mesmo time
    const usedName = await this.gateway.roleRepository.findOne({
      name: input.name,
    });
    if (usedName && usedName.id !== +input.id) {
      throw new RoleAlreadyExistsError();
    }

    const role = new Role(
      {
        name: input.name,
        description: input.description,
      },
      input.id,
    );

    const newRole = (await this.gateway.roleRepository.update(role)) as Role;

    return newRole.id!;
  }
}
