import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type {
  ICreateUserInput as I,
  ICreateUserInput,
} from '@usecases/create-user/dto';
import type { CreateUserPresenter as P } from './adapter';
import { CreateUserUsecase } from '@usecases/create-user/create-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';

class CreateUserDto implements ICreateUserInput {
  @ApiProperty({
    description: 'The name of the user',
    example: userMock.name,
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: userMock.email,
    uniqueItems: true,
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: userMock.password,
    format: 'password',
  })
  password: string;
}

@ApiTags('Users')
@Controller('users')
export class CreateUserController extends IController<CreateUserUsecase> {
  constructor(protected readonly usecase: CreateUserUsecase) {
    super(usecase);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateUserDto,
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
  async create(@Body() input: I): Promise<P> {
    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
