import { Controller, Get, HttpCode } from '@nestjs/common';
import { IController } from '@shared/protocols/controller.protocol';
import { ListUsersUsecase } from '@usecases/list-users/usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListUsersAdapter, listUsersAdapterMock } from './adapter';

@ApiTags('Users')
@Controller('users')
export class ListUsersController extends IController<
  ListUsersAdapter,
  ListUsersUsecase
> {
  constructor(adapter: ListUsersAdapter, usecase: ListUsersUsecase) {
    super(adapter, usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User',
    schema: {
      example: listUsersAdapterMock.value,
    },
  })
  async findAll() {
    const output = await this.usecase.execute();

    return this.adapter.adapt(output);
  }
}
