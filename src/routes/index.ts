import { Router } from 'express';
import dangerRouter from './danger';
import authRouter from './auth';

const router: Router = Router();

router.use('/dangers', dangerRouter);
router.use('/auth', authRouter);

export default router;
