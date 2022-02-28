import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';

import { UserService } from '@/modules/user/user.service';
import { compareSaltedHash } from '@/utils';

import type { UserModel } from '@/modules/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<UserModel | null> {
    const record = await this.userService.getUserByEmail(email);

    if (!!record && compareSaltedHash(password, record.password)) {
      return record;
    }

    return null;
  }

  async login(user: UserModel) {
    return this.jwtService.sign(pick(user, ['id', 'email', 'permission']));
  }
}