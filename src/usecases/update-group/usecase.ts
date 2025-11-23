import { Group } from '@entities/group.entity';
import { IUpdateGroupInput as I, IUpdateGroupOutput as O } from './dto';
import { IUpdateGroupGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { GroupAlreadyExistsError } from '@shared/errors';

@Injectable()
export class UpdateGroupUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    // TODO: Verificar se o usuário pertence ao grupo

    // TODO: Verificar se o usuário tem permissão para excluir o grupo

    // TODO: Filtrar apenas no mesmo time
    const usedName = await this.gateway.groupRepository.findOne({
      name: input.name,
    });
    if (usedName && usedName.id !== +input.id) {
      throw new GroupAlreadyExistsError();
    }

    const group = new Group(
      {
        name: input.name,
        description: input.description,
      },
      input.id,
    );

    const newGroup = (await this.gateway.groupRepository.update(
      group,
    )) as Group;

    return newGroup.id!;
  }
}
