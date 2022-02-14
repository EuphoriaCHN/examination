import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    transformer: {
      from: val => new Date(val).getTime(),
      to: val => val
    }
  })
  createTime: Date;

  @UpdateDateColumn({
    transformer: {
      from: val => new Date(val).getTime(),
      to: val => val
    }
  })
  updateTime: Date;
}
