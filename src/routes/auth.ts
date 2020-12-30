import { Router } from 'express';
import { signInUser } from './controllers/auth.controller';

const router: Router = Router();

router.post('/login', signInUser);

export default router;
