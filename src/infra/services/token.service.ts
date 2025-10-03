import { EntityId } from '@entities/entity';
import { SafeUser } from '@entities/users.entity';
import { InvalidUserCredentialsError } from '@shared/errors/unauthorized';
import jwt from 'jsonwebtoken';

interface ITokenInput extends Partial<SafeUser> {
  id: EntityId;
}

export class TokenService {
  private secret = process.env.TOKEN_SECRET!;

  generate(tokenInput: ITokenInput): string {
    const token = jwt.sign(tokenInput, this.secret, {
      expiresIn: '1d',
    });
    return token;
  }

  verify(token?: string): SafeUser {
    if (!token) throw new InvalidUserCredentialsError();
    try {
      const payload = jwt.verify(token, this.secret) as SafeUser;
      return payload;
    } catch {
      throw new InvalidUserCredentialsError();
    }
  }
}
