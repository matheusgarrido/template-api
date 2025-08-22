import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { GetUserUsecase } from '@usecases/get-user/get-user.usecase';
import { IUserEntity, User } from '@entities/users.entity';

@Controller('users')
export class GetUserController extends IController<GetUserUsecase> {
  constructor(protected readonly usecase: GetUserUsecase) {
    super(usecase);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): P {
    const output = this.usecase.execute({ id });

    const adapterResponse: P = {
      user: new User({ ...(output as IUserEntity) }, output.id),
    };

    return adapterResponse;
  }
}
