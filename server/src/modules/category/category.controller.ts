import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import Joi from 'joi';

import { CategoryService } from './category.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';
import { RecordExistInterceptor } from '@/interceptors/record-exist.interceptor';

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
    return this.categoryService.create(body);
  }

  @Get('/list')
  async list(@Query() query: Api.Category.ListRequest) {
    return this.categoryService.list(query);
  }

  @Put('/update')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Category.UpdateRequest>({
    name: Joi.string().optional().allow('').max(32),
    description: Joi.string().optional().allow('').max(128),
    id: Joi.number().required().integer().min(0)
  }))
  async update(@Body() body: Api.Category.UpdateRequest) {
    return this.categoryService.update(body);
  }

  @Delete('/delete')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Category.DeleteRequest>({
    id: Joi.number().integer().min(0).required()
  }))
  async delete(@Body() body: Api.Category.DeleteRequest) {
    await this.categoryService.delete(body);
  }
}
