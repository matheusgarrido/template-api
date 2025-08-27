import Sequelize, { Model } from 'sequelize';
import { DatabaseConnections } from './connections';
import { EntityId } from '@entities/entity';

export class DatabaseRouter {
  constructor(private dbConnections: DatabaseConnections) {}

  public query(
    queryString: string,
    options?: Sequelize.QueryOptionsWithType<Sequelize.QueryTypes.UPDATE>,
  ) {
    const isSelectQuery = queryString.trim().toLowerCase().startsWith('select');
    const isMasterRequired = options?.useMaster === true;

    if (
      !isSelectQuery ||
      isMasterRequired ||
      !this.dbConnections.countReplicas
    ) {
      return this.dbConnections.master.query(queryString, options);
    }

    const readConnection = this.dbConnections.getConnection();
    return readConnection.query(queryString, options);
  }

  public transaction(callback: any) {
    return this.dbConnections.master.transaction(callback);
  }

  public save(model: Sequelize.Model<any, any>) {
    return model.save({ sequelize: this.dbConnections.master } as any);
  }

  public create<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    values: Partial<Sequelize.CreationAttributes<M>>,
    options?: any,
  ) {
    return model.create(values as Sequelize.CreationAttributes<M>, {
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public update<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    values: any,
    options?: any,
  ) {
    return model.update(values, {
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public destroy<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    options?: any,
  ) {
    return model.destroy({
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public findByPk<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    id: EntityId,
  ) {
    return model.findByPk(id);
  }

  public findOne<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    options: Sequelize.FindOptions,
  ) {
    return model.findOne({
      ...(options as any),
      sequelize: this.dbConnections.getConnection(),
    });
  }

  public findAll<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    options: Sequelize.FindOptions,
  ) {
    return model.findAll({
      ...(options as any),
      sequelize: this.dbConnections.getConnection(),
    });
  }

  public findAndCountAll<M extends Model>(
    model: Sequelize.ModelStatic<M>,
    options: Sequelize.FindOptions,
  ) {
    return model.findAndCountAll({
      ...(options as any),
      sequelize: this.dbConnections.getConnection(),
    });
  }
}
