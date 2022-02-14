import { Controller, Get, UseInterceptors, Query, UsePipes } from '@nestjs/common';

import { PaginationResponseInterceptor } from '@/interceptors/paginationResponse.interceptor';

import { QuestionService } from './question.service';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get('/list')
  @UseInterceptors(new PaginationResponseInterceptor())
  async list(@Query() query: Api.Question.ListRequest) {
    return this.questionService.list();
  }
}
