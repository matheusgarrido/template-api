export interface IHealthCheckInput {
  id: string;
}

export type IHealthCheckOutput = Promise<'ok'>;
