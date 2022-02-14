import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseModel } from '@/models/base.model';
import { QuestionModel } from '@/modules/question/question.model';

@Entity()
export class TemplateModel extends BaseModel {
  /**
   * 模板名称，最大 64 字符
   */
  @Column({
    type: 'varchar',
    length: 64
  })
  name: string;

  /**
   * 模板描述，最大 256 字符
   */
  @Column({
    type: 'varchar',
    length: 64
  })
  description: string;

  /**
   * 模板内问题列表
   */
  @ManyToMany(() => QuestionModel)
  @JoinTable()
  questions: QuestionModel[];
}
