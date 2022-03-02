import { BadRequestException, Injectable } from '@nestjs/common';
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
    const nickname = params.email.split('@')[0] || '';

    return this.usersRepository.save(new UserModel({
      email: params.email,
      password: await this.utilsService.hashWithSalt(params.password),
      nickname: nickname.slice(0, 32),
      permission: AuthLevel.USER
    }));
  }

  async update(userId: number, body: Api.User.UpdateRequest) {
    const record = await this.usersRepository.findOneOrFail({ id: userId });

    return this.usersRepository.update(record, { nickname: body.nickname });
  }

  async updatePassword(userId: number, body: Api.User.UpdatePasswordRequest) {
    const record = await this.usersRepository.findOneOrFail({ id: userId });

    const match = await this.utilsService.compareSaltedHash(body.password, record.password);
    if (!match) {
      throw new BadRequestException('Password not match');
    }

    return this.usersRepository.update(record, {
      password: await this.utilsService.hashWithSalt(body.newPassword)
    });
  }
}
