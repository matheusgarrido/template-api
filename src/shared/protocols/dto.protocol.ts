import type { EntityId } from '@entities/entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class IdParamsDto {
  @IsNotEmpty({ message: 'id-required' })
  @IsNumber({}, { message: 'invalid-id' })
  @IsPositive({ message: 'invalid-id' })
  @Type(() => Number)
  @ApiProperty({
    description: 'ID of the entity',
    example: 1,
  })
  id: EntityId;
}
