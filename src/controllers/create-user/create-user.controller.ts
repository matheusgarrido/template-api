import { Controller, Post } from '@nestjs/common';
import type { ICreateUserInput as I, ICreateUserOutput as O } from './dto';

@Controller('users')
export class CreateUserController {
  @Post()
  create(input: I): O {
    console.log('input: ==>', input);
    return { id: '1' };
  }
}
