import sequelize from '../config/database';
import {
  Model,
  DataTypes,
  Association,
} from 'sequelize';
import History from './History';

export default class User extends Model {
  public email!: string;
  public static associations: {
    historys: Association<User, History>;
  };
}

User.init(
  {
    email: {
      type: new DataTypes.STRING(128),
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  }
);

User.hasMany(History, {
  onDelete: 'cascade',
});

User.sync({ force: false });
