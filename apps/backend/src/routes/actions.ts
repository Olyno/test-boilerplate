import express from 'express';
import { addAction, getActions } from '../database';
import { eventEmitter } from './events';

const router = express.Router();

router.get('/', async (req, res) => {
  const actions = await getActions();
  res.status(200).send(actions);
});

router.post('/', async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).send('Action type is required.');
  }

  try {
    const newAction = await addAction(type);
    eventEmitter.emit('action', { event: 'actionAdded', data: newAction });

    return res.status(200).send({ message: 'Action added successfully' });
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
});

export default router;
