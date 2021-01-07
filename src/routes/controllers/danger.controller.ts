import { Request, Response, NextFunction } from 'express';
import generateDangerLocations from '../../utils/generateDangerLocation';
import { RESPONSE_RESULT } from '../../constants';
import { NUMBER } from '../../constants';

export const getDangerLocations = (req: Request, res: Response, next: NextFunction) => {
  const dangerLocations: number[] = [];

  const numberOfDangerLocations = Math.floor(Math.random() * NUMBER.DANGERS) + NUMBER.DANGERS_OFFSET;

  for (let i = 0; i < numberOfDangerLocations; i++) {
    dangerLocations.push(generateDangerLocations(NUMBER.ROWS * NUMBER.COLUMNS));
  }

  res.status(200).json({
    result: RESPONSE_RESULT.OK,
    dangerLocations,
  });
};
