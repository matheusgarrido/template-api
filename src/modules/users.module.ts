import { Module } from '@nestjs/common';

import { UserRepository } from '@repositories/user.repository';

import * as UsecaseCreateUser from '@usecases/create-user';
import * as HttpCreateUser from '@controllers/create-user';
import * as UsecaseGetUser from '@usecases/get-user';
import * as HttpGetUser from '@controllers/get-user';
import * as UsecaseListUsers from '@usecases/list-users';
import * as HttpListUsers from '@controllers/list-users';
import * as UsecaseRemoveUser from '@usecases/remove-user';
import * as HttpRemoveUser from '@controllers/remove-user';
import * as UsecaseUpdateUser from '@usecases/update-user';
import * as HttpUpdateUser from '@controllers/update-user';

import { ModuleBuilder } from '@shared/handler/module-builder';

const moduleMetadata = new ModuleBuilder(
  'users',
  [HttpCreateUser, HttpGetUser, HttpListUsers, HttpRemoveUser, HttpUpdateUser],
  [
    UsecaseCreateUser,
    UsecaseGetUser,
    UsecaseListUsers,
    UsecaseRemoveUser,
    UsecaseUpdateUser,
  ],

  {
    Repositories: [UserRepository],
  },
);

@Module(moduleMetadata.metadata)
export class UsersModule {}
