export type EntityId = string | number;

export type PartialEntity<E extends Entity<any>> =
  E extends Entity<infer P> ? Entity<Partial<P>> : never;

export class Entity<EntityProps> {
  private readonly $properties: Partial<EntityProps>;
  private readonly $id: EntityId | undefined;
  private readonly $entityName: string;

  constructor(properties: Partial<EntityProps>, id?: EntityId) {
    this.$properties = properties || null;
    this.$id = id;
    this.$entityName = this.constructor.name;
  }

  get id() {
    return this.$id;
  }

  get properties() {
    return this.$properties;
  }

  get entityName() {
    return this.$entityName;
  }

  toJSON() {
    return {
      ...this.$properties,
      id: this.$id,
    };
  }

  toSafeJSON() {
    return this.toJSON();
  }
}
