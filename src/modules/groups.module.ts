import { Module } from '@nestjs/common';

import { GroupRepository } from '@repositories/group.repository';

import * as CreateGroup from '@usecases/create-group';
import { ModuleBuilder } from '@shared/handler/module-builder';

const moduleMetadata = new ModuleBuilder('groups', [CreateGroup], {
  Repositories: [GroupRepository],
});

@Module(moduleMetadata.metadata)
export class GroupsModule {}
