import { IAuthLoginInput as I, IAuthLoginOutput as O } from './dto';
import { IAuthLoginGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundError } from '@shared/errors';
import { InvalidUserCredentialsError } from '@shared/errors/unauthorized';

export type { I, O, G };

@Injectable()
export class AuthLoginUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    if (!input.email || !input.password)
      throw new InvalidUserCredentialsError();

    const user = await this.gateway.userRepository.findOne({
      email: input.email,
    });
    if (!user) throw new UserNotFoundError();

    const isValidPassword = await this.gateway.passwordService.compare(
      input.password,
      user,
    );
    if (!isValidPassword) throw new InvalidUserCredentialsError();

    const token = this.gateway.tokenService.generate({
      user,
    });

    return { user, token };
  }
}
