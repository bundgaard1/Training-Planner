import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";
import IPremadePlan from "./premadePlans.interface";

interface PremadePlanCreationAttributes extends Optional<IPremadePlan, "id"> {}

class PremadePlanModel
	extends Model<IPremadePlan, PremadePlanCreationAttributes>
	implements IPremadePlan
{
	public id!: number;
	public name!: string;
	public weeks!: number;
	public level!: string;
	public kmsLow!: number;
	public kmsHigh!: number;
}

PremadePlanModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		weeks: DataTypes.INTEGER,
		level: DataTypes.STRING,
		kmsLow: DataTypes.INTEGER,
		kmsHigh: DataTypes.INTEGER,
	},
	{
		sequelize,
		modelName: "premadePlans",
	}
);

export default PremadePlanModel;
