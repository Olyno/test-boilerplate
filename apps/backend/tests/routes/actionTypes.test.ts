import request from 'supertest';
import { app } from '../../src/main';
import '../setup';

describe('GET /action_types', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/action_types');
    expect(res.status).toBe(200);
  });
});
