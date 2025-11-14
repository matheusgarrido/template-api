import { Module } from '@nestjs/common';

import * as Login from '@usecases/auth-login';
import { ModuleBuilder } from '@shared/handler/module-builder';
import { PasswordService, TokenService } from '@infra/services';
import { UserRepository } from '@repositories/user.repository';
import { AuthGuard } from '@infra/guards/auth';

const moduleMetadata = new ModuleBuilder('auth', [Login], {
  Repositories: [UserRepository],
  InfraProviders: [TokenService, PasswordService, AuthGuard],
});

@Module(moduleMetadata.metadata)
export class AuthModule {}
