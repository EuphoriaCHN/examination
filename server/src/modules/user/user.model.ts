import { Entity, Column } from 'typeorm';

import { BaseModel } from '@/models/base.model';

export const enum AuthLevel {
  ADMIN = 0,
  MANAGER = 1,
  USER = 2
};

@Entity()
export class UserModel extends BaseModel {
  constructor(opts: Partial<UserModel> = {}) {
    super();

    for (let key in opts) {
      this[key] = opts[key];
    }
  }

  /**
   * 用户邮箱，最长 128 字符
   */
  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  email: string;

  /**
   * 用户密码，最长 16 字符
   * 
   * DB 中存的 bcrypt 加盐加密，长度为 60 的字符串
   */
  @Column({
    type: 'varchar',
    length: 64,
  })
  password: string;

  /**
   * 用户昵称，最长 16 字符
   */
  @Column({
    type: 'varchar',
    length: 16,
    default: ''
  })
  nickname: string;

  /**
   * 用户等级
   */
  @Column({
    type: 'int',
    enum: [
      AuthLevel.ADMIN,
      AuthLevel.MANAGER,
      AuthLevel.USER
    ],
    transformer: {
      to: (val: number) => val.toString(),
      from: (val: string) => parseInt(val)
    },
  })
  permission: AuthLevel;
}
