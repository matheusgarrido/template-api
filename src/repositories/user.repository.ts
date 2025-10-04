import { databaseMaster } from '@database/master';
import { UserModel } from '@database/master/models/main/user.model';
import { EntityId } from '@entities/entity';
import { IUserEntity, User } from '@entities/users.entity';
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
      const model = await databaseMaster.create(UserModel, user.properties);
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

    const model = await databaseMaster.findByPk(UserModel, id);
    return this.toDomain(model);
  }

  async findOne(attributes: Partial<IUserEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await databaseMaster.findOne(UserModel, {
      where: attributes,
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<User>> {
    const result = await databaseMaster.findAndCountAll(UserModel, {});
    const entities = result.rows.map((model) => this.toDomain(model)) as User[];

    return {
      data: entities,
      total: result.count,
    };
  }

  async update(
    user: Partial<User>,
    returnObject: boolean = true,
  ): Promise<User | boolean | null> {
    console.log('user: ==>', user);
    const [affectedCount] = await databaseMaster.update(
      UserModel,
      user.properties,
      {
        where: { id: user.id },
      },
    );

    if (returnObject) {
      return await this.findByPk(user.id!);
    }

    return affectedCount > 0;
  }

  async remove(user: Partial<User>): Promise<boolean> {
    console.log('user: ==>', user);
    const deleted = await databaseMaster.destroy(UserModel, {
      where: { id: user.id },
    });

    return !!deleted;
  }
}
