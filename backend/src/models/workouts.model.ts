import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Plan from './plans.model';
import { Workout} from "../interfaces/workouts.interface";

interface WorkoutCreationAttributes extends Optional<Workout, 'id'> {}

class WorkoutModel extends Model<Workout, WorkoutCreationAttributes> implements Workout {
  public id!: number;
  public workoutType!: 'Rest' | 'GeneralAerobic' | 'Workout' | 'LongRun' | 'Race';
  public distance!: number;
  public description!: string;
  public isCompleted!: boolean;
  public day!: number;
  public planId!: number;
}

WorkoutModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutType: DataTypes.ENUM('Rest', 'GeneralAerobic', 'Workout', 'LongRun', 'Race'),
  distance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  day: DataTypes.INTEGER,
  planId: {
    type: DataTypes.INTEGER,
    references: {
      model: Plan,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'workouts', // Ensure this matches the table name in your database
});

export default WorkoutModel;