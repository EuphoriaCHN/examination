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
}
