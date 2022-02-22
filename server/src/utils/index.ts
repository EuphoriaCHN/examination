import { join } from 'path';
import { existsSync } from 'fs';

export const ROOT = (...args: string[]) => join(__dirname, '../../', ...args);
export const SRC = (...args: string[]) => ROOT('src', ...args);

export const PATHS = {
  database: ROOT('data', 'store.sql'),
};

export const isDatabaseExist = existsSync(PATHS.database);