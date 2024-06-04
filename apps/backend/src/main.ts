import cors from 'cors';
import express from 'express';
import { setupDatabase } from './database';
import { env } from './env';
import {
  actionRoutes,
  actionTypeRoutes,
  eventRoutes,
  rootRoutes,
} from './routes';

const host = env.HOST;
const port = env.PORT;
const frontendUrl = env.FRONTEND_URL;

setupDatabase();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: frontendUrl,
    optionsSuccessStatus: 200,
  })
);

app.use('/', rootRoutes);
app.use('/action_types', actionTypeRoutes);
app.use('/actions', actionRoutes);
app.use('/events', eventRoutes);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
