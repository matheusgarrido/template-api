import { Controller, Get, HttpCode } from '@nestjs/common';
import type { IListUserPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { ListUsersUsecase } from '@usecases/list-users/list-users.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { userMock } from '@tests/user.mock';

@ApiTags('Users')
@Controller('users')
export class ListUsersController extends IController<ListUsersUsecase> {
  constructor(protected readonly usecase: ListUsersUsecase) {
    super(usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User',
    schema: {
      example: {
        items: [userMock.toSafeJSON()],
      } as P,
    },
  })
  async findAll(): Promise<P> {
    const output = await this.usecase.execute();

    const adapterResponse: P = {
      items: output.data.map((o) => o.toSafeJSON()) ?? [],
      count: output.data.length,
      total: output.total,
    };

    return adapterResponse;
  }
}
