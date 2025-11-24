import { Role } from '@entities/role.entity';
import { ICreateRoleInput as I, ICreateRoleOutput as O } from './dto';
import { ICreateRoleGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { RoleAlreadyExistsError } from '@shared/errors';

@Injectable()
export class CreateRoleUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    const role = new Role({
      name: input.name,
      description: input.description,
    });

    const existingRole = await this.gateway.roleRepository.findOne({
      name: role.name,
    });

    this.gateway.logger.info(existingRole);

    if (existingRole) {
      throw new RoleAlreadyExistsError();
    }

    const newRole = await this.gateway.roleRepository.create(role);

    return newRole!.id!;
  }
}
