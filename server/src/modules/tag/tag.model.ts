import { Entity, Column } from 'typeorm';

import { BaseModel } from '@/models/base.model';

@Entity()
export class TagModel extends BaseModel {
  /**
   * 标签名称，最长 32 字符
   */
  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  name: string;

  /**
   * 标签描述，最长 128 字符
   */
  @Column({
    type: 'varchar',
    length: 128,
    default: ''
  })
  description: string;
}