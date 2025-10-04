import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { GetUserUsecase } from '@usecases/get-user/get-user.usecase';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';
import { AuthGuard } from '@infra/guards/auth.guard';
import { CurrentUser } from '@shared/decorators';

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
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUser,
  ): Promise<P> {
    const output = await this.usecase.execute({ id, currentUser });

    const adapterResponse: P = {
      user: output.toSafeJSON(),
    };

    return adapterResponse;
  }
}
