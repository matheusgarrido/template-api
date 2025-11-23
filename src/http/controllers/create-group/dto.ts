import { ApiProperty } from '@nestjs/swagger';
import { groupMock } from '@tests/group.mock';
import { IdParamsDto } from '@shared/protocols/dto.protocol';

export class CreateGroupParamsDto extends IdParamsDto {}

export class CreateGroupBodyDto {
  @ApiProperty({
    description: 'The name of the group',
    example: groupMock.name,
    uniqueItems: true,
  })
  name: string;

  @ApiProperty({
    description: 'The description of the group',
    example: groupMock.description,
  })
  description?: string;
}
