import { User } from '@entities/user.entity';
import { IUpdateUserInput as I, IUpdateUserOutput as O } from './dto';
import { IUpdateUserGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { UserEmailAlreadyUsedError, UserNotFoundError } from '@shared/errors';

@Injectable()
export class UpdateUserUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    if (!input.currentUser.id || input.currentUser.id !== input.id) {
      throw new UserNotFoundError();
    }

    const usedEmail = await this.gateway.userRepository.findOne({
      email: input.email,
    });
    if (usedEmail && usedEmail.id !== +input.id) {
      throw new UserEmailAlreadyUsedError();
    }

    const user = new User(
      {
        name: input.name,
        email: input.email,
        password: input.password,
      },
      input.id,
    );

    const newUser = (await this.gateway.userRepository.update(user)) as User;

    return newUser.id!;
  }
}
