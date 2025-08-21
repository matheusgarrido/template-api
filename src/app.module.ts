import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { GetUserController } from './controllers/get-user.controller';
import { GetUsersController } from './controllers/get-users.controller';

@Module({
  imports: [],
  controllers: [CreateUserController, GetUserController, GetUsersController],
  providers: [AppService],
})
export class AppModule {}
