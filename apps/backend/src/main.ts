import { app } from './app';
import { setupDatabase } from './database';
import { env } from './env';

const host = env.HOST;
const port = env.PORT;

setupDatabase();

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
