import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body: Api.Auth.LoginRequest) {
    console.log('Controller login');
    return body;
  }
}