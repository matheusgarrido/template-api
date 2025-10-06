import { Injectable } from '@nestjs/common';
import { IGateway } from '@shared/protocols/gateway.protocol';
import { PinoLogger } from 'nestjs-pino';
import { GroupRepository } from 'src/repositories/group.repository';

@Injectable()
export class ICreateGroupGateway implements IGateway {
  constructor(
    public readonly groupRepository: GroupRepository,
    public readonly logger: PinoLogger,
  ) {}
}
