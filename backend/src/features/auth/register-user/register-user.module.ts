import { Module } from '@nestjs/common';
import { RegisterUserHandler } from './register-user.handler';
import { RegisterUserController } from './register-user.controller';

@Module({
  imports: [],
  providers: [RegisterUserHandler],
  controllers: [RegisterUserController],
})
export class RegisterUserModule {}