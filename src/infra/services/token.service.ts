import { SafeUser } from '@entities/user.entity';
import { CurrentUserDto } from '@shared/decorators';
import { InvalidTokenAccessError } from '@shared/errors/unauthorized';
import { EntityId } from '@shared/protocols/entity.protocol';
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

  verify(token?: string): CurrentUserDto {
    if (!token) throw new InvalidTokenAccessError();
    try {
      const payload = jwt.verify(token, this.secret) as CurrentUserDto;
      return payload;
    } catch {
      throw new InvalidTokenAccessError();
    }
  }
}
