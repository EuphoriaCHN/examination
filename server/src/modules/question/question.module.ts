import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionModel } from './question.model';

import { CategoryModel } from '@/modules/category/category.model';
import { TagModel } from '@/modules/tag/tag.model';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel, CategoryModel, TagModel])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule { }
