import { Module } from '@nestjs/common';
import { ModuleBuilder } from '@shared/handler/module-builder';

import { RoleRepository } from '@repositories/role.repository';

import * as UsecaseCreateRole from '@usecases/create-role';
import * as HttpCreateRole from '@controllers/create-role';
import * as UsecaseGetRole from '@usecases/get-role';
import * as HttpGetRole from '@controllers/get-role';
import * as UsecaseListRoles from '@usecases/list-roles';
import * as HttpListRoles from '@controllers/list-roles';
import * as UsecaseRemoveRole from '@usecases/remove-role';
import * as HttpRemoveRole from '@controllers/remove-role';
import * as UsecaseUpdateRole from '@usecases/update-role';
import * as HttpUpdateRole from '@controllers/update-role';

const moduleMetadata = new ModuleBuilder(
  'roles',
  [HttpCreateRole, HttpGetRole, HttpListRoles, HttpRemoveRole, HttpUpdateRole],
  [
    UsecaseCreateRole,
    UsecaseGetRole,
    UsecaseListRoles,
    UsecaseRemoveRole,
    UsecaseUpdateRole,
  ],
  {
    Repositories: [RoleRepository],
  },
);

@Module(moduleMetadata.metadata)
export class RolesModule {}
