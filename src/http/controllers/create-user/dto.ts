import { ApiProperty } from '@nestjs/swagger';
import { userMock } from '@tests/user.mock';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserBodyDto {
  @IsNotEmpty({ message: 'name-required' })
  @Length(2, 100, { message: 'name-length' })
  @ApiProperty({
    description: 'The name of the user',
    example: userMock.name,
  })
  name: string;

  @IsNotEmpty({ message: 'email-required' })
  @IsEmail({}, { message: 'invalid-email' })
  @ApiProperty({
    description: 'The email of the user',
    example: userMock.email,
    uniqueItems: true,
  })
  email: string;

  @IsNotEmpty({ message: 'password-required' })
  @ApiProperty({
    description: 'The password of the user',
    example: userMock.password,
    format: 'password',
  })
  password: string;
}
