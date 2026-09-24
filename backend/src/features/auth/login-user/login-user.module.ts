import { Module } from '@nestjs/common';
import { LoginUserHandler } from './login-user.handler';
import { LoginUserController } from './login-user.controller';
import { FindUserModule } from '../../users/find-user/find-user.module';

@Module({
  imports: [FindUserModule],
  providers: [LoginUserHandler],
  controllers: [LoginUserController],
})
export class LoginUserModule {}
