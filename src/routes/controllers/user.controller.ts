import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import { decode } from '../../utils/jwt';

export const getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!.split(' ')[1];
  const decoded = decode(token);

  try {
    const user = await User.findByPk(decoded.email);

    if (!user) {
      res.status(404).json({
        result: 'failure',
        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      result: 'ok',
      user,
    });
  } catch (err) {
    next(err);
  }
};
