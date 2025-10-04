import { SafeUser } from '@entities/users.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUser extends SafeUser {
  iat: number;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request['user'];

    return data ? user?.[data as string] : user;
  },
);
