import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '@/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: UtilsModule.paths.database,
    autoLoadEntities: true,
    synchronize: !UtilsModule.isDatabaseExist(),
    // retryAttempts: 1,
    // retryDelay: 1000,
    logging: true
  })],
})
export class DatabaseModule { }
