import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

import { CategoryModel } from './category.model';

import { Repository, getManager } from 'typeorm';

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

  async list(params: Api.Category.ListRequest) {
    return getManager().getTreeRepository(CategoryModel).findTrees();
  }

  async update(params: Api.Category.UpdateRequest) {
    const record = await this.categoryRepository.findOneOrFail({ id: params.id });

    !!params.description && (record.description = params.description);
    !!params.name && (record.description = params.name);

    await this.categoryRepository.save(record);
  }

  async delete(params: Api.Category.DeleteRequest) {
    const record = await this.categoryRepository.findOne({ id: params.id });

    if (Array.isArray(record.children) && !!record.children.length) {
      throw new BadRequestException('Cascading prohibited');
    }

    await this.categoryRepository.remove(record);
  }
}
