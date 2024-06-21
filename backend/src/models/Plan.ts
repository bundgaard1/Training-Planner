import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

// TypeScript interfaces for compile-time type checking
interface PlanAttributes {
  id: number;
  name: string;
  weeks: number;
  date: Date;
}

interface PlanCreationAttributes extends Optional<PlanAttributes, 'id'> {}

class Plan extends Model<PlanAttributes, PlanCreationAttributes> implements PlanAttributes {
  public id!: number;
  public name!: string;
  public weeks!: number;
  public date!: Date;
}

Plan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  weeks: DataTypes.INTEGER,
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'plans'
});

export default Plan;