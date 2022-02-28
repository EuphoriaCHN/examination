import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';

import { UserService } from '@/modules/user/user.service';
import { UtilsService } from '@/utils/utils.service';

import type { UserModel } from '@/modules/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService
  ) { }

  async validateUser(email: string, password: string): Promise<UserModel | null> {
    const record = await this.userService.getUserByEmail(email);

    if (!!record && this.utilsService.compareSaltedHash(password, record.password)) {
      return record;
    }

    return null;
  }

  async signJWT<T extends JwtUser>(user: T) {
    return this.jwtService.sign(pick(user, ['email', 'permission', 'id']));
  }
}