import { Body, Controller, Post } from '@nestjs/common';

import { ExecuteService } from './execute.service';

@Controller('/execute')
export class ExecuteController {
  constructor(private readonly executeService: ExecuteService) { }

  @Post('/code')
  async execCode(@Body() body: Api.Execute.ExecuteCodeRequest) {
    switch (body.lang) {
      case 'JavaScript V8':
        await this.executeService.runJavascriptV8(body.code);
    }
  }
}