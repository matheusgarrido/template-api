import { Controller, Get, HttpCode } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { ListUsersUsecase } from '@usecases/list-users/list-users.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';

@ApiTags('user')
@Controller('user')
export class ListUsersController extends IController<ListUsersUsecase> {
  constructor(protected readonly usecase: ListUsersUsecase) {
    super(usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User',
    schema: {
      example: {
        items: [userMock],
      },
    },
  })
  findAll(): P {
    const output = this.usecase.execute();

    const adapterResponse: P = {
      items: output,
      count: output.length,
    };

    return adapterResponse;
  }
}
