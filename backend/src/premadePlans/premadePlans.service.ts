import PremadePlanModel from "./premadePlans.model";

export async function getPremadePlans() {
	const plans = await PremadePlanModel.findAll();
	return plans;
}
