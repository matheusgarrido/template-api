import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { RemoveUserPresenter as P } from './adapter';
import { RemoveUserUsecase } from '@usecases/remove-user/remove-user.usecase';
import { IController } from '@shared/protocols/controller.protocol';
import { userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/guards/auth.guard';
import { CurrentUser } from '@shared/decorators';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class RemoveUserController extends IController<RemoveUserUsecase> {
  constructor(protected readonly usecase: RemoveUserUsecase) {
    super(usecase);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: 200,
    description: 'User removed successfully',
    schema: {
      example: {
        id: userMock.id,
        deleted: true,
      } as P,
    },
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUser,
  ): Promise<P> {
    const output = await this.usecase.execute({ id, currentUser });

    const adapterResponse: P = {
      id: id,
      deleted: output,
    };

    return adapterResponse;
  }
}
