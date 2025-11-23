import { Inject, Injectable } from '@nestjs/common';
import { IGetGroupInput as I, IGetGroupOutput as O } from './dto';
import { IGetGroupGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { GroupNotFoundError } from '@shared/errors';

@Injectable()
export class GetGroupUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    const group = await this.gateway.groupRepository.findByPk(input.id);

    if (!group?.id) {
      throw new GroupNotFoundError();
    }

    // TODO: Verificar se o usuário pertence ao grupo

    return group;
  }
}
