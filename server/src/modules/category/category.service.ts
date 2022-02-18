import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

import { CategoryModel } from './category.model';

import type { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>
  ) { }

  async create(params: Api.Category.CreateRequest) {
    const parentId = params.parentId;

    let parent: null | CategoryModel = null;
    if (parentId !== 0) {
      parent = await this.categoryRepository.findOneOrFail({ id: parentId });
    }

    const newRecord = new CategoryModel(omit(params, ['parentId']));
    newRecord.children = [];
    newRecord.parent = parent;

    return this.categoryRepository.save(newRecord);
  }
}
