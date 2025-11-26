import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@repositories/role.repository';

@Injectable()
export class IListRolesGateway {
  constructor(public readonly roleRepository: RoleRepository) {}
}
