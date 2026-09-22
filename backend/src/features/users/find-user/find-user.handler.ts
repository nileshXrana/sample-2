import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class FindUserHandler {
  private readonly users = [
    {
      userId: 1,
      email: 'john@example.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@example.com',
      password: 'guess',
    },
  ];

  async execute(email: string) {
    return this.users.find((user) => user.email === email);
  }
}