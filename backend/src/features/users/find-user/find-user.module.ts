import { Module } from '@nestjs/common';
import { FindUserHandler } from './find-user.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FindUserHandler],
  exports: [FindUserHandler],
})
export class FindUserModule {}
