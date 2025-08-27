import { Entity } from '@entities/entity';
import { IModel } from './models.protocol';

export interface IRepositoryFindAllResponse<E extends Entity<any>> {
  data: E[];
  total: number;
}

export abstract class IRepository<E extends Entity<any>> {
  // abstract toDomain<M extends IModel<any>>(model: M | void): E | null;

  static toDomain<M extends IModel<any>>(
    model: M | void | null,
  ): M['entity'] | null {
    if (!model) {
      return null;
    }

    const entity = new Entity(model.properties, model.id);

    return entity;
  }

  protected list: E[] = [];

  abstract create(obj: Partial<E>): Promise<E | null>;

  abstract findByPk(id: string): Promise<E | null>;

  abstract findOne(obj: Partial<E>): Promise<E | null>;

  abstract findAll(): Promise<IRepositoryFindAllResponse<E>>;
}
