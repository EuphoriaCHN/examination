
import { Controller, Post, UseGuards, Get, UseInterceptors } from '@nestjs/common';

import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

import { User } from '@/decorators/user.decorator';
import { SetResHeaderInterceptor } from '@/interceptors/set-res-header.interceptor';
import type { UserModel } from '@/modules/user/user.model';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(new SetResHeaderInterceptor({ authorization: true }))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: UserModel) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@User() user: JWTUser) {
    return user;
  }
}
