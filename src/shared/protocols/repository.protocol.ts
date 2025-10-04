import { Entity } from '@entities/entity';
import { IModel } from './models.protocol';
import { Logger } from 'nestjs-pino';

export interface IRepositoryFindAllResponse<E extends Entity<any>> {
  data: E[];
  total: number;
}

export abstract class IRepository<E extends Entity<any>> {
  constructor(protected readonly logger: Logger) {}

  protected abstract get EntityClass(): new (
    properties: Partial<E['properties']>,
    id?: E['id'],
  ) => E;

  toDomain<M extends IModel<any>>(model: M | void | null): M['entity'] | null {
    if (!model) {
      return null;
    }

    const entity = new this.EntityClass(model.properties, model.id);

    return entity;
  }

  abstract create(obj: Partial<E>): Promise<E | null>;

  abstract findByPk(id: string): Promise<E | null>;

  abstract findOne(obj: Partial<E>): Promise<E | null>;

  abstract findAll(): Promise<IRepositoryFindAllResponse<E>>;

  abstract update(
    obj: Partial<E>,
    returnObject: boolean,
  ): Promise<E | boolean | null>;

  abstract remove(obj: Partial<E>): Promise<boolean>;
}
