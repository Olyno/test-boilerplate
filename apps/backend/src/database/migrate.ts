import { migrate } from 'drizzle-orm/libsql/migrator';
import { join } from 'path';
import { database } from '.';

const migrationsFolder = join(
  process.cwd(),
  'apps',
  'backend',
  'src',
  'database',
  'migrations'
);

async function main() {
  console.log('[ migration ] Running migrations');

  await migrate(database, { migrationsFolder: migrationsFolder });

  console.log('[ migration ] Migrated successfully');
}

export { main as migrate };
