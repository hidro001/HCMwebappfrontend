import DemographicAgeGender from "./DemographicAgeGender";
import DemographicNationalMarital from "./DemographicNationalMarital";
import ValidPan from "./ValidPan";
import ValidAdhaar from "./ValidAdhaar";
import ValidPassport from "./ValidPassport";
import TraingEffectiveness from "./TraingEffectiveness";

export default function AllDashlets() {
  return (
    <div className="min-h-screen">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Dashboards
      </h1>

      {/* 3-column layout (no extra gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Column 1: Demographic (Age,Gender) */}
        <div>
          <DemographicAgeGender />
        </div>

        {/* Column 2: Demographic (Nationality,Marital) */}
        <div>
          <DemographicNationalMarital />
        </div>

        {/* Column 3: Stacked smaller donut charts */}
        <div className="flex flex-col space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidPan />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidAdhaar />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidPassport />
          </div>

          <div>
            <TraingEffectiveness />
          </div>
        </div>
      </div>
    </div>
  );
}
