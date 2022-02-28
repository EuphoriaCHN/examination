import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';

import { UserService } from '@/modules/user/user.service';
import { AuthService } from './auth.service';

import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: JwtUser) {
    if (!payload.email || !payload.id) {
      throw new UnauthorizedException();
    }

    // 目前没有接入 Redis，先丢给前端做缓存
    const newToken = await this.authService.signJWT(payload);
    req.res?.setHeader('authorization', newToken);

    return payload;
  }
}