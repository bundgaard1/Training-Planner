// models/associations.js or models/index.js
import PlanModel from './plans.model';
import WorkoutModel from './workouts.model';
import UserModel from './users.model';

PlanModel.hasMany(WorkoutModel, { foreignKey: 'planId' });
WorkoutModel.belongsTo(PlanModel, { foreignKey: 'planId' });

UserModel.hasMany(PlanModel, { foreignKey: 'userId' });
PlanModel.belongsTo(UserModel, { foreignKey: 'userId' });