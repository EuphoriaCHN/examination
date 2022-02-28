import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthLevel, UserModel } from './user.model';
import { UtilsService } from '@/utils/utils.service';

import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
    private utilsService: UtilsService
  ) { }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async register(params: Api.User.RegisterRequest) {
    return this.usersRepository.save(new UserModel({
      email: params.email,
      password: await this.utilsService.hashWithSalt(params.password),
      nickname: params.email.split('@')[0],
      permission: AuthLevel.USER
    }));
  }
}
