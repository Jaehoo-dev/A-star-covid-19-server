import { Router } from 'express';
import dangerRouter from './danger';

const router: Router = Router();

router.use('/dangers', dangerRouter);

export default router;
