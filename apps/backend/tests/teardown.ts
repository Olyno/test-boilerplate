import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';

const database_url = join(process.cwd(), 'apps', 'backend', 'test.db');

export default async (globalConfig, projectConfig) => {
  // TODO: Remove the test database if it exists on Windows.
  // Currently, it throws "EBUSY: resource busy or locked"
  if (process.platform !== 'win32' && existsSync(database_url)) {
    console.log('[ test ] Removing test database');
    await unlink(database_url);
  }
};
