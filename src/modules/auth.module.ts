import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user.repository';

import * as Login from '@usecases/auth-login';
import { ModuleBuilder } from '@shared/handler/module-builder';
import { PasswordService, TokenService } from '@infra/services';
import { AuthGuard } from '../infra/guards/auth.guard';

const moduleMetadata = new ModuleBuilder('auth', [Login], {
  Repositories: [UserRepository],
  InfraProviders: [TokenService, PasswordService, AuthGuard],
});

@Module(moduleMetadata.metadata)
export class AuthModule {}
