import { Inject, Injectable } from '@nestjs/common';
import { IListGroupsInput as I, IListGroupsOutput as O } from './dto';
import { IListGroupsGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';

@Injectable()
export class ListGroupsUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(): O {
    const groups = await this.gateway.groupRepository.findAll();

    return groups;
  }
}
