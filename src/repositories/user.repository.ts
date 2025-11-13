import { UserModel } from '@database/master/models/main/user.model';
import { EntityId, PartialEntity } from '@entities/entity';
import { IUserEntity, User } from '@entities/user.entity';
import {
  IRepository,
  IRepositoryFindAllResponse,
} from '@shared/protocols/repository.protocol';

export class UserRepository extends IRepository<User> {
  protected get EntityClass() {
    return User;
  }

  async create(user: User) {
    try {
      const model = await UserModel.create(user.properties);
      return this.toDomain(model);
    } catch (err) {
      console.log('err: ==>', err);
      this.logger.error(err.message);
      return null;
    }
  }

  async findByPk(id: EntityId) {
    if (!id) {
      return null;
    }

    const model = await UserModel.findByPk(id);
    return this.toDomain(model);
  }

  async findOne(attributes: Partial<IUserEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await UserModel.findOne({
      where: attributes,
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<User>> {
    const result = await UserModel.findAndCountAll({});
    const entities = result.rows.map((model) => this.toDomain(model)) as User[];

    return {
      data: entities,
      total: result.count,
    };
  }

  async update(
    user: PartialEntity<User>,
    returnObject: boolean = true,
  ): Promise<User | boolean | null> {
    const [affectedCount] = await UserModel.update(user.properties, {
      where: { id: user.id },
    });

    if (returnObject) {
      return await this.findByPk(user.id!);
    }

    return affectedCount > 0;
  }

  async remove(user: PartialEntity<User>): Promise<boolean> {
    const deleted = await UserModel.destroy({
      where: { id: user.id },
    });

    return !!deleted;
  }
}
