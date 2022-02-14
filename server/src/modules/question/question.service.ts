import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QuestionDifficultyLevel, QuestionModel } from './question.model';

import type { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private readonly questionRepository: Repository<QuestionModel>
  ) { }

  async list() {
    return this.questionRepository.findAndCount();
  }
}
