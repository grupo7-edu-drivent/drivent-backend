import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activityServices from '@/services/activity-service';

export async function registerInActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const activityId = req.body.activityId as number;

  try {
    const register = await activityServices.registerActivity(+userId, activityId);
    return res.send(register);
  } catch (error) {
    return next(error);
  }
}
