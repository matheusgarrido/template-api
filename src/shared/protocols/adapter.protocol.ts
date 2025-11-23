import { Entity } from '@entities/entity';
import { IHateoasLink } from '@http/routes';

interface IListAdapterItem<Item extends Partial<Entity<any>>>
  extends IHateoasLink {
  item: Item;
}

export interface IListAdapter<Item extends Partial<Entity<any>>>
  extends IHateoasLink {
  items: IListAdapterItem<Item>[];
  count: number;
  total: number;
}

export abstract class AbstractAdapter<Output = any, Input = any> {
  public readonly value: Output;

  constructor(protected readonly input?: Input) {}

  protected abstract adapt(input?: Input): Output;
}
