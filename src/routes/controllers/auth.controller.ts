import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import { encode } from '../../utils/jwt';
import { RESPONSE_RESULT } from '../../constants';

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
    });

    const token = encode(user);

    res.status(created ? 201 : 200).json({
      result: RESPONSE_RESULT.OK,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
