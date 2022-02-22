import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

import { QuestionModel } from './question.model';
import { CategoryModel } from '@/modules/category/category.model';
import { TagModel } from '@/modules/tag/tag.model';

import type { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private readonly questionRepository: Repository<QuestionModel>,
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) { }

  async random(param: Api.Question.RandomRequest) {
    return this
      .questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.categories', 'category')
      .leftJoinAndSelect('question.tags', 'tag')
      .orderBy('RANDOM()')
      .getOne();
  }

  async detail(id: number) {
    return this.questionRepository.findOneOrFail({ id }, {
      relations: ['categories', 'tags']
    });
  }

  async list() {
    return this.questionRepository.findAndCount({
      order: {
        updateTime: 'DESC'
      },
      relations: ['categories', 'tags'],
      select: ['level', 'title', 'updateTime', 'id']
    });
  }

  async create(params: Api.Question.CreateRequest) {
    const record = new QuestionModel(omit(params, ['categories', 'tags']));

    if (Array.isArray(params.categories)) {
      record.categories = await this.categoryRepository.findByIds(params.categories);
    }

    if (Array.isArray(params.tags)) {
      record.tags = await this.tagRepository.findByIds(params.tags);
    }

    await this.questionRepository.save(record);
  }

  async delete(params: Api.Question.DeleteRequest) {
    const record = await this.questionRepository.findOneOrFail({ id: params.id });

    await this.questionRepository.remove(record);
  }

  async update(params: Api.Question.UpdateRequest) {
    const record = await this.questionRepository.findOneOrFail({ id: params.id });

    for (let key in omit(params, ['id', 'categories', 'tags'])) {
      record[key] = params[key];
    }

    if (Array.isArray(params.categories)) {
      record.categories = await this.categoryRepository.findByIds(params.categories);
    }

    if (Array.isArray(params.tags)) {
      record.tags = await this.tagRepository.findByIds(params.tags);
    }

    await this.questionRepository.save(record);
  }
}
