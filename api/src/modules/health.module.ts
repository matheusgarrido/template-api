import { Module } from '@nestjs/common';

import * as HttpHealthCheck from '@controllers/health-check';
import { ModuleBuilder } from '@shared/handler/module-builder';

const moduleMetadata = new ModuleBuilder('health', [HttpHealthCheck]);

@Module(moduleMetadata.metadata)
export class HealthModule {}
