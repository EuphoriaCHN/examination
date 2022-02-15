import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

import { QuestionModel } from './question.model';

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

  async update(params: Api.Question.UpdateRequest) {
    await this.questionRepository.update({ id: params.id }, omit(params, ['id']));
  }
}
