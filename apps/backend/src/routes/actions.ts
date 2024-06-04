import express from 'express';
import {
  addAction,
  executeAction,
  getActions,
  getNextAction,
} from '../database';
import { Action } from '../database/schema';
import { env } from '../env';
import { eventEmitter } from './events';

const router = express.Router();

let nextAction: Action | null = null;

router.get('/', async (req, res) => {
  const actions = await getActions();
  res.status(200).send(actions);
});

router.post('/', async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).send('Action type is required.');
  }

  const newAction = await addAction(type);
  eventEmitter.emit('action', { event: 'actionAdded', data: newAction });

  res.status(200).send({ message: 'Action added successfully' });
});

async function processAction() {
  const now = Date.now();
  if (!nextAction) nextAction = await getNextAction();
  if (!nextAction) return;

  const addedAt = Number(nextAction.added_at);

  if (now - addedAt >= env.EXECUTION_INTERVAL) {
    await executeAction(nextAction);
    eventEmitter.emit('action', {
      event: 'actionExecuted',
      data: nextAction,
    });
    nextAction = null;
  }
}

setInterval(processAction, 1000);

export default router;
