import { env } from 'apps/backend/src/env';
import request from 'supertest';
import { database } from '../../src/database';
import { actions } from '../../src/database/schema';
import { app } from '../../src/main';
import '../setup';

describe('GET /actions', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/actions');
    expect(res.status).toBe(200);
  });
});

describe('POST /actions', () => {
  it('should create a new action', async () => {
    const res = await request(app)
      .post('/actions')
      .send({ type: 'EMAIL_NOTIFICATION' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Action added successfully');
  });

  it('should return 400 if type is not provided', async () => {
    const res = await request(app).post('/actions').send({});
    expect(res.status).toBe(400);
    expect(res.text).toBe('Action type is required.');
  });
});

describe('Action Processing', () => {
  it(
    'should remove actions after processing',
    async () => {
      await request(app).post('/actions').send({ type: 'EMAIL_NOTIFICATION' });
      await new Promise((resolve) =>
        setTimeout(resolve, env.EXECUTION_INTERVAL + 1000)
      );
      const remainingActions = await database.select().from(actions);
      expect(remainingActions.length).toBe(0);
    },
    env.EXECUTION_INTERVAL + 2000
  );
});
