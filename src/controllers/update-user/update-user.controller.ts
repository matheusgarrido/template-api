import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import type {
  IUpdateUserInput as I,
  IUpdateUserInput,
} from '@usecases/update-user/dto';
import type { UpdateUserPresenter as P } from './adapter';
import { UpdateUserUsecase } from '@usecases/update-user/update-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import type { EntityId } from '@entities/entity';
import { userMock } from '@tests/user.mock';

class UpdateUserDto implements IUpdateUserInput {
  @ApiProperty({
    description: 'The id of the user',
    example: userMock.id,
  })
  id: EntityId;

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
@Controller('users')
export class UpdateUserController extends IController<UpdateUserUsecase> {
  constructor(protected readonly usecase: UpdateUserUsecase) {
    super(usecase);
  }

  @Patch(':id')
  @HttpCode(200)
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
      },
    },
  })
  async update(@Body() input: I, @Param('id') id: string): Promise<P> {
    const output = await this.usecase.execute({ ...input, id });

    const adapterResponse: P = {
      id: `${output}`,
    };

    return adapterResponse;
  }
}
