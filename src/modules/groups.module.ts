import { Module } from '@nestjs/common';
import { ModuleBuilder } from '@shared/handler/module-builder';

import { GroupRepository } from '@repositories/group.repository';

import * as UsecaseCreateGroup from '@usecases/create-group';
import * as HttpCreateGroup from '@controllers/create-group';
import * as UsecaseGetGroup from '@usecases/get-group';
import * as HttpGetGroup from '@controllers/get-group';
import * as UsecaseListGroups from '@usecases/list-groups';
import * as HttpListGroups from '@controllers/list-groups';
import * as UsecaseRemoveGroup from '@usecases/remove-group';
import * as HttpRemoveGroup from '@controllers/remove-group';
import * as UsecaseUpdateGroup from '@usecases/update-group';
import * as HttpUpdateGroup from '@controllers/update-group';

const moduleMetadata = new ModuleBuilder(
  'groups',
  [
    HttpCreateGroup,
    HttpGetGroup,
    HttpListGroups,
    HttpRemoveGroup,
    HttpUpdateGroup,
  ],
  [
    UsecaseCreateGroup,
    UsecaseGetGroup,
    UsecaseListGroups,
    UsecaseRemoveGroup,
    UsecaseUpdateGroup,
  ],
  {
    Repositories: [GroupRepository],
  },
);

@Module(moduleMetadata.metadata)
export class GroupsModule {}
