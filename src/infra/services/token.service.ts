import { User } from '@entities/user.entity';
import { CurrentUserDto } from '@shared/decorators';
import { InvalidTokenAccessError } from '@shared/errors/unauthorized';
import { EntityId } from '@shared/protocols/entity.protocol';
import jwt from 'jsonwebtoken';

interface TokenServiceInput {
  user: User;
}

interface TokenData {
  id: EntityId;
}

export class TokenService {
  private secret = process.env.TOKEN_SECRET!;

  generate(tokenServiceInput: TokenServiceInput): string {
    const user = tokenServiceInput.user.toToken();
    const tokenData: TokenData = {
      id: user.id,
    };

    const token = jwt.sign(tokenData, this.secret, {
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
