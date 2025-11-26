import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IUsecase<I, O, G> {
  constructor(protected readonly gateway: G) {}

  abstract execute(input: I): O;
}
