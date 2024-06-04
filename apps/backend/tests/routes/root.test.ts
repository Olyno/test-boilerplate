import request from 'supertest';
import { app } from '../../src/main';
import '../setup';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello API');
  });
});
