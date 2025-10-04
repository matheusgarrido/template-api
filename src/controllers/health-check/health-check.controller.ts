import { Controller, Get, HttpCode } from '@nestjs/common';
import type { HealthPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HealthCheckUsecase } from '@usecases/health-check/health-check.usecase';

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController extends IController<HealthCheckUsecase> {
  constructor(protected readonly usecase: HealthCheckUsecase) {
    super(usecase);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Health Check',
    schema: {
      example: {
        status: 'ok',
      } as P,
    },
  })
  async create(): Promise<P> {
    const status = await this.usecase.execute();
    const adapterResponse: P = {
      status: status,
    };

    return adapterResponse;
  }
}
