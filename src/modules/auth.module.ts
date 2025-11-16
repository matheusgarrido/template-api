import { Module } from '@nestjs/common';

import { ModuleBuilder } from '@shared/handler/module-builder';

import * as UsecaseAuthLogin from '@usecases/auth-login';
import * as HttpAuthLogin from '@controllers/auth-login';

import { UserRepository } from '@repositories/user.repository';
import { PasswordService, TokenService } from '@infra/services';
import { AuthGuard } from '@infra/decorators/auth';

const moduleMetadata = new ModuleBuilder(
  'auth',
  [HttpAuthLogin],
  [UsecaseAuthLogin],
  {
    Repositories: [UserRepository],
    InfraProviders: [TokenService, PasswordService, AuthGuard],
  },
);

@Module(moduleMetadata.metadata)
export class AuthModule {}
