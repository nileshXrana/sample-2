  import { Module } from '@nestjs/common';
  import { AuthenticateUserModule } from './authenticate-user/authenticate-user.module';
  import { RegisterUserModule } from './register-user/register-user.module';

  @Module({
    imports: [AuthenticateUserModule, RegisterUserModule],
  })
  export class AuthModule {}
