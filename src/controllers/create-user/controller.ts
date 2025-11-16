import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserAdapter, createUserAdapterMock } from './adapter';
import { CreateUserBodyDto } from './dto';
import { CreateUserUsecase } from '@usecases/create-user/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class CreateUserController extends IController<
  CreateUserAdapter,
  CreateUserUsecase
> {
  constructor(adapter: CreateUserAdapter, usecase: CreateUserUsecase) {
    super(adapter, usecase);
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
      example: createUserAdapterMock,
    },
  })
  async create(@Body() input: CreateUserBodyDto) {
    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
