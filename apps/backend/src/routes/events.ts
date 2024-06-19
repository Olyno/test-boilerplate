import { EventEmitter } from 'events';
import express from 'express';

const router = express.Router();
const eventEmitter = new EventEmitter();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const onAction = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  eventEmitter.on('action', onAction);
  eventEmitter.on('action_types', onAction);

  req.on('close', () => {
    eventEmitter.removeListener('action', onAction);
  });
});

export { eventEmitter, router as eventRoutes };
