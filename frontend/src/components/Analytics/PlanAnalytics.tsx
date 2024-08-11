import { usePlan } from "../../contexts/PlanContext";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

interface WidgetProps {
	title: string;
	cols?: number;
	rows?: number;
	children: React.ReactNode;
}

const AnalyticsWidget = (props: WidgetProps) => {
	const gridOption = `col-span-${props.cols || 1} row-span-${props.rows || 1}`;

	return (
		<div className={`widget col-span ${gridOption} bg-gray-300 m-2 rounded-lg`}>
			<div className="widgetHeader">{props.title}</div>
			<div className="widgetContent">{props.children}</div>
		</div>
	);
};

export const PlanAnalytics = () => {
	const { plan, workoutsByDay } = usePlan();

	const WeeklyDistanceGraph = () => {
		let weekDistances: number[] = [];

		for (let week = 0; week < plan.weeks; week++) {
			let weekDist = 0;
			for (let day = 0; day < 7; day++) {
				weekDist += workoutsByDay.get(week * 7 + day + 1)?.distance || 0;
			}
			weekDistances.push(weekDist);
		}

		const data = {
			labels: Array.from({ length: weekDistances.length }, (_, i) => i + 1),
			datasets: [
				{
					label: "Distance",
					data: weekDistances,
					fill: false,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
				},
			],
		};

		const options = {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		};

		return <Line data={data} options={options} />;
	};

	return (
		<div className="grid grid-flow grid-cols-2 grid-rows-* ">
			<AnalyticsWidget title="Weekly Distance">
				<WeeklyDistanceGraph />
			</AnalyticsWidget>
		</div>
	);
};
