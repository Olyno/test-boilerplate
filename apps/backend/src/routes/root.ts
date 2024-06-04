import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const test = process.env.TEST;
  res.send({ message: 'Hello API' });
});

export default router;
