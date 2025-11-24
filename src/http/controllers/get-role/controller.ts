import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { GetRoleAdapter, getRoleAdapterMock } from './adapter';
import type { IGetRoleInput as I } from '@usecases/get-role/dto';
import { IController } from '@shared/protocols/controller.protocol';
import { GetRoleUsecase } from '@usecases/get-role/usecase';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { roleMock } from '@tests/role.mock';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { GetRoleParamsDto } from './dto';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class GetRoleController extends IController<
  GetRoleAdapter,
  GetRoleUsecase
> {
  constructor(adapter: GetRoleAdapter, usecase: GetRoleUsecase) {
    super(adapter, usecase);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiParam({
    name: 'id',
    description: 'Role ID to be found',
    type: String,
    example: roleMock.id,
  })
  @ApiResponse({
    status: 200,
    description: 'Role',
    schema: {
      example: getRoleAdapterMock,
    },
  })
  async findOne(
    @Param() { id }: GetRoleParamsDto,
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
