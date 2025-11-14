import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { AuthLoginPresenter as P } from './adapter';
import { AuthLoginUsecase } from '@usecases/auth-login/auth-login.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthLoginBodyDto } from './dto';

@ApiTags('Auth')
@Controller('auth/login')
export class AuthLoginController extends IController<AuthLoginUsecase> {
  constructor(protected readonly usecase: AuthLoginUsecase) {
    super(usecase);
  }

  @Post()
  @HttpCode(200)
  @ApiBody({
    type: AuthLoginBodyDto,
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
  async authlogin(@Body() input: AuthLoginBodyDto): Promise<P> {
    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      token: `${output}`,
    };

    return adapterResponse;
  }
}
