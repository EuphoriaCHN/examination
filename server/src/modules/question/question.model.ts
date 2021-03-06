import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { BaseModel } from '@/models/base.model';
import { CategoryModel } from '@/modules/category/category.model';
import { TagModel } from '@/modules/tag/tag.model';

/**
 * 题目难度
 */
export const enum QuestionDifficultyLevel {
  TEST = 0,
  EASY = 1,
  NORMAL = 2,
  HARD = 3,
  HELL = 4
};

/**
 * 题目类型
 */
export const enum QuestionType {
  // 选择
  Choice = 0,
  MultiChoice = 1,
  // 主观题
  Subjective = 2,
  // 编程
  Programming = 3
}

@Entity()
export class QuestionModel extends BaseModel {
  constructor(opts: Partial<QuestionModel> = {}) {
    super();

    for (let key in opts) {
      this[key] = opts[key];
    }
  }

  /**
   * 题目名称，最长 128 个字符
   */
  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  /**
   * 题面（Markdown 格式）
   */
  @Column({ type: 'text', default: '' })
  content: string;

  /**
   * 题目注释（Markdown 格式）
   */
  @Column({ type: 'text', default: '' })
  comment: string;

  /**
   * 题目答案（Markdown 格式）
   */
  @Column({ type: 'text', default: '' })
  answer: string;

  /**
   * 题目所属分类集合
   */
  @ManyToMany(() => CategoryModel)
  @JoinTable()
  categories?: CategoryModel[];

  /**
   * 题目所属标签集合
   */
  @ManyToMany(() => TagModel)
  @JoinTable()
  tags?: TagModel[];

  /**
   * 题目难度，0 - 4
   */
  @Column({
    type: 'int',
    enum: [
      QuestionDifficultyLevel.TEST,
      QuestionDifficultyLevel.EASY,
      QuestionDifficultyLevel.NORMAL,
      QuestionDifficultyLevel.HARD,
      QuestionDifficultyLevel.HELL
    ],
    transformer: {
      to: (val: number) => val.toString(),
      from: (val: string) => parseInt(val)
    }
  })
  level: QuestionDifficultyLevel;

  /**
   * 题目热度，指被采用了多少次
   */
  @Column({
    type: 'int',
    unsigned: true,
    default: 0
  })
  hotCount: number;

  /**
   * 题目类型
   */
  @Column({
    type: 'int',
    enum: [
      QuestionType.Choice,
      QuestionType.MultiChoice,
      QuestionType.Subjective,
      QuestionType.Programming
    ],
    transformer: {
      to: (val: number) => val.toString(),
      from: (val: string) => parseInt(val)
    }
  })
  questionType: QuestionType;
}