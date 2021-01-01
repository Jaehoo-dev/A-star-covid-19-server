import { Sequelize } from 'sequelize';

const env = process.env;

const sequelize = new Sequelize(env.POSTGRES_DATABASE!, env.POSTGRES_USERNAME!, env.POSTGRES_PASSWORD, {
  host: env.POSTGRES_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.error(err));

export default sequelize;
