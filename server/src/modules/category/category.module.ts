import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel } from './category.model';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule { }
