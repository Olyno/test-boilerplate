import { app } from 'apps/backend/src/app';
import {
  database,
  executeAction,
  getNextAction,
} from 'apps/backend/src/database';
import { action_types, actions } from 'apps/backend/src/database/schema';
import { takeUniqueOrThrow } from 'apps/backend/src/helpers';
import { eq } from 'drizzle-orm';
import request from 'supertest';

async function processAction() {
  const nextAction = await getNextAction();
  if (!nextAction) return;
  await executeAction(nextAction);
}

describe('GET /actions', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/actions');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /actions', () => {
  afterEach(async () => {
    await database.delete(actions).execute();
  });

  it('should create a new action', async () => {
    const res = await request(app)
      .post('/actions')
      .send({ type: 'EMAIL_NOTIFICATION' });
    const actionsQueue = await database.select().from(actions);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Action added successfully');
    expect(actionsQueue.length).toBe(1);
  });

  it('should return 400 if type is not provided', async () => {
    const res = await request(app).post('/actions').send({});
    const actionsQueue = await database.select().from(actions);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Action type is required.');
    expect(actionsQueue.length).toBe(0);
  });
});

describe('Action Processing', () => {
  afterEach(async () => {
    await database.delete(actions).execute();
  });

  it('should remove actions after processing', async () => {
    await request(app).post('/actions').send({ type: 'EMAIL_NOTIFICATION' });
    const actionTypeBefore = await database
      .select()
      .from(action_types)
      .where(eq(action_types.type, 'EMAIL_NOTIFICATION'))
      .then(takeUniqueOrThrow);
    expect(actionTypeBefore).toBeDefined();
    await processAction();
    const actionTypeAfter = await database
      .select()
      .from(action_types)
      .where(eq(action_types.type, 'EMAIL_NOTIFICATION'))
      .then(takeUniqueOrThrow);
    expect(actionTypeAfter.credits).toBe(actionTypeBefore.credits - 1);
  });
});
