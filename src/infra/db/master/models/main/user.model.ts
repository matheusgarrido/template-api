import { databaseMasterConnections } from '@database/master';
import { IUserEntity, User } from '@entities/users.entity';
import { IModel } from '@shared/protocols/models.protocol';
import Sequelize from 'sequelize';

export class UserModel extends IModel<User> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  get properties(): IUserEntity {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

UserModel.init(
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: databaseMasterConnections.master,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);
