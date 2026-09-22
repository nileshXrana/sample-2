import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RegisterUserHandler {
  constructor() {}

  async register(username: string, password: string) {
    return {
      message: `User ${username} registered successfully`,
      statusCode: 201,
    };
  }
}
