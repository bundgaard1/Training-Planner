import PlanData from "../types/PlanData";

export const planPeriod = (plan: PlanData) => {
	const planStart = new Date(plan.startDate);
	const planEnd = new Date(plan.startDate);
	planEnd.setDate(planEnd.getDate() + plan.weeks * 7 - 1);

	const dateFormat = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};
	return `${dateFormat(planStart)} - ${dateFormat(planEnd)}`;
};
