import { CreateNewPlan } from "../components/CreatePlan/NewPlan";
import { FindAPlan } from "../components/CreatePlan/FindAPlan";

export function CreatePlanPage() {
	return (
		<div className="container flex flex-1 justify-center items-start">
			<div className="w-1/2 bg-gray-300 h-full ">
				<CreateNewPlan />
			</div>
			<div className="w-1/2 h-full">
				<FindAPlan />
			</div>
		</div>
	);
}

export default CreatePlanPage;
