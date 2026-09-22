import { Module } from '@nestjs/common';
import { FindUserModule } from './find-user/find-user.module';

@Module({
  imports: [FindUserModule],
})
export class UsersModule {}
