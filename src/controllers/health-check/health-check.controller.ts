import { Controller, Get, HttpCode } from '@nestjs/common';
import type { HealthPresenter as P } from './adapter';
import { IController } from '@shared/protocols/controller.protocol';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

const output: P = {
  status: 'ok',
};

@ApiTags('Health Check')
@Controller('health')
export class HealthController extends IController<any> {
  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Healthy Check',
    schema: {
      example: output,
    },
  })
  create(): P {
    const adapterResponse: P = {
      status: output.status,
    };

    return adapterResponse;
  }
}
