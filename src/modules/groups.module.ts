import { Module } from '@nestjs/common';
import { ModuleBuilder } from '@shared/handler/module-builder';

import { GroupRepository } from '@repositories/group.repository';

import * as UsecaseCreateGroup from '@usecases/create-group';
import * as HttpCreateGroup from '@controllers/create-group';

const moduleMetadata = new ModuleBuilder(
  'groups',
  [HttpCreateGroup],
  [UsecaseCreateGroup],
  {
    Repositories: [GroupRepository],
  },
);

@Module(moduleMetadata.metadata)
export class GroupsModule {}
