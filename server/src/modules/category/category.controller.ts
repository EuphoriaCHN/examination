import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import Joi from 'joi';

import { CategoryService } from './category.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';
import { RecordExistInterceptor } from '@/interceptors/record-exist.interceptor';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: Api.Category.ListRequest) {
    return this.categoryService.list(query);
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Category.DeleteRequest>({
    id: Joi.number().integer().min(0).required()
  }))
  async delete(@Body() body: Api.Category.DeleteRequest) {
    await this.categoryService.delete(body);
  }
}
