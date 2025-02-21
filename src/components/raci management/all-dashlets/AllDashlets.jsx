// import DemographicAgeGender from "./DemographicAgeGender";
// import DemographicNationalMarital from "./DemographicNationalMarital";
// import ValidPan from "./ValidPan";
// import ValidAdhaar from "./ValidAdhaar";
// import ValidPassport from "./ValidPassport";
// import TrainingNeedsCard from "./TrainingNeedsCard";
// import PerformanceCard from "./PerformanceCard";
// import SkillGapAnalysisCard from "./SkillGapAnalysisCard";
// import AddressDistributionCard from "./AddressDistributionCard";
// import InternalMobilityTrendsCard from "./InternalMobilityTrendsCard";
// import CompensationBenchmarkingCard from "./CompensationBenchmarkingCard";
// import ImpactOnPerformanceCard from "./ImpactOnPerformanceCard";
// import CTCChartCard from "./CTCChartCard";
// import HighPotentialEmployeesTrendsCard from "./HighPotentialEmployeesTrendsCard";
// import PerformanceTrendsCard from "./PerformanceTrendsCard";
// import CorrelationTrainingPerformanceCard from "./CorrelationTrainingPerformanceCard";
// import TrainingEffectivenessCard from "./TrainingEffectivenessCard";
// import AbsenteeismPatternsCard from "./AbsenteeismPatternsCard";
// import OvertimeCostAnalysisCard from "./OvertimeCostAnalysisCard";
// import StaffingOptimizationCard from "./StaffingOptimizationCard";
// import DisciplinaryAnalysisCard from "./DisciplinaryAnalysisCard";
// import ComplianceTrainingCoverageCard from "./ComplianceTrainingCoverageCard";

// export default function AllDashlets() {
//   return (
//     <div className="bg-bg-primary p-2">
//       {/* Page title */}
//       <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
//         Analytics Dashboards
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
//         {/* Column 1 */}
//         <div className=" ">
//           <div className="mt-3">
//             <DemographicAgeGender />
//           </div>
//           <div className="mt-3">
//             <DemographicNationalMarital />
//           </div>

//           <div className="mt-3">
//             <SkillGapAnalysisCard />
//           </div>

//           <div className="mt-3">
//             <CompensationBenchmarkingCard />
//           </div>

//           <div className="mt-3">
//             <TrainingEffectivenessCard />
//           </div>

//           <div className="mt-3">
//             <InternalMobilityTrendsCard />
//           </div>
//           <div className="mt-3">
//             <ImpactOnPerformanceCard />
//           </div>
//           <div className="mt-3">
//             <CTCChartCard />
//           </div>
//           <div className="mt-3">
//             <PerformanceTrendsCard />
//           </div>
//           <div className="mt-3">
//             <HighPotentialEmployeesTrendsCard />
//           </div>
//           <div className="mt-3">
//             <AbsenteeismPatternsCard />
//           </div>
//           <div className="mt-3">
//             <OvertimeCostAnalysisCard />
//           </div>
//           <div className="mt-3">
//             <StaffingOptimizationCard />
//           </div>
//           <div className="mt-3">
//             <DisciplinaryAnalysisCard />
//           </div>
//         </div>

//         {/* Column 2: Stacked smaller donut charts */}
//         <div className=" mt-3 ">
//           <div className="flex gap-3">
//             <div className="">
//               <ValidPan />
//             </div>

//             <div className="">
//               <ValidAdhaar />
//             </div>
//           </div>

//           <div className="flex gap-1">
//             <div className="mt-3">
//               <ValidPassport />
//             </div>
//             <div className="mt-3">
//               <TrainingNeedsCard />
//             </div>
//           </div>

//           <div className="flex ">
//             {" "}
//             <div className="mt-3">
//               <AddressDistributionCard />
//             </div>
//           </div>
//           <div className="mt-3">
//             <ComplianceTrainingCoverageCard />
//           </div>
//           <div className="mt-3">
//             <PerformanceCard />
//           </div>
//           <div className="mt-3">
//             <CorrelationTrainingPerformanceCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/dashboard/AllDashlets.js
import React, { useEffect, useState } from "react";
import useDashboardStore from "../../../store/dashboardStore";

// Import the specific chart components:
import DemographicAgeGender from "./DemographicAgeGender";
import DemographicNationalMarital from "./DemographicNationalMarital";
import SkillGapAnalysisCard from "./SkillGapAnalysisCard";
import CompensationBenchmarkingCard from "./CompensationBenchmarkingCard";
import TrainingEffectivenessCard from "./TrainingEffectivenessCard";
import InternalMobilityTrendsCard from "./InternalMobilityTrendsCard";
import ImpactOnPerformanceCard from "./ImpactOnPerformanceCard";
import CTCChartCard from "./CTCChartCard";
import PerformanceTrendsCard from "./PerformanceTrendsCard";
import HighPotentialEmployeesTrendsCard from "./HighPotentialEmployeesTrendsCard";
import AbsenteeismPatternsCard from "./AbsenteeismPatternsCard";
import OvertimeCostAnalysisCard from "./OvertimeCostAnalysisCard";
import StaffingOptimizationCard from "./StaffingOptimizationCard";
import DisciplinaryAnalysisCard from "./DisciplinaryAnalysisCard";
import ValidPan from "./ValidPan";
import ValidAdhaar from "./ValidAdhaar";
import ValidPassport from "./ValidPassport";
import TrainingNeedsCard from "./TrainingNeedsCard";
import AddressDistributionCard from "./AddressDistributionCard";
import ComplianceTrainingCoverageCard from "./ComplianceTrainingCoverageCard";
import PerformanceCard from "./PerformanceCard";
import CorrelationTrainingPerformanceCard from "./CorrelationTrainingPerformanceCard";
import GrievanceResolutionChart from "./GrievanceResolutionChart";
// The modal
import CustomizeDashboardModal from "./model/CustomizeDashboardModal";
import WorkplaceHotspotsChart from "./WorkplaceHotspotsChart";
import StreamliningVerificationChart from "./StreamliningVerificationChart";

