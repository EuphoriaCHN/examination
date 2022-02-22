import { join } from 'path';

export const ROOT = (...args: string[]) => join(__dirname, '../../', ...args);
export const SRC = (...args: string[]) => ROOT('src', ...args);

export const PATHS = {
  database: ROOT('data', 'store.sql'),
};
