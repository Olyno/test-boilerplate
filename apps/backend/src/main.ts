import { app } from './app';
import { setupDatabase } from './database';
import { env } from './env';
import { processAction } from './services/actions';

const host = env.HOST;
const port = env.PORT;

setupDatabase();

setInterval(processAction, env.EXECUTION_INTERVAL);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
