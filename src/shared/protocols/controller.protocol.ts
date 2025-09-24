import { PinoLogger } from 'nestjs-pino';
import { IUsecase } from './usecase.protocol';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export abstract class IController<
  Usecase extends IUsecase<any, any, any> = any,
> {
  protected readonly logger: PinoLogger;

  constructor(
    protected readonly usecase?: Usecase,
    moduleRef?: ModuleRef,
  ) {
    if (moduleRef) this.logger = moduleRef.get(PinoLogger, { strict: false });
    else this.logger = new PinoLogger({});

    this.logger.setContext((new.target as any).name);
  }
}
