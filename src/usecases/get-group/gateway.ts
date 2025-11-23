import { Injectable } from '@nestjs/common';
import { GroupRepository } from '@repositories/group.repository';

@Injectable()
export class IGetGroupGateway {
  constructor(public readonly groupRepository: GroupRepository) {}
}
