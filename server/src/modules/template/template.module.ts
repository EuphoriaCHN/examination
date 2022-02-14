import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateModel } from './template.model';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateModel])],
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule { }
