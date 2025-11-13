import { GroupModel } from '@database/master/models/main/group.model';
import { EntityId, PartialEntity } from '@entities/entity';
import { IGroupEntity, Group } from '@entities/group.entity';
import { GroupNotFoundError } from '@shared/errors';
import {
  IRepository,
  IRepositoryFindAllResponse,
} from '@shared/protocols/repository.protocol';

export class GroupRepository extends IRepository<Group> {
  protected get EntityClass() {
    return Group;
  }

  async create(group: Group) {
    try {
      const model = await GroupModel.create(group.properties);
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

    const model = await GroupModel.findByPk(id);
    return this.toDomain(model);
  }

  async findOne(attributes: Partial<IGroupEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await GroupModel.findOne({
      where: attributes,
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<Group>> {
    const result = await GroupModel.findAndCountAll({});
    const entities = result.rows.map((model) =>
      this.toDomain(model),
    ) as Group[];

    return {
      data: entities,
      total: result.count,
    };
  }

  async update(
    group: PartialEntity<Group>,
    returnObject: boolean = true,
  ): Promise<Group | boolean | null> {
    if (!group.id) {
      throw new GroupNotFoundError();
    }

    const [affectedCount] = await GroupModel.update(group.properties, {
      where: { id: group.id },
    });

    if (returnObject) {
      return await this.findByPk(group.id);
    }

    return affectedCount > 0;
  }

  async remove(group: PartialEntity<Group>): Promise<boolean> {
    const deleted = await GroupModel.destroy({
      where: { id: group.id },
    });

    return !!deleted;
  }
}
