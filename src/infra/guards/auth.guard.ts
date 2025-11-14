import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from '../services';
import { InvalidTokenAccessError } from '@shared/errors';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new InvalidTokenAccessError();
    }

    const token = authHeader.split(' ')[1];

    try {
      const userPayload = this.tokenService.verify(token);

      request['user'] = userPayload;

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new InvalidTokenAccessError();
    }
  }
}
