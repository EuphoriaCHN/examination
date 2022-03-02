import { Controller, Get, Query, Post, Body, Put, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { User } from '@/decorators/user.decorator';
import { RecordExistInterceptor } from '@/interceptors/record-exist.interceptor';

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

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RecordExistInterceptor)
  async update(@User() user: JwtUser, @Body() body: Api.User.UpdateRequest) {
    await this.userService.update(user.id, body);
  }

  @Put('/updatePassword')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RecordExistInterceptor)
  async updatePassword(@User() user: JwtUser, @Body() body: Api.User.UpdatePasswordRequest) {
    await this.userService.updatePassword(user.id, body);
  }
}
