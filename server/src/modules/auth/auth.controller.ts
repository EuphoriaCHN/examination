
import { Controller, Post, UseGuards, Get, UseInterceptors } from '@nestjs/common';
import { omit } from 'lodash';

import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '@/modules/user/user.service';

import { User } from '@/decorators/user.decorator';
import { SetResHeaderInterceptor } from '@/interceptors/set-res-header.interceptor';
import type { UserModel } from '@/modules/user/user.model';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UseInterceptors(SetResHeaderInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: UserModel) {
    return {
      token: {
        authorization: await this.authService.signJWT(user),
      },
      data: omit(user, 'password')
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@User() user: JwtUser) {
    return omit(
      await this.userService.getUserByEmail(user.email),
      'password'
    );
  }
}
