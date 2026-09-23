import { Module } from '@nestjs/common';
import { GetCurrentUserHandler } from './get-current-user.handler';
import { GetCurrentUserController } from './get-current-user.controller';
import { User } from 'src/domain/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetCurrentUserController],
  providers: [GetCurrentUserHandler],
})
export class GetCurrentUserModule {}
