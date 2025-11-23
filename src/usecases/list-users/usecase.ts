import { Inject, Injectable } from '@nestjs/common';
import { IListUsersInput as I, IListUsersOutput as O } from './dto';
import { IListUsersGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';

@Injectable()
export class ListUsersUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(): O {
    const users = await this.gateway.userRepository.findAll();

    return users;
  }
}
