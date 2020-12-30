import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  console.log(email);

  const users = await User.findAll<User>();
  console.log(users);
};
