import express from 'express';
import { getActionTypes } from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const action_types = await getActionTypes();
    return res.status(200).send(action_types);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
