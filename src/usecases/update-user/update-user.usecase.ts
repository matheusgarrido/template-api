import { User } from 'src/entities/users.entity';
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
    const [existingUser, usedEmail] = await Promise.all([
      this.gateway.userRepository.findByPk(input.id),
      this.gateway.userRepository.findOne({ email: input.email }),
    ]);

    this.gateway.logger.info(existingUser);

    if (!existingUser) {
      throw new UserNotFoundError();
    }

    if (usedEmail && usedEmail.id !== input.id) {
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
