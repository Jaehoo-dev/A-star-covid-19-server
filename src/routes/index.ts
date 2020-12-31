import { Router } from 'express';
import dangerRouter from './danger';
import authRouter from './auth';
import usersRouter from './users';
import historiesRouter from './histories';

const router: Router = Router();

router.use('/dangers', dangerRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/histories', historiesRouter);

export default router;
