import { DB_URL } from "../config";
import PremadePlan from "../types/PremadePlan";
import Plan from "../types/Plan";

const PMPLAN_BASE_URL = `${DB_URL}/premadePlans`;

export async function getPremadePlans(): Promise<PremadePlan[]> {
	const response = await fetch(`${PMPLAN_BASE_URL}`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Premade Plans Recieved successfully");
		return data;
	} else {
		const errorText = await response.text();
		console.error("Error getting premade plans: ", errorText);
		throw new Error(`Error getting premade plans: ${errorText}`);
	}
}

export async function createPlanBasedOnPremade(
	premadeId: any,
	startDate: string
): Promise<Plan> {
	const response = await fetch(`${PMPLAN_BASE_URL}/createBasedOnPremade`, {
		method: "POST",
		body: JSON.stringify({ premadeId, startDate }),
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Plan created successfully");
		return data;
	} else {
		const errorText = await response.text();
		console.error("Error creating plan: ", errorText);
		throw new Error(`Error creating plan: ${errorText}`);
	}
}
