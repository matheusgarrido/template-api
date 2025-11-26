import { plainToInstance } from 'class-transformer';
import { IUserEntity, User } from '@entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { Request } from 'express';
import { validationOptionsPipe } from '@infra/config/validation/validation.pipe';
import { CurrentUserDto, ICurrentUser } from './dto';

export type { CurrentUserDto, ICurrentUser };

export const CurrentUserDecorator = createParamDecorator(
  (data: keyof ICurrentUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const rawUser = request['user'] as ICurrentUser;

    if (!rawUser) return null;

    const dto = plainToInstance(CurrentUserDto, rawUser);

    validateSync(dto, validationOptionsPipe);

    // Cria uma instância real da entidade
    const entityUser = new User(dto as Partial<IUserEntity>, dto.id);

    // Se o decorador foi chamado com uma chave (ex: @CurrentUser('email')),
    // devolve apenas aquela propriedade
    return data ? entityUser[data] : entityUser;
  },
);
