import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import type { IGetUserInput as I } from '@usecases/get-user/dto';
import { IController } from '@shared/protocols/controller.protocol';
import { GetUserUsecase } from '@usecases/get-user/get-user.usecase';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/guards/auth.guard';
import { CurrentUserDecorator } from '@shared/decorators';
import { GetUserParamsDto } from './dto';
import { CurrentUserDto } from '@shared/decorators/current-user/dto';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class GetUserController extends IController<GetUserUsecase> {
  constructor(protected readonly usecase: GetUserUsecase) {
    super(usecase);
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
      example: {
        user: userMock.toSafeJSON(),
      } as P,
    },
  })
  async findOne(
    @Param() { id }: GetUserParamsDto,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ): Promise<P> {
    const input = {
      id,
      currentUser,
    } as I;

    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      user: output.toSafeJSON(),
    };

    return adapterResponse;
  }
}
