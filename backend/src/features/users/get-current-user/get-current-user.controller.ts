import { Controller, Get, Req } from '@nestjs/common';
import { GetCurrentUserHandler } from './get-current-user.handler';
import { type AuthenticatedRequest } from 'src/infrastructure/interfaces/request.interface';

@Controller('users')
export class GetCurrentUserController {
  constructor(private readonly getCurrentUserHandler: GetCurrentUserHandler) {}

  @Get('me')
  getCurrentUser(@Req() req: AuthenticatedRequest) {
    return this.getCurrentUserHandler.execute(req.user.id);
  }
}
