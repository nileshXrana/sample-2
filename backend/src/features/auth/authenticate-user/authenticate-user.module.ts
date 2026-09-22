import { Module } from '@nestjs/common';
import { AuthenticateUserHandler } from './authenticate-user.handler';
import { AuthenticateUserController } from './authenticate-user.controller';
import { FindUserModule } from '../../users/find-user/find-user.module';

@Module({
  imports: [FindUserModule],
  providers: [AuthenticateUserHandler],
  controllers: [AuthenticateUserController],
})
export class AuthenticateUserModule {}
