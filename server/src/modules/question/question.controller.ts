import { Controller, Get, UseInterceptors, Query, Post, Body, UsePipes, Delete } from '@nestjs/common';
import Joi from 'joi';

import { PaginationResponseInterceptor } from '@/interceptors/paginationResponse.interceptor';

import { QuestionService } from './question.service';
import { JoiValidatorPipe } from '@/pipes/validator.pipe';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get('/list')
  @UseInterceptors(new PaginationResponseInterceptor())
  async list(@Query() query: Api.Question.ListRequest) {
    return this.questionService.list();
  }

  @Post('/create')
  @UsePipes(new JoiValidatorPipe<Api.Question.CreateRequest>({
    title: Joi.string().required().max(128),
    content: Joi.string().required(),
    comment: Joi.string().optional().allow(''),
    answer: Joi.string().optional().allow(''),
    level: Joi.number().integer().min(0).max(4)
  }))
  async create(@Body() body: Api.Question.CreateRequest) {
    await this.questionService.create(body);
  }

  @Delete('/delete')
  @UsePipes(new JoiValidatorPipe<Api.Question.DeleteRequest>({
    id: Joi.number().integer().min(0).required()
  }))
  async delete(@Body() body: Api.Question.DeleteRequest) {
    await this.questionService.delete(body);
  }
}
