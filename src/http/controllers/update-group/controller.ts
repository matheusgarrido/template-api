import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { IUpdateGroupInput as I } from '@usecases/update-group/dto';
import { UpdateGroupUsecase } from '@usecases/update-group/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { AuthGuard } from '@infra/decorators/auth/auth.guard';
import { UpdateGroupBodyDto, UpdateGroupParamsDto } from './dto';
import { CurrentUserDto, CurrentUserDecorator } from '@shared/decorators';
import { UpdateGroupAdapter, updateGroupAdapterMock } from './adapter';

@ApiTags('Groups')
@UseGuards(AuthGuard)
@Controller('groups')
export class UpdateGroupController extends IController<
  UpdateGroupAdapter,
  UpdateGroupUsecase
> {
  constructor(adapter: UpdateGroupAdapter, usecase: UpdateGroupUsecase) {
    super(adapter, usecase);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiBody({
    type: UpdateGroupBodyDto,
    description: 'Group data do be updated',
  })
  @ApiResponse({
    status: 200,
    description: 'Group updated successfully',
    schema: {
      example: updateGroupAdapterMock.value,
    },
  })
  async update(
    @Body() payload: UpdateGroupBodyDto,
    @Param() { id }: UpdateGroupParamsDto,
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
