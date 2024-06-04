import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const action_types = sqliteTable('action_types', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  type: text('type').notNull(),
  credits: integer('credits').notNull(),
  last_calculated: text('last_calculated')
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export const actions = sqliteTable('actions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  type_id: integer('type_id')
    .notNull()
    .references(() => action_types.id),
  added_at: text('added_at')
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export type ActionType = typeof action_types.$inferSelect;

export type Action = typeof actions.$inferSelect;
export type NewAction = typeof actions.$inferInsert;

export type ActionTypes =
  | 'EMAIL_NOTIFICATION'
  | 'DATA_BACKUP'
  | 'REPORT_GENERATION';
