import { app } from 'apps/backend/src/app';
import request from 'supertest';

describe('GET /action_types', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/action_types');
    expect(res.status).toBe(200);
  });
});
