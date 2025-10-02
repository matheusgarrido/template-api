import bcrypt from 'bcryptjs';

export class Password {
  static async generateHash(password: string): Promise<string | undefined> {
    if (password) {
      const passwordHash = await bcrypt.hash(password, 8);
      return passwordHash;
    }
  }
}
