import { IUsecase } from './usecase.protocol';

export abstract class IController<Usecase extends IUsecase<any, any, any>> {
  constructor(protected readonly usecase?: Usecase) {}
}
