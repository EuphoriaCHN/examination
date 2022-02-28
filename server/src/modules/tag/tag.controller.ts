import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UsePipes,
  Get,
  Query,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import Joi from 'joi';

import { TagService } from './tag.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';
import { RecordExistInterceptor } from '@/interceptors/record-exist.interceptor';
import { PaginationResponseInterceptor } from '@/interceptors/pagination-response.interceptor';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidatorPipe<Api.Tag.CreateRequest>({
    name: Joi.string().required().max(32),
    description: Joi.string().optional().allow('').max(128),
  }))
  async create(@Body() body: Api.Tag.CreateRequest) {
    await this.tagService.create(body);
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationResponseInterceptor)
  async list(@Query() query: Api.Category.ListRequest) {
    return this.tagService.list(query);
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
    await this.tagService.update(body);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Category.DeleteRequest>({
    id: Joi.number().integer().min(0).required()
  }))
  async delete(@Body() body: Api.Category.DeleteRequest) {
    await this.tagService.delete(body);
  }
}
