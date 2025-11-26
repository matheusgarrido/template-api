import { ITokenUser } from '@entities/user.entity';
import { IdParamsDto } from '@shared/protocols/dto.protocol';
import { IsNumber, IsPositive } from 'class-validator';

export interface ICurrentUser extends ITokenUser {
  iat: number;
  exp: number;
}

export class CurrentUserDto extends IdParamsDto implements ICurrentUser {
  @IsNumber({}, { message: 'invalid-time' })
  @IsPositive({ message: 'invalid-time' })
  iat: number;

  @IsNumber({}, { message: 'invalid-time' })
  @IsPositive({ message: 'invalid-time' })
  exp: number;
}
