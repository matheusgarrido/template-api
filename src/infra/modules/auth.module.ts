import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user.repository';

import * as Login from '@usecases/auth-login';
import { ModuleBuilder } from '@shared/handler/module-builder';
import { PasswordService, TokenService } from '@infra/services';

const moduleMetadata = new ModuleBuilder(
  [Login],
  [UserRepository],
  [TokenService, PasswordService],
);

@Module(moduleMetadata.metadata)
export class AuthModule {}
