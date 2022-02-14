import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionModel } from './question.model';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule { }
