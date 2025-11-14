import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { UpdateUserPresenter as P } from './adapter';
import type { IUpdateUserInput as I } from '@usecases/update-user/dto';
import { UpdateUserUsecase } from '@usecases/update-user/update-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/guards/auth.guard';
import { UpdateUserBodyDto, UpdateUserParamsDto } from './dto';
import { CurrentUserDto } from '@shared/decorators/current-user/dto';
import { CurrentUserDecorator } from '@shared/decorators';

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
    type: UpdateUserBodyDto,
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
    @Body() payload: UpdateUserBodyDto,
    @Param() { id }: UpdateUserParamsDto,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ): Promise<P> {
    const input: I = {
      id,
      currentUser,
      ...payload,
    };

    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
