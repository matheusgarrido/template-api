import { IRemoveUserInput as I, IRemoveUserOutput as O } from './dto';
import { IRemoveUserGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundError } from '@shared/errors';
import { IUserEntity, User } from '@entities/user.entity';

@Injectable()
export class RemoveUserUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    if (!input.currentUser.id || input.currentUser.id !== input.id) {
      throw new UserNotFoundError();
    }

    const user = new User(
      input.currentUser as Partial<IUserEntity>,
      input.currentUser.id,
    );
    const wasDeleted = await this.gateway.userRepository.remove(user);

    return { user, deleted: wasDeleted };
  }
}
