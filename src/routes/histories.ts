import { Router } from 'express';
import { getHistories, updateHistories } from './controllers/history.controller';
import verifyToken from './middlewares/verifyToken';

const router: Router = Router();

router.get('/', verifyToken, getHistories);
router.post('/new', verifyToken, updateHistories);

export default router;
