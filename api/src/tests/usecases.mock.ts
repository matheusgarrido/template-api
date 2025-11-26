import { IUsecase } from '@shared/protocols/usecase.protocol';

export class UsecaseMock<I, O, G> extends IUsecase<I, O, G> {
  execute = jest.fn();
}

export const usecaseMock = new UsecaseMock<any, any, any>({
  execute: jest.fn(),
  gateway: {} as any,
});
