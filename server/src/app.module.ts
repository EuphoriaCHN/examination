import { Module } from '@nestjs/common';

// 公共模块
import { DatabaseModule } from '@/common/database/database.module';

// 业务模块
import { UserModule } from '@/modules/user/user.module';
import { CategoryModule } from '@/modules/category/category.module';
import { TagModule } from '@/modules/tag/tag.module';
import { QuestionModule } from '@/modules/question/question.module';
import { TemplateModule } from '@/modules/template/template.module';

// 鉴权
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    TagModule,
    QuestionModule,
    TemplateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
