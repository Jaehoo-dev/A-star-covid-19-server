import { Request, Response, NextFunction } from 'express';
import sequelize from '../../config/database';
import { RESPONSE_RESULT } from '../../constants';

export const getHistories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const histories = await user.getHistories();

    res.status(200).json({
      result: RESPONSE_RESULT.OK,
      histories,
    });
  } catch (err) {
    next(err);
  }
};

export const updateHistories = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  const { startingPoint, destination } = req.body;
  const t = await sequelize.transaction();

  try {
    const [history] = await user.getHistories({
      where: {
        coordinates: [startingPoint, destination]
      }
    }, { transaction: t });

    if (history) {
      history.changed('updatedAt', true);
      await history.save({ transaction: t });
      await t.commit();

      res.status(200).json({
        result: RESPONSE_RESULT.OK,
      });

      return;
    };

    let numberOfHistories = await user.countHistories({}, { transaction: t });

    while (numberOfHistories > 9) {
      const [oldestHistory] = await user.getHistories({
        limit: 1,
        order: [['updatedAt', 'ASC']]
      }, { transaction: t });

      await oldestHistory.destroy({}, { transaction: t });

      numberOfHistories = await user.countHistories({}, { transaction: t });
    }

    await user.createHistory({
      coordinates: [startingPoint, destination],
    }, { transaction: t });

    await t.commit();

    res.status(200).json({
      result: RESPONSE_RESULT.OK,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
