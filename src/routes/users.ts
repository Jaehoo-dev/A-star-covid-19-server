import { Router } from 'express';
import { getUserByToken } from './controllers/user.controller';

const router: Router = Router();

router.get('/by_token', getUserByToken);

export default router;
