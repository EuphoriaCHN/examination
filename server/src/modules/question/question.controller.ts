import {
  Controller,
  Get,
  UseInterceptors,
  Query,
  Post,
  Body,
  UsePipes,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import Joi from 'joi';

import { PaginationResponseInterceptor } from '@/interceptors/pagination-response.interceptor';
import { RecordExistInterceptor } from '@/interceptors/record-exist.interceptor';

import { QuestionService } from './question.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/random')
  async random(@Query() param: Api.Question.RandomRequest) {
    return this.questionService.random(param);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/detail')
  @UseInterceptors(RecordExistInterceptor)
  async detail(@Query('id', ParseIntPipe) id: number) {
    return this.questionService.detail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  @UseInterceptors(PaginationResponseInterceptor)
  async list(@Query() query: Api.Question.ListRequest) {
    return this.questionService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Question.CreateRequest>({
    title: Joi.string().required().max(128),
    content: Joi.string().required(),
    comment: Joi.string().optional().allow(''),
    answer: Joi.string().optional().allow(''),
    level: Joi.number().integer().optional().min(0).max(4),
    categories: Joi.array().items(Joi.number().integer().min(0).strict()).optional(),
    tags: Joi.array().items(Joi.number().integer().min(0).strict()).optional(),
  }))
  async create(@Body() body: Api.Question.CreateRequest) {
    return this.questionService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Question.DeleteRequest>({
    id: Joi.number().integer().min(0).required()
  }))
  async delete(@Body() body: Api.Question.DeleteRequest) {
    await this.questionService.delete(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @UseInterceptors(RecordExistInterceptor)
  @UsePipes(new JoiValidatorPipe<Api.Question.UpdateRequest>({
    id: Joi.number().integer().min(0).required(),
    title: Joi.string().optional().allow('').max(128),
    content: Joi.string().optional().allow(''),
    comment: Joi.string().optional().allow(''),
    answer: Joi.string().optional().allow(''),
    level: Joi.number().integer().optional().min(0).max(4),
    categories: Joi.array().items(Joi.number().integer().min(0).strict()).optional(),
    tags: Joi.array().items(Joi.number().integer().min(0).strict()).optional(),
  }))
  async update(@Body() body: Api.Question.UpdateRequest) {
    await this.questionService.update(body);
  }
}
