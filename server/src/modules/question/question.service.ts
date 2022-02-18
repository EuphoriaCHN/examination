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

  async detail(id: number) {
    return this.questionRepository.findOneOrFail({ id });
  }

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
    const record = await this.questionRepository.findOneOrFail({ id: params.id });

    await this.questionRepository.remove(record);
  }

  async update(params: Api.Question.UpdateRequest) {
    const record = await this.questionRepository.findOneOrFail({ id: params.id });

    for (let key in omit(params, ['id'])) {
      record[key] = params[key];
    }

    await this.questionRepository.save(record);
  }
}
