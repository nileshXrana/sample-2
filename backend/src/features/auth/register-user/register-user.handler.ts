import { Injectable } from '@nestjs/common';
import { RegisterUserValidator } from './register-user.validator';
import { CreateUserHandler } from 'src/features/users/create-user/create-user.handler';

@Injectable()
export class RegisterUserHandler {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  async execute(registerUser: RegisterUserValidator) {
    return await this.createUserHandler.execute(registerUser);
  }
}
