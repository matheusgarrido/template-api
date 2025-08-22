import { Controller, Get, HttpCode } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { ListUsersUsecase } from '@usecases/list-users/list-users.usecase';

@Controller('users')
export class ListUsersController extends IController<ListUsersUsecase> {
  constructor(protected readonly usecase: ListUsersUsecase) {
    super(usecase);
  }

  @Get()
  @HttpCode(200)
  findAll(): P {
    const output = this.usecase.execute();

    const adapterResponse: P = {
      users: output,
    };

    return adapterResponse;
  }
}
