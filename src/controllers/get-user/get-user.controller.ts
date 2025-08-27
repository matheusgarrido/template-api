import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import type { IGetUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { GetUserUsecase } from '@usecases/get-user/get-user.usecase';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';

@ApiTags('User')
@Controller('users')
export class GetUserController extends IController<GetUserUsecase> {
  constructor(protected readonly usecase: GetUserUsecase) {
    super(usecase);
  }

  @Get(':id')
  @HttpCode(200)
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
        user: userMock,
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<P> {
    const output = await this.usecase.execute({ id });

    const adapterResponse: P = {
      user: output,
    };

    return adapterResponse;
  }
}
