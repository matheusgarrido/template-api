export type EntityId = string | number;

export class Entity<EntityProps> {
  private readonly $properties: Partial<EntityProps>;
  private readonly $id: EntityId | undefined;

  constructor(properties: Partial<EntityProps>, id?: EntityId) {
    this.$properties = properties || null;
    this.$id = id;
  }

  get id() {
    return this.$id;
  }

  get properties() {
    return this.$properties;
  }

  toJSON() {
    return {
      ...this.$properties,
      id: this.$id,
    };
  }
}
