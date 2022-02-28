import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthLevel, UserModel } from './user.model';
import { hashWithSalt } from '@/utils';

import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>
  ) { }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async register(params: Api.User.RegisterRequest) {
    return this.usersRepository.save(new UserModel({
      email: params.email,
      password: await hashWithSalt(params.password),
      nickname: params.email.split('@')[0],
      permission: AuthLevel.USER
    }));
  }
}
