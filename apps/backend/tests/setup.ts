import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { setupDatabase } from '../src/database';
import { server } from '../src/main';

const testDatabasePath = join(process.cwd(), 'apps', 'backend', 'test.db');

beforeAll(async () => {
  if (existsSync(testDatabasePath)) {
    unlinkSync(testDatabasePath);
  } else {
    writeFileSync(testDatabasePath, '');
  }

  await setupDatabase();
});

afterAll(async () => {
  server.close();
});
