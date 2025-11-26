import { Injectable } from '@nestjs/common';
import { IGateway } from '@shared/protocols/gateway.protocol';
import { PinoLogger } from 'nestjs-pino';
import { RoleRepository } from '@repositories/role.repository';

@Injectable()
export class IRemoveRoleGateway implements IGateway {
  constructor(
    public readonly roleRepository: RoleRepository,
    public readonly logger: PinoLogger,
  ) {}
}
