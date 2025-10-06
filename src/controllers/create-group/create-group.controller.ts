import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type {
  ICreateGroupInput as I,
  ICreateGroupInput,
} from '@usecases/create-group/dto';
import type { CreateGroupPresenter as P } from './adapter';
import { CreateGroupUsecase } from '@usecases/create-group/create-group.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { groupMock } from 'src/tests/group.mock';

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
export class CreateGroupController extends IController<CreateGroupUsecase> {
  constructor(protected readonly usecase: CreateGroupUsecase) {
    super(usecase);
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
      example: {
        id: groupMock.id,
      } as P,
    },
  })
  async create(@Body() input: I): Promise<P> {
    const output = await this.usecase.execute(input);

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
