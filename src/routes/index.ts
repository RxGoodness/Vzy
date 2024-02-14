import express, { Request, Response } from 'express';
import authRoute from './auth';
import usersRoute from './user';
import webhookRoute from './webhook';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.send('Vzy is live');
});

router.use('/auth', authRoute);
router.use('/user', usersRoute);
router.use('/webhook', webhookRoute);

export default router;