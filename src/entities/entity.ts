export type EntityId = string | number;

export class Entity<EntityProps> {
  $properties: Partial<EntityProps>;
  $id: EntityId | undefined;

  constructor(properties: Partial<EntityProps>, id?: EntityId) {
    this.$properties = properties || {};
    this.$id = id;
  }

  get id(): EntityId | undefined {
    return this.$id;
  }
}
