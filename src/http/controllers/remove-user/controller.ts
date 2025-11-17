import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RemoveUserUsecase } from '@usecases/remove-user/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { DeleteUserParamsDto } from './dto';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { RemoveUserAdapter, removeUserAdapterMock } from './adapter';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class RemoveUserController extends IController<
  RemoveUserAdapter,
  RemoveUserUsecase
> {
  constructor(adapter: RemoveUserAdapter, usecase: RemoveUserUsecase) {
    super(adapter, usecase);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: 200,
    description: 'User removed successfully',
    schema: {
      example: removeUserAdapterMock.value,
    },
  })
  async remove(
    @Param() { id }: DeleteUserParamsDto,
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
