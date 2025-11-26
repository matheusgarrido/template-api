import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { GetUserAdapter, getUserAdapterMock } from './adapter';
import type { IGetUserInput as I } from '@usecases/get-user/dto';
import { IController } from '@shared/protocols/controller.protocol';
import { GetUserUsecase } from '@usecases/get-user/usecase';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { GetUserParamsDto } from './dto';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class GetUserController extends IController<
  GetUserAdapter,
  GetUserUsecase
> {
  constructor(adapter: GetUserAdapter, usecase: GetUserUsecase) {
    super(adapter, usecase);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiParam({
    name: 'id',
    description: 'User ID to be found',
    type: String,
    example: userMock.id,
  })
  @ApiResponse({
    status: 200,
    description: 'User',
    schema: {
      example: getUserAdapterMock,
    },
  })
  async findOne(
    @Param() { id }: GetUserParamsDto,
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
