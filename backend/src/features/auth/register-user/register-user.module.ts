import { Module } from '@nestjs/common';
import { RegisterUserHandler } from './register-user.handler';
import { RegisterUserController } from './register-user.controller';
import { CreateUserModule } from 'src/features/users/create-user/create-user.module';

@Module({
  imports: [CreateUserModule],
  providers: [RegisterUserHandler],
  controllers: [RegisterUserController],
})
export class RegisterUserModule {}