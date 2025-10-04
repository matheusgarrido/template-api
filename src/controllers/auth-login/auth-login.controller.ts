import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type {
  IAuthLoginInput as I,
  IAuthLoginInput,
} from '@usecases/auth-login/dto';
import type { AuthLoginPresenter as P } from './adapter';
import { AuthLoginUsecase } from '@usecases/auth-login/auth-login.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';

class AuthLoginDto implements IAuthLoginInput {
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

@ApiTags('Auth')
@Controller('auth/login')
export class AuthLoginController extends IController<AuthLoginUsecase> {
  constructor(protected readonly usecase: AuthLoginUsecase) {
    super(usecase);
  }

  @Post()
  @HttpCode(200)
  @ApiBody({
    type: AuthLoginDto,
    description: 'User login data',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged successfully',
    schema: {
      example: {
        token: 'access_token',
      } as P,
    },
  })
  async authlogin(@Body() input: I): Promise<P> {
    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      token: `${output}`,
    };

    return adapterResponse;
  }
}
