import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	ReactNode,
	useMemo,
} from "react";
import { getWorkoutsByPlan } from "../api/workoutAPI";
import PlanData from "../types/PlanData";
import Workout from "../types/Workout";

interface PlanContextType {
	plan: PlanData;
	setPlan: React.Dispatch<React.SetStateAction<PlanData>>;
	workoutsByDay: Map<number, Workout>;
	setWorkoutsByDay: React.Dispatch<React.SetStateAction<Map<number, Workout>>>;
}

const defaultContextValue: PlanContextType = {
	plan: {
		id: undefined,
		weeks: 0,
		name: "NO PLAN",
		startDate: new Date(2024, 0, 1).toISOString(),
	},
	setPlan: () => {},
	workoutsByDay: new Map<number, Workout>(),
	setWorkoutsByDay: () => {},
};

const PlanContext = createContext<PlanContextType>(defaultContextValue);

interface PlanProviderProps {
	children: ReactNode;
}

// Create a provider component
export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
	const [plan, setPlan] = useState<PlanData>(defaultContextValue.plan);
	const [workoutsByDay, setWorkoutsByDay] = useState<Map<number, Workout>>(
		defaultContextValue.workoutsByDay
	);

	useEffect(() => {
		const fetchWorkouts = async () => {
			if (plan.id !== undefined) {
				let workouts = await getWorkoutsByPlan(plan.id);
				let workoutsDayMap = new Map<number, Workout>();
				workouts.forEach((element: Workout) => {
					workoutsDayMap.set(element.day, element);
				});
				setWorkoutsByDay(workoutsDayMap);
			}
		};

		fetchWorkouts();
	}, [plan]);

	const contextValue = useMemo(
		() => ({
			plan,
			setPlan,
			workoutsByDay,
			setWorkoutsByDay,
		}),
		[plan, workoutsByDay]
	);

	return (
		<PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>
	);
};

// Create a custom hook to use the context
export const usePlan = () => {
	const context = useContext(PlanContext);
	if (!context) {
		throw new Error("usePlan must be used within a PlanProvider");
	}
	return context;
};
