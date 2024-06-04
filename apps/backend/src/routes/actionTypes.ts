import express from 'express';
import { getActionTypes } from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
  const action_types = await getActionTypes();
  res.status(200).send(action_types);
});

export default router;
