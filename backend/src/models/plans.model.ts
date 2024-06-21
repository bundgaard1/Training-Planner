import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Plan } from '../interfaces/plans.interface';

interface PlanCreationAttributes extends Optional<Plan, 'id'> {}

class PlanModel extends Model<Plan, PlanCreationAttributes> implements Plan {
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
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'plans'
});

export default Plan;