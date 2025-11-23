import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RemoveGroupUsecase } from '@usecases/remove-group/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { DeleteGroupParamsDto } from './dto';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { RemoveGroupAdapter, removeGroupAdapterMock } from './adapter';

@ApiTags('Groups')
@UseGuards(AuthGuard)
@Controller('groups')
export class RemoveGroupController extends IController<
  RemoveGroupAdapter,
  RemoveGroupUsecase
> {
  constructor(adapter: RemoveGroupAdapter, usecase: RemoveGroupUsecase) {
    super(adapter, usecase);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: 200,
    description: 'Group removed successfully',
    schema: {
      example: removeGroupAdapterMock.value,
    },
  })
  async remove(
    @Param() { id }: DeleteGroupParamsDto,
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
