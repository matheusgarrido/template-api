import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import type { ICreateGroupInputBody } from '@usecases/create-group/dto';
import { CreateGroupAdapter, createGroupAdapterMock } from './adapter';
import { CreateGroupUsecase } from '@usecases/create-group/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { AuthGuard } from '@infra/decorators/auth';
import { CreateGroupBodyDto } from './dto';

@ApiTags('Groups')
@UseGuards(AuthGuard)
@Controller('groups')
export class CreateGroupController extends IController<
  CreateGroupAdapter,
  CreateGroupUsecase
> {
  constructor(adapter: CreateGroupAdapter, usecase: CreateGroupUsecase) {
    super(adapter, usecase);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateGroupBodyDto,
    description: 'Group data do be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Group created successfully',
    schema: {
      example: createGroupAdapterMock.value,
    },
  })
  async create(
    @Body() input: ICreateGroupInputBody,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ) {
    const output = await this.usecase.execute({
      currentUser,
      ...input,
    });

    return this.adapter.adapt(output);
  }
}
