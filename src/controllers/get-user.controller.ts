import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class GetUserController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Busca usuário com ID: ${id}`;
  }
}
