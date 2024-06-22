import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import {IUser} from '../interfaces/users.interface';

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public username!: string;
  public password!: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default UserModel;