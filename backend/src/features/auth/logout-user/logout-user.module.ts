import { Module } from '@nestjs/common';
import { LogoutUserController } from './logout-user.controller';

@Module({
  controllers: [LogoutUserController],
})
export class LogoutUserModule {}
