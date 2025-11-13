import { SafeUser, User } from '@entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUser extends SafeUser {
  iat: number;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const rawUser = request['user'] as CurrentUser;

    if (!rawUser) return null;

    // Cria uma instância real da entidade
    const entityUser = new User(rawUser, rawUser.id);

    // Se o decorador foi chamado com uma chave (ex: @CurrentUser('email')),
    // devolve apenas aquela propriedade
    return data ? entityUser[data] : entityUser;
  },
);
