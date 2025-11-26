import { Inject, Injectable } from '@nestjs/common';
import { IListRolesInput as I, IListRolesOutput as O } from './dto';
import { IListRolesGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';

@Injectable()
export class ListRolesUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(): O {
    const roles = await this.gateway.roleRepository.findAll();

    return roles;
  }
}
