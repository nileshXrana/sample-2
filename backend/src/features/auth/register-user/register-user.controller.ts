import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserHandler } from './register-user.handler';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { RegisterUserValidator } from './register-user.validator';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly registerUserHandler: RegisterUserHandler) {}

  @Public()
  @Post('register')
  register(@Body() registerUser: RegisterUserValidator) {
    return this.registerUserHandler.execute(registerUser);
  }
}
