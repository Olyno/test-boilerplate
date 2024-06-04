import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { join } from 'path';

const database_url = join(process.cwd(), 'apps', 'backend', 'local.db');

async function main() {
  const db = drizzle(
    createClient({ url: `file:${database_url}`, authToken: '' })
  );

  console.log('[ migration ] Running migrations');

  await migrate(db, { migrationsFolder: 'drizzle' });

  console.log('[ migration ] Migrated successfully');

  process.exit(0);
}

main().catch((e) => {
  console.error('Migration failed');
  console.error(e);
  process.exit(1);
});
