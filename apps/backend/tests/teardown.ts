import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const database_url = join(process.cwd(), 'apps', 'backend', 'test.db');

export default async (globalConfig, projectConfig) => {
  if (existsSync(database_url)) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('[ test ] Removing test database');
    unlinkSync(database_url);
  }
};
