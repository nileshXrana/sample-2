import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from './create-user.handler';
import { User } from 'src/infrastructure/database/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserHandler],
  exports: [CreateUserHandler],
})
export class CreateUserModule {}
