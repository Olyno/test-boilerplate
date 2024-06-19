import { createClient } from '@libsql/client';
import { asc, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { join } from 'path';
import { env } from '../env';
import { calculateCredits, takeUnique, takeUniqueOrThrow } from '../helpers';
import { migrate } from './migrate';
import {
  Action,
  ActionTypes,
  CronTypes,
  action_types,
  actions,
  crons,
} from './schema';

const database_url = join(
  process.cwd(),
  'apps',
  'backend',
  env.NODE_ENV === 'test' ? 'test.db' : env.DATABASE_FILE
);

const sqlite = createClient({ url: `file:${database_url}`, authToken: '' });

const DEFAULT_ACTIONS: ActionTypes[] = [
  'EMAIL_NOTIFICATION',
  'DATA_BACKUP',
  'REPORT_GENERATION',
];

const DEFAULT_CRONS: CronTypes[] = ['CREDITS_RESET'];

export const database = drizzle(sqlite);

/**
 * Setup the database with the required tables.
 */
export async function setupDatabase() {
  await migrate();
  const types = await database.select().from(action_types);
  const cronsList = await database.select().from(crons);
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

  if (cronsList.length === 0) {
    const default_crons = DEFAULT_CRONS.map((type) => {
      return {
        type,
        time: 0,
      };
    });
    await database.insert(crons).values([...default_crons]);
  }
}

export async function getActions() {
  return database.select().from(actions);
}

export async function getActionTypes() {
  return database.select().from(action_types);
}

export async function getCron(type: CronTypes) {
  return database
    .select()
    .from(crons)
    .where(eq(crons.type, type))
    .then(takeUniqueOrThrow);
}

export async function addAction(type: ActionTypes) {
  const actionType = await database
    .select({
      id: action_types.id,
      credits: action_types.credits,
    })
    .from(action_types)
    .where(eq(action_types.type, type))
    .then(takeUniqueOrThrow);

  if (actionType.credits <= 0) {
    throw new Error('[ database ] No credits available');
  }

  return database
    .insert(actions)
    .values({
      type_id: actionType.id,
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

export async function resetCredits() {
  const actionTypes = await getActionTypes();

  await resetCronTime('CREDITS_RESET');

  return Promise.all(
    actionTypes.map((type) => {
      return database
        .update(action_types)
        .set({
          credits: calculateCredits(),
        })
        .where(eq(action_types.id, type.id))
        .execute();
    })
  );
}

export async function resetCronTime(type: CronTypes) {
  return database
    .update(crons)
    .set({
      time: 0,
    })
    .where(eq(crons.type, type))
    .execute();
}

export async function incrementTime(type: CronTypes) {
  return database
    .update(crons)
    .set({
      time: sql`${crons.time} + 1`,
    })
    .where(eq(crons.type, type))
    .execute();
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

  const credits = actionType.credits;

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
