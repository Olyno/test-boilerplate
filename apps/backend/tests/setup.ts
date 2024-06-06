import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setupDatabase } from '../src/database';
import { migrate } from '../src/database/migrate';

const database_url = join(process.cwd(), 'apps', 'backend', 'test.db');

export default async (globalConfig, projectConfig) => {
  if (!existsSync(database_url)) {
    writeFileSync(database_url, '');
  }
  await migrate();
  await setupDatabase();
};
