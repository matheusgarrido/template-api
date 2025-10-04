import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiProperty,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type {
  IUpdateUserInput,
  IUpdateUserInputBody,
} from '@usecases/update-user/dto';
import type { UpdateUserPresenter as P } from './adapter';
import { UpdateUserUsecase } from '@usecases/update-user/update-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/guards/auth.guard';
import { CurrentUser } from '@shared/decorators';

// @ts-expect-error Guard
class UpdateUserDto implements IUpdateUserInput {
  @ApiProperty({
    description: 'The name of the user',
    example: userMock.name,
  })
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: userMock.email,
    uniqueItems: true,
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: userMock.password,
    format: 'password',
  })
  password?: string;
}

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UpdateUserController extends IController<UpdateUserUsecase> {
  constructor(protected readonly usecase: UpdateUserUsecase) {
    super(usecase);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data do be updated',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        id: userMock.id,
      } as P,
    },
  })
  async update(
    @Body() input: IUpdateUserInputBody,
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUser,
  ): Promise<P> {
    const output = await this.usecase.execute({
      id,
      currentUser,
      email: input.email,
      name: input.name,
      password: input.password,
    });

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
