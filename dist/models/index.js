"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.User = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
class History extends sequelize_1.Model {
}
exports.History = History;
History.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userEmail: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    coordinates: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'histories',
});
User.init({
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'users',
    sequelize: database_1.default,
    timestamps: false,
});
User.hasMany(History, {
    sourceKey: 'email',
    foreignKey: 'userEmail',
    as: 'histories',
    onDelete: 'cascade',
});
if (process.env.NODE_ENV !== 'test') {
    User.sync({ force: false });
    History.sync({ force: false });
}
