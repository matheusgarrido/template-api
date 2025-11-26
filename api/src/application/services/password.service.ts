import { User } from '@entities/user.entity';
import bcrypt from 'bcryptjs';

export class PasswordService {
  async generateHash(password: string): Promise<string | undefined> {
    if (password) {
      const passwordHash = await bcrypt.hash(password, 8);
      return passwordHash;
    }
  }

  async compare(password: string, hashOrUser: User | string): Promise<boolean> {
    if (typeof hashOrUser === 'string') {
      return bcrypt.compare(password, hashOrUser);
    }

    if (!hashOrUser.passwordHash) return false;
    return bcrypt.compare(password, hashOrUser.passwordHash);
  }
}
