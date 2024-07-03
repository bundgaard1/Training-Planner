import { PlanProvider } from "../contexts/PlanContext";
import { PlanCalender, PlanHeader } from "../components/Plan";
import PlanSelector from "../components/PlanSelector";

export function PlansPage() {
  return (
    <div className="PlanOverview flex flex-1 flex-col m-4">
      <PlanProvider>
        <PlanSelector />
        <PlanHeader />
        <PlanCalender />
      </PlanProvider>
    </div>
  );
}

export default PlansPage;
