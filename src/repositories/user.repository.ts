import { databaseMaster } from '@database/master';
import { UserModel } from '@database/master/models/main/user.model';
import { EntityId } from '@entities/entity';
import { IUserEntity, User } from '@entities/users.entity';
import {
  IRepository,
  IRepositoryFindAllResponse,
} from '@shared/protocols/repository.protocol';

export class UserRepository extends IRepository<User> {
  async create(user: User) {
    try {
      const model = await databaseMaster.create(UserModel, user.properties);
      return UserRepository.toDomain(model);
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
    return UserRepository.toDomain(model);
  }

  async findOne(attributes: Partial<IUserEntity>) {
    if (!attributes) {
      return null;
    }

    const model = await databaseMaster.findOne(UserModel, {
      where: attributes,
    });

    return UserRepository.toDomain(model);
  }

  async findAll(): Promise<IRepositoryFindAllResponse<User>> {
    const result = await databaseMaster.findAndCountAll(UserModel, {});
    const entities = result.rows.map((model) =>
      UserRepository.toDomain(model),
    ) as User[];

    return {
      data: entities,
      total: result.count,
    };
  }
}
