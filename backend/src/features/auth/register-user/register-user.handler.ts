import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserValidator } from './register-user.validator';

@Injectable()
export class RegisterUserHandler {
  constructor() {}

  async execute(registerUser: RegisterUserValidator) {
    const { email, password } = registerUser;

    return {
      message: `User ${email} registered successfully`,
      statusCode: 201,
    };
  }
}
