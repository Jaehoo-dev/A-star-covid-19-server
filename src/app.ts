import express, { Application, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import Error from './interfaces/Error';

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'not found'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const message
    = err.statusCode === 404
      ? err.message
      : 'internal server error';

  res
    .status(err.statusCode || 500)
    .json({
      result: 'failure',
      message,
    });
});

export default app;
