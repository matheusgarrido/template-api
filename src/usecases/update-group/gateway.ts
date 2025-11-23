import { Injectable } from '@nestjs/common';
import { IGateway } from '@shared/protocols/gateway.protocol';
import { PinoLogger } from 'nestjs-pino';
import { GroupRepository } from '@repositories/group.repository';

@Injectable()
export class IUpdateGroupGateway implements IGateway {
  constructor(
    public readonly groupRepository: GroupRepository,
    public readonly logger: PinoLogger,
  ) {}
}
