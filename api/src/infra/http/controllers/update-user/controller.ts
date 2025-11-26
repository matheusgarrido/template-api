import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { IUpdateUserInput as I } from '@usecases/update-user/dto';
import { UpdateUserUsecase } from '@usecases/update-user/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { UpdateUserBodyDto, UpdateUserParamsDto } from './dto';
import { CurrentUserDto } from '@shared/decorators';
import { CurrentUserDecorator } from '@shared/decorators';
import { UpdateUserAdapter, updateUserAdapterMock } from './adapter';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UpdateUserController extends IController<
  UpdateUserAdapter,
  UpdateUserUsecase
> {
  constructor(adapter: UpdateUserAdapter, usecase: UpdateUserUsecase) {
    super(adapter, usecase);
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
      example: updateUserAdapterMock.value,
    },
  })
  async update(
    @Body() payload: UpdateUserBodyDto,
    @Param() { id }: UpdateUserParamsDto,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ) {
    const input: I = {
      id,
      currentUser,
      ...payload,
    };

    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
