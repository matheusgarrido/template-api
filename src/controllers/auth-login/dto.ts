import { ApiProperty } from '@nestjs/swagger';
import { userMock } from 'src/tests/user.mock';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginBodyDto {
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
