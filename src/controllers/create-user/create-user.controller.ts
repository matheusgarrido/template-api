import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { ICreateUserInput as I } from '@usecases/create-user/dto';
import type { CreateUserPresenter as P } from './adapter';
import { CreateUserUsecase } from '@usecases/create-user/create-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';

@Controller('users')
export class CreateUserController extends IController<CreateUserUsecase> {
  constructor(protected readonly usecase: CreateUserUsecase) {
    super(usecase);
  }

  @Post()
  @HttpCode(201)
  create(@Body() input: I): P {
    const output = this.usecase.execute(input);

    const adapterResponse: P = {
      id: output as string,
    };

    return adapterResponse;
  }
}
