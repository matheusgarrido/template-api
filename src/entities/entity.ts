export type EntityId = string | number;

export class Entity<EntityProps> {
  $properties: Partial<EntityProps>;
  $id: EntityId | undefined;

  constructor(properties: Partial<EntityProps>, id?: EntityId) {
    console.log('properties partial: ==>', properties);
    this.$properties = properties || null;
    this.$id = id;
  }

  get id() {
    return this.$id;
  }

  toJSON() {
    return {
      ...this.$properties,
      id: this.$id,
    };
  }
}
