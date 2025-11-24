import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@repositories/role.repository';

@Injectable()
export class IGetRoleGateway {
  constructor(public readonly roleRepository: RoleRepository) {}
}
