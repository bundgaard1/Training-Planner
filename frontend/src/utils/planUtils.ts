import Plan from "../types/Plan";

export const planPeriod = (plan: Plan) => {
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

export const calculateEndDate = (startDate: string, weeks: number) => {
	if (!startDate || weeks <= 0) return "-";
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + weeks * 7);
	return `${endDate.getDate()}/${
		endDate.getMonth() + 1
	}/${endDate.getFullYear()}`;
};
