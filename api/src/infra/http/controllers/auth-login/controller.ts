import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthLoginAdapter, authloginAdapterMock } from './adapter';
import { AuthLoginUsecase } from '@usecases/auth-login/usecase';
import { AuthLoginBodyDto } from './dto';

@ApiTags('Auth')
@Controller('auth/login')
export class AuthLoginController extends IController<
  AuthLoginAdapter,
  AuthLoginUsecase
> {
  constructor(adapter: AuthLoginAdapter, usecase: AuthLoginUsecase) {
    super(adapter, usecase);
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
      example: authloginAdapterMock.value,
    },
  })
  async login(@Body() input: AuthLoginBodyDto) {
    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
