import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PATHS, isDatabaseExist } from '@/utils';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: PATHS.database,
    autoLoadEntities: true,
    synchronize: !isDatabaseExist,
    // retryAttempts: 1,
    // retryDelay: 1000,
    logging: true
  })],
})
export class DatabaseModule { }
