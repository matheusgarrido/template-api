import { Group } from '@entities/group.entity';
import { ICreateGroupInput as I, ICreateGroupOutput as O } from './dto';
import { ICreateGroupGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';
import { Inject, Injectable } from '@nestjs/common';
import { GroupAlreadyExistsError } from '@shared/errors';

@Injectable()
export class CreateGroupUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(input: I): O {
    const group = new Group({
      name: input.name,
      description: input.description,
    });

    const existingGroup = await this.gateway.groupRepository.findOne({
      name: group.name,
    });

    this.gateway.logger.info(existingGroup);

    if (existingGroup) {
      throw new GroupAlreadyExistsError();
    }

    const newGroup = await this.gateway.groupRepository.create(group);

    return newGroup!.id!;
  }
}
