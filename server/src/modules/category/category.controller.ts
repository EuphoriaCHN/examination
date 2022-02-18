import { Body, Controller, Post, UseInterceptors, UsePipes } from '@nestjs/common';
import Joi from 'joi';

import { CategoryService } from './category.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';
import { RecordExistInterceptor } from '@/interceptors/recordExist.interceptor';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('/create')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Category.CreateRequest>({
    name: Joi.string().required().max(32),
    description: Joi.string().optional().allow('').max(128),
    parentId: Joi.number().required().integer().min(0)
  }))
  async create(@Body() body: Api.Category.CreateRequest) {
    await this.categoryService.create(body);
  }
}
