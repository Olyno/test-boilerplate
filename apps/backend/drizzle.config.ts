import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./local.db',
  },
  out: './src/database/migrations',
  driver: 'turso',
  verbose: true,
  strict: true,
});
