import { Controller, Get, HttpCode } from '@nestjs/common';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HealthCheckAdapter, healthCheckAdapterMock } from './adapter';

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController extends IController<HealthCheckAdapter> {
  constructor(adapter: HealthCheckAdapter) {
    super(adapter);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Health Check',
    schema: {
      example: healthCheckAdapterMock.value,
    },
  })
  check() {
    return this.adapter.adapt();
  }
}
