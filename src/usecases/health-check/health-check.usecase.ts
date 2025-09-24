import { Inject, Injectable } from '@nestjs/common';
import { IHealthCheckInput as I, IHealthCheckOutput as O } from './dto';
import { IHealthCheckGateway as G } from './gateway';
import { IUsecase } from '@shared/protocols/usecase.protocol';

@Injectable()
export class HealthCheckUsecase extends IUsecase<I, O, G> {
  constructor(@Inject(G) protected readonly gateway: G) {
    super(gateway);
  }

  async execute(): O {
    const value = await (Promise.resolve('ok') as O);
    return value;
  }
}
