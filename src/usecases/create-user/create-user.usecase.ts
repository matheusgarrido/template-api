import { User } from 'src/entities/users.entity';
import { ICreateUserInput as I, ICreateUserOutput as O } from './dto';
import { ICreateUserGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from '@shared/errors/conflict';

@Injectable()
export class CreateUserUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    const user = new User({
      name: input.name,
      email: input.email,
      password: input.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const existingUser = await this.gateway.userRepository.findOne({
      email: user.email,
    });

    this.gateway.logger.info(existingUser);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const newUser = await this.gateway.userRepository.create(user);

    return newUser!.id!;
  }
}
