import { ApiProperty } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';
import { IdParamsDto } from '@shared/protocols/dto.protocol';

export class UpdateUserParamsDto extends IdParamsDto {}

export class UpdateUserBodyDto {
  @ApiProperty({
    description: 'The name of the user',
    example: userMock.name,
  })
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: userMock.email,
    uniqueItems: true,
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: userMock.password,
    format: 'password',
  })
  password?: string;
}
