import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";
import PlanModel from "../plans/plans.model";
import { IWorkout } from "./workouts.interface";

interface WorkoutCreationAttributes extends Optional<IWorkout, "id"> {}

class WorkoutModel
	extends Model<IWorkout, WorkoutCreationAttributes>
	implements IWorkout
{
	public id!: number;
	public workoutType!:
		| "Rest"
		| "GeneralAerobic"
		| "Workout"
		| "LongRun"
		| "Race";
	public distance!: number;
	public duration!: number;
	public avgPace!: number;
	public description!: string;
	public isCompleted!: boolean;
	public day!: number;
	public planId!: number;
	public premadeId!: number;
}

WorkoutModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		workoutType: DataTypes.ENUM(
			"Rest",
			"GeneralAerobic",
			"Workout",
			"LongRun",
			"Race"
		),
		distance: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		avgPace: {
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
			allowNull: true,
		},
		premadeId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "workouts",
	}
);

export default WorkoutModel;
