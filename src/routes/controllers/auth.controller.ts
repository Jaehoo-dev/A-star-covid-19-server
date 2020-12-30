import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { email },
  });

  console.log(user, created);
};
