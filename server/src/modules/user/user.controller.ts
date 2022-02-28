import { Controller, Get, Query, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/checkEmailExist')
  async checkEmailExist(@Query('email') email: string) {
    const record = await this.userService.getUserByEmail(email);

    return !!record;
  }

  @Post('/register')
  async register(@Body() body: Api.User.RegisterRequest) {
    await this.userService.register(body);
  }
}