export default function AllDashlets() {
  const { preferences, fetchPreferences } = useDashboardStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPreferences(); // load user preferences when component mounts
  }, [fetchPreferences]);

  // If the user has no preferences => show all
  const hasPrefs = preferences && preferences.length > 0;
  const shouldShow = (cardId) => !hasPrefs || preferences.includes(cardId);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-bg-primary p-2">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
        Analytics Dashboards
      </h1>

      {/* Button for customizing */}
      <div className="flex justify-center my-4">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {hasPrefs ? "Edit Customization" : "Customize"}
        </button>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Column 1 */}
        <div>
          {shouldShow("DemographicAgeGender") && (
            <div className="mt-3">
              <DemographicAgeGender />
            </div>
          )}

          {shouldShow("DemographicNationalMarital") && (
            <div className="mt-3">
              <DemographicNationalMarital />
            </div>
          )}

          {shouldShow("DisciplinaryAnalysisCard") && (
            <div className="mt-3">
              <DisciplinaryAnalysisCard />
            </div>
          )}

          {shouldShow("StaffingOptimizationCard") && (
            <div className="mt-3">
              <StaffingOptimizationCard />
            </div>
          )}
          {shouldShow("CompensationBenchmarkingCard") && (
            <div className="mt-3">
              <CompensationBenchmarkingCard />
            </div>
          )}
          {shouldShow("GrievanceResolutionChart") && (
            <div className="mt-3">
              <GrievanceResolutionChart />
            </div>
          )}

          {shouldShow("PerformanceTrendsCard") && (
            <div className="mt-3">
              <PerformanceTrendsCard />
            </div>
          )}

          {shouldShow("AbsenteeismPatternsCard") && (
            <div className="mt-3">
              <AbsenteeismPatternsCard />
            </div>
          )}
             {shouldShow("WorkplaceHotspotsChart") && (
            <div className="mt-3">
              <WorkplaceHotspotsChart />
            </div>
          )}
          {shouldShow("StreamliningVerificationChart") && (
            <div className="mt-3">
              <StreamliningVerificationChart />
            </div>
          )}
          {shouldShow("SkillGapAnalysisCard") && (
            <div className="mt-3">
              <SkillGapAnalysisCard />
            </div>
          )}

          {shouldShow("TrainingEffectivenessCard") && (
            <div className="mt-3">
              <TrainingEffectivenessCard />
            </div>
          )}

          {shouldShow("InternalMobilityTrendsCard") && (
            <div className="mt-3">
              <InternalMobilityTrendsCard />
            </div>
          )}

          {shouldShow("ImpactOnPerformanceCard") && (
            <div className="mt-3">
              <ImpactOnPerformanceCard />
            </div>
          )}

          {shouldShow("CTCChartCard") && (
            <div className="mt-3">
              <CTCChartCard />
            </div>
          )}

          {shouldShow("HighPotentialEmployeesTrendsCard") && (
            <div className="mt-3">
              <HighPotentialEmployeesTrendsCard />
            </div>
          )}

          {shouldShow("OvertimeCostAnalysisCard") && (
            <div className="mt-3">
              <OvertimeCostAnalysisCard />
            </div>
          )}
       
        </div>

        {/* Column 2 */}
        <div className="mt-3">
          <div className="flex gap-3">
            {shouldShow("ValidPan") && (
              <div>
                <ValidPan />
              </div>
            )}
            {shouldShow("ValidAdhaar") && (
              <div>
                <ValidAdhaar />
              </div>
            )}
          </div>

          <div className="flex gap-1">
            {shouldShow("ValidPassport") && (
              <div className="mt-3">
                <ValidPassport />
              </div>
            )}
            {shouldShow("TrainingNeedsCard") && (
              <div className="mt-3">
                <TrainingNeedsCard />
              </div>
            )}
          </div>

          <div className="flex">
            {shouldShow("AddressDistributionCard") && (
              <div className="mt-3">
                <AddressDistributionCard />
              </div>
            )}
          </div>

          {shouldShow("ComplianceTrainingCoverageCard") && (
            <div className="mt-3">
              <ComplianceTrainingCoverageCard />
            </div>
          )}

          {shouldShow("PerformanceCard") && (
            <div className="mt-3">
              <PerformanceCard />
            </div>
          )}

          {shouldShow("CorrelationTrainingPerformanceCard") && (
            <div className="mt-3">
              <CorrelationTrainingPerformanceCard />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && <CustomizeDashboardModal onClose={closeModal} />}
    </div>
  );
}
