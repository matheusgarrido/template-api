import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class GetUsersController {
  @Get()
  findAll() {
    return 'Busca todos os usuários';
  }
}
