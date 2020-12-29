import { Router } from 'express';
import { getDangerLocations } from './controllers/danger.controller';

const router: Router = Router();

router.get('/', getDangerLocations);

export default router;
