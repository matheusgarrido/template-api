import { PinoLogger } from 'nestjs-pino';
import { IUsecase } from './usecase.protocol';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IAdapter } from './adapter.protocol';

@Injectable()
export abstract class IController<
  Adapter extends IAdapter<any, any> = any,
  Usecase extends IUsecase<any, any, any> = any,
> {
  protected readonly logger: PinoLogger;
  protected readonly usecase: Usecase;
  protected readonly adapter: Adapter;

  constructor(adapter: Adapter, usecase?: Usecase, moduleRef?: ModuleRef) {
    this.adapter = adapter;
    if (usecase) this.usecase = usecase;

    if (moduleRef) this.logger = moduleRef.get(PinoLogger, { strict: false });
    else this.logger = new PinoLogger({});

    this.logger.setContext((new.target as any).name);
  }
}
