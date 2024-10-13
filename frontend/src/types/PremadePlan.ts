export default interface PremadePlan {
	id?: number;
	weeks: number;
	name: string;
	level: string;
	kmsLow: number;
	kmsHigh: number;
}

export const ExamplePremadePlans: PremadePlan[] = [
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
