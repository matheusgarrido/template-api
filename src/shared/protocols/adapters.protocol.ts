export abstract class OutputAdapter<Input, Output> {
  abstract adapt(input: Input): Output;
}
