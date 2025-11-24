import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { IUpdateRoleInput as I } from '@usecases/update-role/dto';
import { UpdateRoleUsecase } from '@usecases/update-role/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { UpdateRoleBodyDto, UpdateRoleParamsDto } from './dto';
import { CurrentUserDto, CurrentUserDecorator } from '@shared/decorators';
import { UpdateRoleAdapter, updateRoleAdapterMock } from './adapter';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class UpdateRoleController extends IController<
  UpdateRoleAdapter,
  UpdateRoleUsecase
> {
  constructor(adapter: UpdateRoleAdapter, usecase: UpdateRoleUsecase) {
    super(adapter, usecase);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiBody({
    type: UpdateRoleBodyDto,
    description: 'Role data do be updated',
  })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    schema: {
      example: updateRoleAdapterMock.value,
    },
  })
  async update(
    @Body() payload: UpdateRoleBodyDto,
    @Param() { id }: UpdateRoleParamsDto,
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
