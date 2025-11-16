export type EntityId = string | number;

export type EntityJson<EntityProps> = Partial<EntityProps> & {
  id: EntityId | undefined;
};

export interface IEntity<EntityProps> {
  id: EntityId | undefined;

  properties: Partial<EntityProps>;

  entityName: string;

  toJSON: () => EntityJson<EntityProps>;
}

export type PartialEntity<E extends IEntity<any>> =
  E extends IEntity<infer P> ? IEntity<Partial<P>> : never;
