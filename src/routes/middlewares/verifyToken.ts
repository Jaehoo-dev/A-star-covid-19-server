import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import { decode } from '../../utils/jwt';
import { RESPONSE_RESULT } from '../../constants';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!.split(' ')[1];
  const decoded = decode(token);
  const user = await User.findByPk(decoded.email);

  if (!user) {
    res.status(404).json({
      result: RESPONSE_RESULT.FAILURE,
      message: 'User not found',
    });

    return;
  }

  res.locals.user = user;

  next();
};

export default verifyToken;
