import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type {
  ICreateGroupInput as I,
  ICreateGroupInput,
} from '@usecases/create-group/dto';
import { CreateGroupAdapter, createGroupAdapterMock } from './adapter';
import { CreateGroupUsecase } from '@usecases/create-group/usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { groupMock } from '@tests/group.mock';

class CreateGroupDto implements ICreateGroupInput {
  @ApiProperty({
    description: 'The name of the group',
    example: groupMock.name,
  })
  name: string;

  @ApiProperty({
    description: 'The description of the group',
    example: groupMock.deletedAt,
    uniqueItems: true,
  })
  description?: string;
}

@ApiTags('Groups')
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
    type: CreateGroupDto,
    description: 'Group data do be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Group created successfully',
    schema: {
      example: createGroupAdapterMock.value,
    },
  })
  async create(@Body() input: I) {
    const output = await this.usecase.execute(input);

    return this.adapter.adapt(output);
  }
}
