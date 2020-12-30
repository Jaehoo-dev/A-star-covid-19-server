import express, { Application, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import indexRouter from './routes/index';
import Error from './interfaces/Error';
import database from './config/database';

const port: string | number = process.env.PORT || 8080;
const app: Application = express();
const server: http.Server = http.createServer(app);

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

server.listen(port, async () => {
  console.log(`server listening on port ${port}..`);

  try {
    await database.authenticate();
    console.log('database connected');
  } catch (err) {
    console.error(err);
  }
});

export default app;
