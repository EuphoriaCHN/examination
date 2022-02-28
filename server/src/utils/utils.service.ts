import { Injectable } from '@nestjs/common';

import { genSaltSync, hash, compare } from 'bcrypt';

@Injectable()
export class UtilsService {
  constructor() { }

  async hashWithSalt(val: string) {
    return hash(val, genSaltSync());
  }

  async compareSaltedHash(target: string, hash: string) {
    return compare(target, hash);
  }
}