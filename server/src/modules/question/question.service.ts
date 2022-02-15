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
    return this.questionRepository.findAndCount({
      order: {
        updateTime: 'DESC'
      }
    });
  }

  async create(params: Api.Question.CreateRequest) {
    await this.questionRepository.save(new QuestionModel(params));
  }

  async delete(params: Api.Question.DeleteRequest) {
    await this.questionRepository.delete({
      id: params.id
    })
  }
}
