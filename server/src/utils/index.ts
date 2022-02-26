import { join } from 'path';
import { existsSync } from 'fs';
import { genSaltSync, hash, compare } from 'bcrypt';

export const ROOT = (...args: string[]) => join(__dirname, '../../', ...args);
export const SRC = (...args: string[]) => ROOT('src', ...args);

export const PATHS = {
  database: ROOT('data', 'store.sql'),
};

export const isDatabaseExist = existsSync(PATHS.database);

export async function hashWithSalt(val: string): Promise<string> {
  return hash(val, genSaltSync());
}

export async function compareSaltedHash(target: string, hash: string) {
  return compare(target, hash);
}
