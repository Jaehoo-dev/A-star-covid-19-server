"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env;
const sequelize = new sequelize_1.Sequelize(env.POSTGRES_DATABASE, env.POSTGRES_USERNAME, env.POSTGRES_PASSWORD, {
    host: env.NODE_ENV === 'test' ? env.POSTGRES_LOCALHOST : env.POSTGRES_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
