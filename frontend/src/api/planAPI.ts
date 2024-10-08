import { DB_URL } from "../config";
import PlanData from "../types/PlanData";

const BASE_URL = `${DB_URL}/plans`;

export async function getPlan(planId: number): Promise<PlanData> {
	const response = await fetch(`${BASE_URL}/getPlan/${planId}`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Plan Recieved successfully");
		return data;
	} else {
		const errorText = await response.text();
		console.error("Error getting plan: ", errorText);
		throw new Error(`Error getting plan: ${errorText}`);
	}
}

export async function createPlan(planData: PlanData): Promise<PlanData> {
	const response = await fetch(`${BASE_URL}/createPlan`, {
		method: "POST",
		body: JSON.stringify(planData),
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Plan created successfully");
		return data;
	} else if (response.status === 400) {
		console.error("Unauthorized");
		return { id: -1, name: "", weeks: 0, startDate: "" };
	} else {
		const errorText = await response.text();
		console.error("Error creating plan: ", errorText);
		throw new Error(`Error creating plan: ${errorText}`);
	}
}

export async function getAllPlans(): Promise<PlanData[]> {
	const response = await fetch(`${BASE_URL}/getPlans`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Plans received successfully");
		console.log("All plans: ", data);
		return data;
	} else if (response.status === 400) {
		const data = await response.json();
		console.error(data);
		return [];
	} else {
		const errorText = await response.text();
		console.error("Error getting plans");
		throw new Error(`Error getting plans: ${errorText}`);
	}
}
