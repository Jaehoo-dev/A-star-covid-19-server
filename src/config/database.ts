import { Sequelize } from 'sequelize';

const env = process.env;

const sequelize = new Sequelize(env.DATABASE!, env.USERNAME!, env.PASSWORD!, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
