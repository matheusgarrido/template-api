import Sequelize from 'sequelize';
import { Entity, EntityId } from '@entities/entity';

type ModelAttributes<EntityProperties> = EntityProperties & {
  id: EntityId | undefined;
};

export abstract class IModel<
  E extends Entity<any>,
  Props = E['properties'],
> extends Sequelize.Model<ModelAttributes<Props>, ModelAttributes<Props>> {
  declare readonly id: EntityId;
  declare readonly entity: E;

  abstract get properties(): Props;
}
