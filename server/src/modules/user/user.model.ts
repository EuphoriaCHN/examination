import { Entity, Column } from 'typeorm';

import { BaseModel } from '@/models/base.model';

@Entity()
export class UserModel extends BaseModel {
  /**
   * 用户账号，最长 32 字符
   */
  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  account: string;
}
