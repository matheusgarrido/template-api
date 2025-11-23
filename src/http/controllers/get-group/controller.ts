import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { GetGroupAdapter, getGroupAdapterMock } from './adapter';
import type { IGetGroupInput as I } from '@usecases/get-group/dto';
import { IController } from '@shared/protocols/controller.protocol';
import { GetGroupUsecase } from '@usecases/get-group/usecase';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { groupMock } from '@tests/group.mock';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { GetGroupParamsDto } from './dto';

@ApiTags('Groups')
@UseGuards(AuthGuard)
@Controller('groups')
export class GetGroupController extends IController<
  GetGroupAdapter,
  GetGroupUsecase
> {
  constructor(adapter: GetGroupAdapter, usecase: GetGroupUsecase) {
    super(adapter, usecase);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiParam({
    name: 'id',
    description: 'Group ID to be found',
    type: String,
    example: groupMock.id,
  })
  @ApiResponse({
    status: 200,
    description: 'Group',
    schema: {
      example: getGroupAdapterMock,
    },
  })
  async findOne(
    @Param() { id }: GetGroupParamsDto,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ) {
    const input = {
      id,
      currentUser,
    } as I;

    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
