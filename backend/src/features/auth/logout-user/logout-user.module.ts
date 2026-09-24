import { Module } from '@nestjs/common';
import { LogoutUserController } from './logout-user.controller';
import { LogoutUserHandler } from './logout-user.handler';

@Module({
  controllers: [LogoutUserController],
  providers: [LogoutUserHandler]
})
export class LogoutUserModule {}
