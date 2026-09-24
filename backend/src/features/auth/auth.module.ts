import { Module } from '@nestjs/common';
import { LoginUserModule } from './login-user/login-user.module';
import { RegisterUserModule } from './register-user/register-user.module';

@Module({
  imports: [LoginUserModule, RegisterUserModule],
})
export class AuthModule {}
