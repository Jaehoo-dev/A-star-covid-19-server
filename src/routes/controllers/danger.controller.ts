import { Request, Response, NextFunction } from 'express';
import generateDangerLocations from '../../utils/generateDangerLocation';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';

export const getDangerLocations = (req: Request, res: Response, next: NextFunction) => {
  const dangerLocations = [
    generateDangerLocations(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS),
    generateDangerLocations(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS),
  ];

  res.status(200).json({
    result: 'ok',
    dangerLocations,
  });
};
