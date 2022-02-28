import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

import { UtilsModule } from '@/utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    UtilsModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }