import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import type { ICreateRoleInputBody } from '@usecases/create-role/dto';
import { CreateRoleAdapter, createRoleAdapterMock } from './adapter';
import { CreateRoleUsecase } from '@usecases/create-role/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CurrentUserDecorator, CurrentUserDto } from '@shared/decorators';
import { AuthGuard } from '@infra/decorators/auth';
import { CreateRoleBodyDto } from './dto';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class CreateRoleController extends IController<
  CreateRoleAdapter,
  CreateRoleUsecase
> {
  constructor(adapter: CreateRoleAdapter, usecase: CreateRoleUsecase) {
    super(adapter, usecase);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateRoleBodyDto,
    description: 'Role data do be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    schema: {
      example: createRoleAdapterMock.value,
    },
  })
  async create(
    @Body() input: ICreateRoleInputBody,
    @CurrentUserDecorator() currentUser: CurrentUserDto,
  ) {
    const output = await this.usecase.execute({
      currentUser,
      ...input,
    });

    return this.adapter.adapt(output);
  }
}
