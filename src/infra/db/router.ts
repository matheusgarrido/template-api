import Sequelize from 'sequelize';
import { DatabaseConnections } from './connections';

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

  public create(
    model: Sequelize.ModelStatic<any>,
    values: Sequelize.CreationAttributes<any>,
    options?: any,
  ) {
    return model.create(values, {
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public update(model: Sequelize.ModelStatic<any>, values: any, options?: any) {
    return model.update(values, {
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public destroy(model: Sequelize.ModelStatic<any>, options?: any) {
    return model.destroy({
      ...options,
      sequelize: this.dbConnections.master,
    });
  }

  public findOne(
    model: Sequelize.ModelStatic<any>,
    options: Sequelize.FindOptions,
  ) {
    return model.findOne({
      ...(options as any),
      sequelize: this.dbConnections.getConnection(),
    });
  }

  public findAll(
    model: Sequelize.ModelStatic<any>,
    options: Sequelize.FindOptions,
  ) {
    return model.findAll({
      ...(options as any),
      sequelize: this.dbConnections.getConnection(),
    });
  }
}
