import { app } from './app';
import { setupDatabase } from './database';
import { env } from './env';
import { processAction } from './services/actions';

const host = env.HOST;
const port = env.PORT;

setupDatabase();

setInterval(processAction, 1000);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
