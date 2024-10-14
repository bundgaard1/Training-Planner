import IPremadePlan from "./premadePlans.interface";
import PremadePlanModel from "./premadePlans.model";
import PlanModel from "../plans/plans.model";
import WorkoutModel from "../workouts/workouts.model";

export async function getPremadePlans() {
	const plans = await PremadePlanModel.findAll();
	return plans;
}

export async function createPlanBasedOnPremade(
	userId: number,
	PMplanId: number,
	startDate: Date
) {
	const premadePlan = await PremadePlanModel.findByPk(PMplanId);
	const PMworkouts = await getWorkoutsbyPMPlan(PMplanId);

	if (!premadePlan) {
		throw new Error("Premade Plan not found");
	}

	const newPlan = new PlanModel({
		weeks: premadePlan.weeks,
		name: premadePlan.name,
		startDate,
		userId,
	});

	await newPlan.save();

	for (const workout of PMworkouts) {
		const newWorkout = new WorkoutModel({
			...workout.toJSON(),
			id: undefined,
			planId: newPlan.id,
		});
		await newWorkout.save();
	}

	return newPlan;
}

export async function getWorkoutsbyPMPlan(premadeId: number) {
	const workouts = await WorkoutModel.findAll({
		where: { premadeId },
	});
	return workouts;
}

const ExamplePremadePlans: IPremadePlan[] = [
	{
		id: 1,
		name: "Beginner 5k",
		weeks: 8,
		level: "Beginner",
		kmsLow: 5,
		kmsHigh: 12,
	},
	{
		id: 2,
		name: "Intermediate 10k",
		weeks: 12,
		level: "Intermediate",
		kmsLow: 15,
		kmsHigh: 23,
	},
];

export async function createPremadePremadePlans() {
	for (const plan of ExamplePremadePlans) {
		const newPremadePlan = new PremadePlanModel(plan);
		await newPremadePlan.save();
		console.log(`Premade Plan ${newPremadePlan.name} saved successfully.`);

		await createWorkoutsforPremade(newPremadePlan);
	}
}

async function createWorkoutsforPremade(premadePlan: PremadePlanModel) {
	for (let i = 0; i < premadePlan.weeks; i++) {
		for (let j = 1; j <= 7; j++) {
			const workout = new WorkoutModel();
			workout.workoutType = "Rest";
			workout.distance = 0;
			workout.duration = 0;
			workout.avgPace = 0;
			workout.description = "";
			workout.day = i * 7 + j;
			workout.isCompleted = false;
			workout.premadeId = premadePlan.id;

			// console.log(workout);

			try {
				await workout.save();
				// console.log(
				// 	`Workout for day ${workout.day} saved successfully. ${plan.id}`
				// );
			} catch (error) {
				console.error(
					`Plan ${premadePlan.id} : Error saving workout for day ${workout.day}:`,
					error
				);
			}
		}
	}
}
