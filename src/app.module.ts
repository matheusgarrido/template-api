import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users.module';
import { HealthController } from '@controllers/health-check/health-check.controller';

@Module({
  imports: [UsersModule],
  controllers: [HealthController],
  providers: [AppService],
})
export class AppModule {}
