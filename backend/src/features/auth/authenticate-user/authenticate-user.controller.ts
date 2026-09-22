import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthenticateUserHandler } from './authenticate-user.handler';
import { Public } from 'src/infrastructure/decorators/public.decorator';

@Controller('auth')
export class AuthenticateUserController {
  constructor(private readonly authenticateUserHandler: AuthenticateUserHandler) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authenticateUserHandler.signIn(signInDto.username, signInDto.password);
  }
}