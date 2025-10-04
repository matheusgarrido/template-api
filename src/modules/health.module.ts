import { Module } from '@nestjs/common';

import * as HealthCheck from '@usecases/health-check';
import { ModuleBuilder } from '@shared/handler/module-builder';

const moduleMetadata = new ModuleBuilder('health', [HealthCheck]);

@Module(moduleMetadata.metadata)
export class HealthModule {}
