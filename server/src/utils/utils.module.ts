import { Module } from '@nestjs/common';

import { join } from 'path';
import { existsSync } from 'fs';

import { UtilsService } from './utils.service';

@Module({
  providers: [UtilsService],
  exports: [UtilsService]
})
export class UtilsModule {
  static root(...args: string[]) {
    return join(__dirname, '../../', ...args);
  }

  static src(...args: string[]) {
    return join(UtilsModule.root('src', ...args));
  }

  static readonly paths = {
    database: UtilsModule.root('data/store.sql')
  };

  static isDatabaseExist() {
    return existsSync(UtilsModule.paths.database);
  }
}