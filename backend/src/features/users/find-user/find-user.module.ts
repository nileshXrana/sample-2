import { Module } from '@nestjs/common';
import { FindUserHandler } from './find-user.handler';

@Module({
  providers: [FindUserHandler],
  exports: [FindUserHandler],
})
export class FindUserModule {}