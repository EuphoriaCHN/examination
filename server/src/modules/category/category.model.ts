import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

import { BaseModel } from '@/models/base.model';

@Entity()
@Tree('closure-table')
export class CategoryModel extends BaseModel {
  constructor(opts: Partial<CategoryModel> = {}) {
    super();

    for (let key in opts) {
      this[key] = opts[key];
    }
  }

  /**
   * 分类名称，最长 32 字符
   */
  @Column({
    type: 'varchar',
    length: 32,
  })
  name: string;

  /**
   * 分类表述，最长 128 字符
   */
  @Column({
    type: 'varchar',
    length: '128',
    default: ''
  })
  description: string;

  /**
   * 子分类
   */
  @TreeChildren({ cascade: ['remove'] })
  children: CategoryModel[];

  /**
   * 父分类
   */
  @TreeParent({ onDelete: 'CASCADE' })
  parent: CategoryModel;
}
