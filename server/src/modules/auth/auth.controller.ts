
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from '@/decorators/user';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@User() user) {
    return user;
  }
}
