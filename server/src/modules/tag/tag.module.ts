import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagModel } from './tag.model';

@Module({
  imports: [TypeOrmModule.forFeature([TagModel])],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule { }
