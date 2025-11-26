import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@infra/logger/all-exceptions.filter';
import * as modules from '@modules/index';
import * as services from 'api/src/application/services';

@Module({
  imports: Object.values(modules),
  providers: [
    ...Object.values(services),
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
