import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserModel } from './user.model';

import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>
  ) { }
}
