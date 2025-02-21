// src/components/dashboard/chartsMetadata..js

// Import your chart components
import DemographicAgeGender from "../DemographicAgeGender";
import DemographicNationalMarital from "../DemographicNationalMarital";
import SkillGapAnalysisCard from "../SkillGapAnalysisCard";
import CompensationBenchmarkingCard from "../CompensationBenchmarkingCard";
import TrainingEffectivenessCard from "../TrainingEffectivenessCard";
import InternalMobilityTrendsCard from "../InternalMobilityTrendsCard";
import ImpactOnPerformanceCard from "../ImpactOnPerformanceCard";
import CTCChartCard from "../CTCChartCard";
import PerformanceTrendsCard from "../PerformanceTrendsCard";
import HighPotentialEmployeesTrendsCard from "../HighPotentialEmployeesTrendsCard";
import AbsenteeismPatternsCard from "../AbsenteeismPatternsCard";
import OvertimeCostAnalysisCard from "../OvertimeCostAnalysisCard";
import StaffingOptimizationCard from "../StaffingOptimizationCard";
import PatternAnalysisCard from "../DisciplinaryAnalysisCard";
import ValidPan from "../ValidPan";
import ValidAdhaar from "../ValidAdhaar";
import ValidPassport from "../ValidPassport";
import TrainingNeedsCard from "../TrainingNeedsCard";
import AddressDistributionCard from "../AddressDistributionCard";
import ComplianceTrainingCoverageCard from "../ComplianceTrainingCoverageCard";
import PerformanceCard from "../PerformanceCard";
import CorrelationTrainingPerformanceCard from "../CorrelationTrainingPerformanceCard";
import GrievanceResolutionChart from "../GrievanceResolutionChart";
import WorkplaceHotspotsChart from "../WorkplaceHotspotsChart";



/**
 * Each object has:
 * - id: Unique string stored in user preferences (must match your existing IDs)
 * - label: Friendly name displayed in the modal
 * - component: The actual React component
 */
export const CHARTS_METADATA = [
  {
    id: "DemographicAgeGender",
    label: "Age & Gender Distribution",
    component: DemographicAgeGender,
  },
  {
    id: "DemographicNationalMarital",
    label: "Nationality & Marital Status",
    component: DemographicNationalMarital,
  },
  {
    id: "SkillGapAnalysisCard",
    label: "Skill Gap Analysis",
    component: SkillGapAnalysisCard,
  },
  {
    id: "CompensationBenchmarkingCard",
    label: "Compensation Benchmarking",
    component: CompensationBenchmarkingCard,
  },
  {
    id: "TrainingEffectivenessCard",
    label: "Training Effectiveness",
    component: TrainingEffectivenessCard,
  },
  {
    id: "InternalMobilityTrendsCard",
    label: "Internal Mobility Trends",
    component: InternalMobilityTrendsCard,
  },
  {
    id: "ImpactOnPerformanceCard",
    label: "Impact on Performance",
    component: ImpactOnPerformanceCard,
  },
  {
    id: "CTCChartCard",
    label: "CTC Chart",
    component: CTCChartCard,
  },
  {
    id: "PerformanceTrendsCard",
    label: "Performance Trends",
    component: PerformanceTrendsCard,
  },
  {
    id: "HighPotentialEmployeesTrendsCard",
    label: "High Potential Employees",
    component: HighPotentialEmployeesTrendsCard,
  },
  {
    id: "AbsenteeismPatternsCard",
    label: "Absenteeism Patterns",
    component: AbsenteeismPatternsCard,
  },
  {
    id: "OvertimeCostAnalysisCard",
    label: "Overtime Cost Analysis",
    component: OvertimeCostAnalysisCard,
  },
  {
    id: "StaffingOptimizationCard",
    label: "Staffing Optimization",
    component: StaffingOptimizationCard,
  },
  {
    id: "PatternAnalysisCard",
    label: "Pattern Analysis",
    component: PatternAnalysisCard,
  },
  {
    id: "ValidPan",
    label: "Valid PAN Distribution",
    component: ValidPan,
  },
  {
    id: "ValidAdhaar",
    label: "Valid Adhaar Distribution",
    component: ValidAdhaar,
  },
  {
    id: "ValidPassport",
    label: "Valid Passport Distribution",
    component: ValidPassport,
  },
  {
    id: "TrainingNeedsCard",
    label: "Training Needs",
    component: TrainingNeedsCard,
  },
  {
    id: "AddressDistributionCard",
    label: "Address Distribution",
    component: AddressDistributionCard,
  },
  {
    id: "ComplianceTrainingCoverageCard",
    label: "Compliance Training Coverage",
    component: ComplianceTrainingCoverageCard,
  },
  {
    id: "PerformanceCard",
    label: "Performance Overview",
    component: PerformanceCard,
  },
  {
    id: "CorrelationTrainingPerformanceCard",
    label: "Correlation: Training & Performance",
    component: CorrelationTrainingPerformanceCard,
  },
  {
    id: "GrievanceResolutionChart",
    label: "Grievance Resolution",
    component: GrievanceResolutionChart,
  },
  {
    id: "WorkplaceHotspotsChart",
    label: "Workplace Hotspots Chart",
    component: WorkplaceHotspotsChart,
  },
];

// Optional: If you need an ID->Component lookup
export const CHARTS_LOOKUP = CHARTS_METADATA.reduce((acc, item) => {
  acc[item.id] = item.component;
  return acc;
}, {});
