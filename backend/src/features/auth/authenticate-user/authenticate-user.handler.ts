import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserHandler } from '../../users/find-user/find-user.handler';
import { AuthenticateUserValidator } from './authenticate-user.validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateUserHandler {
  constructor(
    private jwtService: JwtService,
    private readonly findUserHandler: FindUserHandler,
  ) {}

  async execute(authenticateUser: AuthenticateUserValidator) {
    const { email, password } = authenticateUser;

    const user = await this.findUserHandler.execute(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid Password');
      }

      const payload = { id: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);
      return {
        token: token,
        id: user.id,
        email: user.email,
      };
    } else {
      throw new UnauthorizedException('Invalid Email');
    }
  }
}
