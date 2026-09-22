import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthenticateUserHandler } from './authenticate-user.handler';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { AuthenticateUserValidator } from './authenticate-user.validator';

@Controller('auth')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserHandler: AuthenticateUserHandler,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() authenticateUser: AuthenticateUserValidator) {
    return this.authenticateUserHandler.execute(authenticateUser);
  }
}
