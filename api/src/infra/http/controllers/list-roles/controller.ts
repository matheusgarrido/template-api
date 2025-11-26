import { Controller, Get, HttpCode } from '@nestjs/common';
import { IController } from '@shared/protocols/controller.protocol';
import { ListRolesUsecase } from '@usecases/list-roles/usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListRolesAdapter, listRolesAdapterMock } from './adapter';

@ApiTags('Roles')
@Controller('roles')
export class ListRolesController extends IController<
  ListRolesAdapter,
  ListRolesUsecase
> {
  constructor(adapter: ListRolesAdapter, usecase: ListRolesUsecase) {
    super(adapter, usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Role',
    schema: {
      example: listRolesAdapterMock.value,
    },
  })
  async findAll() {
    const output = await this.usecase.execute();

    return this.adapter.adapt(output);
  }
}
