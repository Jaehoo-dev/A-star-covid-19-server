import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import { decode } from '../../utils/jwt';
import { RESPONSE_RESULT } from '../../constants';

export const getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!.split(' ')[1];
  const decoded = decode(token);

  try {
    const user = await User.findByPk(decoded.email);

    if (!user) {
      res.status(404).json({
        result: RESPONSE_RESULT.FAILURE,
        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      result: RESPONSE_RESULT.OK,
      user,
    });
  } catch (err) {
    next(err);
  }
};
