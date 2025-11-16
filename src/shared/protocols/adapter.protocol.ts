export abstract class IAdapter<Output = any, Input = any> {
  public readonly value: Output;

  constructor(protected readonly input?: Input) {}

  protected abstract adapt(input?: Input): Output;
}
