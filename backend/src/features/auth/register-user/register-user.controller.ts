import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserHandler } from './register-user.handler';
import { Public } from 'src/infrastructure/decorators/public.decorator';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly registerUserHandler: RegisterUserHandler) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: Record<string, any>) {
    return this.registerUserHandler.register(
      registerDto.username,
      registerDto.password,
    );
  }
}
