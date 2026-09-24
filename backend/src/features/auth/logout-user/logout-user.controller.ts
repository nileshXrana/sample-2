import { Controller, Get } from '@nestjs/common';
import { LogoutUserHandler } from './logout-user.handler';

@Controller('auth')
export class LogoutUserController {
  constructor(private readonly logoutUserHandler: LogoutUserHandler) {}

  @Get('logout')
  logout() {
    return this.logoutUserHandler.execute();
  }
}
