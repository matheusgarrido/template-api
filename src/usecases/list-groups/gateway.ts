import { Injectable } from '@nestjs/common';
import { GroupRepository } from '@repositories/group.repository';

@Injectable()
export class IListGroupsGateway {
  constructor(public readonly groupRepository: GroupRepository) {}
}
