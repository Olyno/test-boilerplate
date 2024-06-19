import { createClient } from '@libsql/client';
import { Action, action_types, actions } from '@test-boilerplate/shared-types';
import { asc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { join } from 'path';
import { env } from '../env';
import { calculateCredits, takeUnique, takeUniqueOrThrow } from '../helpers';
import { migrate } from './migrate';

const database_url = join(
  process.cwd(),
  'apps',
  'backend',
  env.NODE_ENV === 'test' ? 'test.db' : env.DATABASE_FILE
);

const sqlite = createClient({ url: `file:${database_url}`, authToken: '' });

const DEFAULT_ACTIONS: string[] = [
  'EMAIL_NOTIFICATION',
  'DATA_BACKUP',
  'REPORT_GENERATION',
];

export const database = drizzle(sqlite);

/**
 * Setup the database with the required tables.
 */
export async function setupDatabase() {
  await migrate();
  const types = await database.select().from(action_types);
  if (types.length === 0) {
    const default_actions = DEFAULT_ACTIONS.map((type) => {
      const credits = calculateCredits();
      return {
        type,
        credits,
      };
    });
    await database.insert(action_types).values([...default_actions]);
  }
}

export async function getActions() {
  return database.select().from(actions);
}

export async function getActionTypes() {
  return database.select().from(action_types);
}

export async function addAction(type: string) {
  const type_id = await database
    .select({
      id: action_types.id,
    })
    .from(action_types)
    .where(eq(action_types.type, type))
    .then(takeUniqueOrThrow);

  return database
    .insert(actions)
    .values({
      type_id: type_id.id,
    })
    .returning()
    .then(takeUniqueOrThrow);
}

export async function getNextAction() {
  return database
    .select()
    .from(actions)
    .orderBy(asc(actions.added_at))
    .then(takeUnique);
}

export async function executeAction(action: Action): Promise<void> {
  const now = new Date();

  const actionType = await database
    .select()
    .from(action_types)
    .where(eq(action_types.id, action.type_id))
    .then(takeUniqueOrThrow);

  if (!actionType) {
    throw new Error('[ database ] Invalid action type');
  }

  let credits = actionType.credits;
  const duration = 10 * 60 * 1000; // 10 minutes

  if (
    !actionType.last_calculated ||
    new Date(actionType.last_calculated).getTime() + duration < now.getTime()
  ) {
    credits = calculateCredits();
    await database
      .update(action_types)
      .set({
        credits: credits,
      })
      .where(eq(action_types.id, actionType.id))
      .execute();
  }

  if (credits > 0) {
    await database
      .update(action_types)
      .set({
        credits: actionType.credits - 1,
      })
      .where(eq(action_types.id, actionType.id))
      .execute();

    await database.delete(actions).where(eq(actions.id, action.id)).execute();

    console.log(
      `[ database ] Executed action ${actionType.type} with ID ${action.id}`
    );
  }
}
