import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Plan from './Plan';

// TypeScript interfaces for compile-time type checking
interface WorkoutAttributes {
  id: number;
  workoutType: 'Rest' | 'GeneralAerobic' | 'Workout' | 'LongRun' | 'Race';
  distance: number; 
  description: string; 
  isCompleted: boolean;
  day: number;
  planId: number;
}

interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> {}

class Workout extends Model<WorkoutAttributes, WorkoutCreationAttributes> implements WorkoutAttributes {
  public id!: number;
  public workoutType!: 'Rest' | 'GeneralAerobic' | 'Workout' | 'LongRun' | 'Race';
  public distance!: number;
  public description!: string;
  public isCompleted!: boolean;
  public day!: number;
  public planId!: number;
}

Workout.init({
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

export default Workout;