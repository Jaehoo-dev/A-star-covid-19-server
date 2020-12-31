import sequelize from '../config/database';
import {
  Model,
  DataTypes,
} from 'sequelize';

interface HistoryAttributes {
  id: number;
  userEmail: string;
  history: number[];
}

export default class History extends Model<HistoryAttributes> implements HistoryAttributes {
  public id!: number;
  public userEmail!: string;
  public history!: number[];
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userEmail: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    history: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  },
  {
    tableName: 'histories',
    sequelize,
  }
);

History.sync({ force: false });
