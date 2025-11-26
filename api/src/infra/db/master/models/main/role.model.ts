import Sequelize from 'sequelize';
import { IRoleEntity, Role } from '@entities/role.entity';
import { IModel } from '@shared/protocols/models.protocol';
import { masterDatabase } from '@database/master';

export class RoleModel extends IModel<Role> {
  declare name: string;
  declare description?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;

  get properties(): IRoleEntity {
    return {
      name: this.name,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

RoleModel.init(
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
    description: {
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
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: masterDatabase.connection,
    modelName: 'role',
    tableName: 'roles',
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);
