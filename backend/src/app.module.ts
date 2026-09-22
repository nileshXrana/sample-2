import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './infrastructure/database/data-source';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { AuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         {
//           path: '',
//           method: RequestMethod.GET,
//         },
//         {
//           path: 'auth/login',
//           method: RequestMethod.POST,
//         },
//         {
//           path: 'auth/signup',
//           method: RequestMethod.POST,
//         },
//       )
//       .forRoutes('*');
//   }
// }
