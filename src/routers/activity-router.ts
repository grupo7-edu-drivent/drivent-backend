import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { registerInActivity } from '@/controllers';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).post('/', registerInActivity);

export { activityRouter };
