import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { FindUserHandler } from '../../users/find-user/find-user.handler';

@Injectable()
export class AuthenticateUserHandler {
  constructor(
    private jwtService: JwtService,
    private readonly findUserHandler: FindUserHandler,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.findUserHandler.findUser(username);
    if (user?.password !== pass) {
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
