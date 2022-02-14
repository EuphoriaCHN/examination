import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TemplateModel } from './template.model';

import type { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateModel)
    private templateRepository: Repository<TemplateModel>
  ) { }
}
