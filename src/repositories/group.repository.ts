import { databaseMaster } from '@database/master';
import { GroupModel } from '@database/master/models/main/group.model';
import { EntityId } from '@entities/entity';
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
      const model = await databaseMaster.create(GroupModel, group.properties);
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

    const model = await databaseMaster.findByPk(GroupModel, id);
    return this.toDomain(model);
  }

  async findOne(attributes: Partial<IGroupEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await databaseMaster.findOne(GroupModel, {
      where: attributes,
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<Group>> {
    const result = await databaseMaster.findAndCountAll(GroupModel, {});
    const entities = result.rows.map((model) =>
      this.toDomain(model),
    ) as Group[];

    return {
      data: entities,
      total: result.count,
    };
  }

  async update(
    group: Partial<Group>,
    returnObject: boolean = true,
  ): Promise<Group | boolean | null> {
    if (!group.id) {
      throw new GroupNotFoundError();
    }

    const [affectedCount] = await databaseMaster.update(
      GroupModel,
      group.properties,
      {
        where: { id: group.id },
      },
    );

    if (returnObject) {
      return await this.findByPk(group.id);
    }

    return affectedCount > 0;
  }

  async remove(group: Partial<Group>): Promise<boolean> {
    console.log('group: ==>', group);
    const deleted = await databaseMaster.destroy(GroupModel, {
      where: { id: group.id },
    });

    return !!deleted;
  }
}
