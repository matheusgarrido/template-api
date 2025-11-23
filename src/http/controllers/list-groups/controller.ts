import { Controller, Get, HttpCode } from '@nestjs/common';
import { IController } from '@shared/protocols/controller.protocol';
import { ListGroupsUsecase } from '@usecases/list-groups/usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListGroupsAdapter, listGroupsAdapterMock } from './adapter';

@ApiTags('Groups')
@Controller('groups')
export class ListGroupsController extends IController<
  ListGroupsAdapter,
  ListGroupsUsecase
> {
  constructor(adapter: ListGroupsAdapter, usecase: ListGroupsUsecase) {
    super(adapter, usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Group',
    schema: {
      example: listGroupsAdapterMock.value,
    },
  })
  async findAll() {
    const output = await this.usecase.execute();

    return this.adapter.adapt(output);
  }
}
