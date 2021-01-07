import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import app from './app';
import http from 'http';
import database from './config/database';

const port: string | number
  = process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT!
    : process.env.PORT || '8080';
const server: http.Server = http.createServer(app);

server.listen(port, async () => {
  console.log(`server listening on port ${port}..`);

  try {
    await database.authenticate();
    console.log('database connected');
  } catch (err) {
    console.error(err);
  }
});
