// models/associations.js or models/index.js
import PlanModel from "../plans/plans.model";
import WorkoutModel from "../workouts/workouts.model";
import UserModel from "../users/users.model";
import PremadePlanModel from "../premadePlans/premadePlans.model";

PremadePlanModel.hasMany(WorkoutModel, {
	foreignKey: "premadeId",
});
WorkoutModel.belongsTo(PremadePlanModel, {
	foreignKey: "premadeId",
});

PlanModel.hasMany(WorkoutModel, {
	foreignKey: "planId",
});
WorkoutModel.belongsTo(PlanModel, {
	foreignKey: "planId",
});

UserModel.hasMany(PlanModel, { foreignKey: "userId" });
PlanModel.belongsTo(UserModel, { foreignKey: "userId" });
