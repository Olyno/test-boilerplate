import { envsafe, num, port, str } from 'envsafe';

export const env = envsafe({
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production'],
  }),
  HOST: str({
    devDefault: 'localhost',
    desc: 'The host the app is running on',
    example: 'localhost',
  }),
  PORT: port({
    devDefault: 3000,
    desc: 'The port the app is running on',
    example: 3000,
  }),
  MAX_CREDITS: num({
    devDefault: 100,
    desc: 'The maximum credits a user can have',
    example: 100,
  }),
  CREDIT_RECALC_INTERVAL: num({
    devDefault: 10 * 60 * 1000, // 10 minutes
    desc: 'The interval in milliseconds to recalculate credits',
    example: 600000,
  }),
  EXECUTION_INTERVAL: num({
    devDefault: 15 * 1000, // 15 seconds
    desc: 'The interval in milliseconds to execute actions',
    example: 15000,
  }),
  FRONTEND_URL: str({
    devDefault: 'http://localhost:4200',
    desc: 'The frontend url to allow CORS',
  }),
});
