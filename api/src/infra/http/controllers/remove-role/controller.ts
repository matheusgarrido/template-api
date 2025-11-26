import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RemoveRoleUsecase } from '@usecases/remove-role/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { DeleteRoleParamsDto } from './dto';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { RemoveRoleAdapter, removeRoleAdapterMock } from './adapter';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class RemoveRoleController extends IController<
  RemoveRoleAdapter,
  RemoveRoleUsecase
> {
  constructor(adapter: RemoveRoleAdapter, usecase: RemoveRoleUsecase) {
    super(adapter, usecase);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: 200,
    description: 'Role removed successfully',
    schema: {
      example: removeRoleAdapterMock.value,
    },
  })
  async remove(
    @Param() { id }: DeleteRoleParamsDto,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ) {
    const input = {
      id,
      currentUser,
    };
    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
