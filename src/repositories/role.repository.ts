import { RoleModel } from '@database/master/models/main/role.model';
import { EntityId, PartialEntity } from '@shared/protocols/entity.protocol';
import { IRoleEntity, Role } from '@entities/role.entity';
import { RoleNotFoundError } from '@shared/errors';
import {
  IRepository,
  IRepositoryFindAllResponse,
} from '@shared/protocols/repository.protocol';

export class RoleRepository extends IRepository<Role> {
  protected get EntityClass() {
    return Role;
  }

  async create(role: Role) {
    try {
      const model = await RoleModel.create(role.properties);
      return this.toDomain(model);
    } catch (err) {
      this.logger.error(err.message);
      return null;
    }
  }

  async findByPk(id: EntityId) {
    if (!id) {
      return null;
    }

    const model = await RoleModel.findByPk(id);
    return this.toDomain(model);
  }

  async findOne(attributes: Partial<IRoleEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await RoleModel.findOne({
      where: attributes,
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<Role>> {
    const result = await RoleModel.findAndCountAll({});
    const entities = result.rows.map((model) => this.toDomain(model)) as Role[];

    return {
      data: entities,
      total: result.count,
    };
  }

  async update(
    role: PartialEntity<Role>,
    returnObject: boolean = true,
  ): Promise<Role | boolean | null> {
    if (!role.id) {
      throw new RoleNotFoundError();
    }

    const [affectedCount] = await RoleModel.update(role.properties, {
      where: { id: role.id },
    });

    if (returnObject) {
      return await this.findByPk(role.id);
    }

    return affectedCount > 0;
  }

  async remove(role: PartialEntity<Role>): Promise<boolean> {
    const deleted = await RoleModel.destroy({
      where: { id: role.id },
    });

    return !!deleted;
  }
}
