import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthenticateUserHandler } from './authenticate-user.handler';
import { AuthenticateUserValidator } from './authenticate-user.validator';
import type { Response } from 'express';

@Controller('auth')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserHandler: AuthenticateUserHandler,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() authenticateUser: AuthenticateUserValidator,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, id, email } =
      await this.authenticateUserHandler.execute(authenticateUser);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return {
      id: id,
      email: email,
    };
  }
}
