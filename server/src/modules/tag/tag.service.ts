import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TagModel } from './tag.model';

import type { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagModel)
    private tagRepository: Repository<TagModel>
  ) { }

  async create(params: Api.Tag.CreateRequest) {
    const record = new TagModel(params);

    return this.tagRepository.save(record);
  }

  async update(params: Api.Tag.UpdateRequest) {
    const record = await this.tagRepository.findOneOrFail({ id: params.id });

    !!params.description && (record.description = params.description);
    !!params.name && (record.name = params.name);

    await this.tagRepository.save(record);
  }

  async list(params: Api.Tag.ListRequest) {
    return this.tagRepository.findAndCount();
  }

  async delete(params: Api.Tag.DeleteRequest) {
    const record = await this.tagRepository.findOneOrFail({ id: params.id });

    await this.tagRepository.remove(record);
  }
}
