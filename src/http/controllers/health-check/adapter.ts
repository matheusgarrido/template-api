import { IAdapter } from '@shared/protocols/adapter.protocol';

interface IHealthCheckHttpResponse {
  status: string;
}

export class HealthCheckAdapter extends IAdapter<IHealthCheckHttpResponse> {
  adapt() {
    return {
      status: 'ok',
    };
  }
}

export const healthCheckAdapterMock = new HealthCheckAdapter();
