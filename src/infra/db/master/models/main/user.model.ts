import { Model } from 'sequelize';
import { databaseMasterConnections } from '@database/master';

class User extends Model {
  public id!: number;
}

User.init(
  {
    id: {
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: databaseMasterConnections.master,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  },
);
