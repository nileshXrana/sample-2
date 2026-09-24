import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { LoginUserHandler } from './login-user.handler';
import { LoginUserValidator } from './login-user.validator';
import type { Response } from 'express';

@Controller('auth')
export class LoginUserController {
  constructor(private readonly loginUserHandler: LoginUserHandler) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUser: LoginUserValidator,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, id, email } = await this.loginUserHandler.execute(loginUser);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      id: id,
      email: email,
    };
  }
}