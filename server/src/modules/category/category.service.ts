import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryModel } from './category.model';

import type { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>
  ) { }
}
