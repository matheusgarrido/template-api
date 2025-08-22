import { Inject, Injectable } from '@nestjs/common';
import { IGetUserInput as I, IGetUserOutput as O } from './dto';
import { IListUsersGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';

@Injectable()
export class ListUsersUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  execute(): O {
    const users = this.gateway.userRepository.findAll();

    return users;
  }
}
