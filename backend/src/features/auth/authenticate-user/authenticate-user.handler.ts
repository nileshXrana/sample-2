import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.userId, email: user.email };
    return await this.jwtService.signAsync(payload);

  }
}
