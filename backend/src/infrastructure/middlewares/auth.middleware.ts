import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Authentication failed');
    }

    try {
      // Verify the JWT using the secret configured in JwtModule
      const payload = await this.jwtService.verifyAsync(token);

      // Store the JWT payload on the request
      request['user'] = payload;

      // Continue to the next middleware/controller
      next();
    } catch {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
