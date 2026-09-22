import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { FindUserHandler } from '../../users/find-user/find-user.handler';
import { AuthenticateUserValidator } from './authenticate-user.validator';

@Injectable()
export class AuthenticateUserHandler {
  constructor(
    private jwtService: JwtService,
    private readonly findUserHandler: FindUserHandler,
  ) {}

  async execute(authenticateUser: AuthenticateUserValidator) {
    const { email, password } = authenticateUser;

    const user = await this.findUserHandler.execute(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.userId, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
}
