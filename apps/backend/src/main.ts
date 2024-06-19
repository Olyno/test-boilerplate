import { app } from './app';
import { setupDatabase } from './database';
import { env } from './env';
import { processAction } from './services/actions';

const host = env.HOST;
const port = env.PORT;

setupDatabase();

setInterval(async () => {
  try {
    await processAction();
  } catch (error) {
    console.log('[ cron ] Unexpected error while processing "action":', error);
  }
}, 1000);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
