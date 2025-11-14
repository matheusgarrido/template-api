import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { ICreateUserPresenter as P } from './adapter';
import { CreateUserBodyDto } from './dto';
import { CreateUserUsecase } from '@usecases/create-user/create-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { userMock } from '@tests/user.mock';

export type { P };

@ApiTags('Users')
@Controller('users')
export class CreateUserController extends IController<CreateUserUsecase> {
  constructor(protected readonly usecase: CreateUserUsecase) {
    super(usecase);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateUserBodyDto,
    description: 'User data do be created',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        id: userMock.id,
      } as P,
    },
  })
  async create(@Body() input: CreateUserBodyDto): Promise<P> {
    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
