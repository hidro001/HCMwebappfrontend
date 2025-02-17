import DemographicAgeGender from "./DemographicAgeGender";
import DemographicNationalMarital from "./DemographicNationalMarital";
import ValidPan from "./ValidPan";
import ValidAdhaar from "./ValidAdhaar";
import ValidPassport from "./ValidPassport";
import TraingEffectiveness from "./TraingEffectiveness";
import TrainingNeedsCard from "./TrainingNeedsCard";
import PerformanceCard from "./PerformanceCard";
import SkillGapAnalysisCard from "./SkillGapAnalysisCard";
import AddressDistributionCard from "./AddressDistributionCard";
import InternalMobilityTrendsCard from "./InternalMobilityTrendsCard";
import CompensationBenchmarkingCard from "./CompensationBenchmarkingCard";
import ImpactOnPerformanceCard from "./ImpactOnPerformanceCard";
import CTCChartCard from "./CTCChartCard";
import HighPotentialEmployeesTrendsCard from "./HighPotentialEmployeesTrendsCard";
import PerformanceTrendsCard from "./PerformanceTrendsCard";
import CorrelationTrainingPerformanceCard from "./CorrelationTrainingPerformanceCard";
import TrainingEffectivenessCard from "./TrainingEffectivenessCard";

export default function AllDashlets() {
  return (
    <div className="border border-red-900 p-2">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Dashboards
      </h1>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 p-2">
        {/* Column 1 */}
        <div className="border p-1">
          <div className="mt-3">
            <DemographicAgeGender />
          </div>
          <div className="mt-3">
            <SkillGapAnalysisCard />
          </div>
          <div className="mt-3">
            <AddressDistributionCard />
          </div>
          <div className="mt-3">
            <CompensationBenchmarkingCard />
          </div>
          <div className="mt-3">
            <HighPotentialEmployeesTrendsCard />
          </div>
          <div className="mt-3">
            <TrainingEffectivenessCard/>
          </div>
               <div className="mt-3">
            {" "}
            <DemographicNationalMarital />
          </div>
          <div className="mt-3">
            <InternalMobilityTrendsCard />
          </div>
          <div className="mt-3">
            <ImpactOnPerformanceCard />
          </div>
          <div className="mt-3">
            <CTCChartCard/>
          </div>
          <div className="mt-3">
            <PerformanceTrendsCard/>
          </div>
        </div>


        {/* Column 2: Stacked smaller donut charts */}
        <div className="flex flex-col space-y-4 border">
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
            <TrainingNeedsCard />
          </div>
          <div>
            <PerformanceCard />
          </div>
          <div>
            <CorrelationTrainingPerformanceCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
