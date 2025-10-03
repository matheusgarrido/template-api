import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user.repository';

import * as CreateUser from '@usecases/create-user';
import * as GetUser from '@usecases/get-user';
import * as ListUsers from '@usecases/list-users';
import * as UpdateUser from '@usecases/update-user';
import { ModuleBuilder } from '@shared/handler/module-builder';

const moduleMetadata = new ModuleBuilder(
  [CreateUser, GetUser, ListUsers, UpdateUser],
  [UserRepository],
);

@Module(moduleMetadata.metadata)
export class UsersModule {}
