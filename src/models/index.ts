import sequelize from '../config/database';
import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

interface UserAttributes {
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'email'> { }

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public email!: string;

  public getHistories!: HasManyGetAssociationsMixin<History>;
  public addHistory!: HasManyAddAssociationMixin<History, number>;
  public hasHistory!: HasManyHasAssociationMixin<History, number>;
  public countHistories!: HasManyCountAssociationsMixin;
  public createHistory!: HasManyCreateAssociationMixin<History>;

  public readonly histories?: History[];

  public static associations: {
    histories: Association<User, History>;
  };
}

interface HistoryAttributes {
  id: number;
  userEmail: string;
  coordinates: number[];
}

interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id'> { }

export class History extends Model<HistoryAttributes, HistoryCreationAttributes>
  implements HistoryAttributes {
  public id!: number;
  public userEmail!: string;
  public coordinates!: number[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    coordinates: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'histories',
  }
);

User.init(
  {
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

User.hasMany(History, {
  sourceKey: 'email',
  foreignKey: 'userEmail',
  as: 'histories',
  onDelete: 'cascade',
});
