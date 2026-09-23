import { Module } from '@nestjs/common';
import { FindUserModule } from './find-user/find-user.module';
import { CreateUserModule } from './create-user/create-user.module';
import { GetCurrentUserModule } from './get-current-user/get-current-user.module';

@Module({
  imports: [FindUserModule, CreateUserModule, GetCurrentUserModule],
})
export class UsersModule {}
