import { EntityId } from '@shared/protocols/entity.protocol';
import { ISafeUserEntity } from '@entities/user.entity';
import { IdParamsDto } from '@shared/protocols/dto.protocol';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export interface ICurrentUser extends ISafeUserEntity {
  id: EntityId;
  iat: number;
  exp: number;
}

export class CurrentUserDto extends IdParamsDto implements ICurrentUser {
  @IsEmail({}, { message: 'invalid-email' })
  email: string;

  @IsString({ message: 'invalid-name' })
  name: string;

  @IsDateString({}, { message: 'invalid-date' })
  createdAt?: Date;

  @IsDate({ message: 'invalid-date' })
  updatedAt?: Date;

  @IsNumber({}, { message: 'invalid-time' })
  @IsPositive({ message: 'invalid-time' })
  iat: number;

  @IsNumber({}, { message: 'invalid-time' })
  @IsPositive({ message: 'invalid-time' })
  exp: number;
}
