import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { IPlan } from '../interfaces/plans.interface';
import UserModel from './users.model';

interface PlanCreationAttributes extends Optional<IPlan, 'id'> {}

class PlanModel extends Model<IPlan, PlanCreationAttributes> implements IPlan {
  public id!: number;
  public name!: string;
  public weeks!: number;
  public date!: Date;
  public userId!: number;
}

PlanModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  weeks: DataTypes.INTEGER,
  date: DataTypes.DATE,

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'plans'
});

export default PlanModel;