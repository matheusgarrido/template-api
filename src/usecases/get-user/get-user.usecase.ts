import { Inject, Injectable } from '@nestjs/common';
import { IGetUserInput as I, IGetUserOutput as O } from './dto';
import { IGetUserGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { UserNotFoundError } from '@shared/errors/not-found';

@Injectable()
export class GetUserUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  execute(input: I): O {
    const user = this.gateway.userRepository.findById(input.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
