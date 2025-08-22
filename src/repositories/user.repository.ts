import { User } from '@entities/users.entity';
import { IRepository } from '@shared/protocols/repository.protocol';

export class UserRepository extends IRepository<User> {
  create(user: User): User {
    const id = (Math.random() * 1000).toString();
    const newUser = new User(user.$properties, id);
    this.list.push(newUser);
    return newUser;
  }

  findById(id: string): User | null {
    const user = this.list.find((user) => id && user.id === id);
    return user || null;
  }

  findOne(obj: Partial<User>): User | null {
    const user = this.list.find((user) => {
      return Object.keys(obj).every((key) => user[key] === obj[key]);
    });
    return user || null;
  }

  findAll(): User[] {
    return this.list;
  }
}
