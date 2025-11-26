import { ApiProperty } from '@nestjs/swagger';
import { roleMock } from '@tests/role.mock';
import { IdParamsDto } from '@shared/protocols/dto.protocol';

export class CreateRoleParamsDto extends IdParamsDto {}

export class CreateRoleBodyDto {
  @ApiProperty({
    description: 'The name of the role',
    example: roleMock.name,
    uniqueItems: true,
  })
  name: string;

  @ApiProperty({
    description: 'The description of the role',
    example: roleMock.description,
  })
  description?: string;
}
