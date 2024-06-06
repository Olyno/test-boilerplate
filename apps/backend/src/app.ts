import cors from 'cors';
import express from 'express';
import { env } from './env';
import {
  actionRoutes,
  actionTypeRoutes,
  eventRoutes,
  rootRoutes,
} from './routes';

const frontendUrl = env.FRONTEND_URL;

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

export { app };
