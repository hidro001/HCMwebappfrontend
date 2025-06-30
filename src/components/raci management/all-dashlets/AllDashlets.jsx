import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiDollarSign,
  FiClock,
  FiShield,
  FiMapPin,
  FiBookOpen,
  FiAward,
  FiAlertTriangle,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { TfiBarChartAlt } from "react-icons/tfi";

import {
  MdDashboard,
  MdAnalytics,
  MdSecurity,
  MdLocationOn,
} from "react-icons/md";
import useDashboardStore from "../../../store/dashboardStore";

// Import all your chart components
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
import CustomizeDashboardModal from "./model/CustomizeDashboardModal";
import WorkplaceHotspotsChart from "./WorkplaceHotspotsChart";
import StreamliningVerificationChart from "./StreamliningVerificationChart";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AllDashlets() {
  const { preferences, fetchPreferences } = useDashboardStore();
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'masonry'

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const hasPrefs = preferences && preferences.length > 0;
  const shouldShow = (cardId) => !hasPrefs || preferences.includes(cardId);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Dashboard sections configuration
  const dashboardSections = [
    {
      title: "Demographics & Workforce",
      icon: <FiUsers className="w-5 h-5" />,
      cards: [
        {
          id: "DemographicAgeGender",
          component: <DemographicAgeGender />,
          size: "large",
        },
        {
          id: "DemographicNationalMarital",
          component: <DemographicNationalMarital />,
          size: "large",
        },
        {
          id: "AddressDistributionCard",
          component: <AddressDistributionCard />,
          size: "medium",
        },
      ],
    },
    {
      title: "Verification & Compliance",
      icon: <FiShield className="w-5 h-5" />,
      cards: [
        { id: "ValidPan", component: <ValidPan />, size: "small" },
        { id: "ValidAdhaar", component: <ValidAdhaar />, size: "small" },
        { id: "ValidPassport", component: <ValidPassport />, size: "small" },
        {
          id: "ComplianceTrainingCoverageCard",
          component: <ComplianceTrainingCoverageCard />,
          size: "large",
        },
        {
          id: "StreamliningVerificationChart",
          component: <StreamliningVerificationChart />,
          size: "medium",
        },
      ],
    },
    {
      title: "Performance & Analytics",
      icon: <TfiBarChartAlt className="w-5 h-5" />,
      cards: [
        {
          id: "PerformanceCard",
          component: <PerformanceCard />,
          size: "large",
        },
        {
          id: "PerformanceTrendsCard",
          component: <PerformanceTrendsCard />,
          size: "large",
        },
        {
          id: "GrievanceResolutionChart",
          component: <GrievanceResolutionChart />,
          size: "medium",
        },
        {
          id: "WorkplaceHotspotsChart",
          component: <WorkplaceHotspotsChart />,
          size: "medium",
        },
      ],
    },
    {
      title: "Training & Development",
      icon: <FiBookOpen className="w-5 h-5" />,
      cards: [
        {
          id: "TrainingNeedsCard",
          component: <TrainingNeedsCard />,
          size: "medium",
        },
        {
          id: "TrainingEffectivenessCard",
          component: <TrainingEffectivenessCard />,
          size: "large",
        },
        {
          id: "CorrelationTrainingPerformanceCard",
          component: <CorrelationTrainingPerformanceCard />,
          size: "large",
        },
      ],
    },
    {
      title: "Financial & Compensation",
      icon: <FiDollarSign className="w-5 h-5" />,
      cards: [
        {
          id: "CompensationBenchmarkingCard",
          component: <CompensationBenchmarkingCard />,
          size: "large",
        },
        { id: "CTCChartCard", component: <CTCChartCard />, size: "large" },
        {
          id: "OvertimeCostAnalysisCard",
          component: <OvertimeCostAnalysisCard />,
          size: "medium",
        },
      ],
    },
    {
      title: "Operations & Management",
      icon: <FiTarget className="w-5 h-5" />,
      cards: [
        {
          id: "StaffingOptimizationCard",
          component: <StaffingOptimizationCard />,
          size: "large",
        },
        {
          id: "AbsenteeismPatternsCard",
          component: <AbsenteeismPatternsCard />,
          size: "medium",
        },
        {
          id: "DisciplinaryAnalysisCard",
          component: <DisciplinaryAnalysisCard />,
          size: "medium",
        },
        {
          id: "InternalMobilityTrendsCard",
          component: <InternalMobilityTrendsCard />,
          size: "large",
        },
        {
          id: "HighPotentialEmployeesTrendsCard",
          component: <HighPotentialEmployeesTrendsCard />,
          size: "large",
        },
      ],
    },
  ];

  const getSizeClasses = (size) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1";
      case "medium":
        return "col-span-1 md:col-span-2 row-span-1";
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-3 row-span-1";
      default:
        return "col-span-1";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title Section */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <MdDashboard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Comprehensive HR analytics and insights
                </p>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "masonry"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>

              {/* Customize Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openModal}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-lg transition-all duration-200 font-medium"
              >
                <FiSettings className="w-4 h-4" />
                <span>{hasPrefs ? "Edit Layout" : "Customize"}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {dashboardSections.map((section, sectionIndex) => {
            const visibleCards = section.cards.filter((card) =>
              shouldShow(card.id)
            );

            if (visibleCards.length === 0) return null;

            return (
              <motion.div
                key={section.title}
                variants={cardVariants}
                className="space-y-6"
              >
                {/* Section Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="p-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    {section.title}
                  </h2>
                  <div className="h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 flex-1" />
                </div>

                {/* Cards Grid */}
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {visibleCards.map((card, cardIndex) => (
                    <motion.div
                      key={card.id}
                      variants={cardVariants}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className={`
                        ${viewMode === "grid" ? getSizeClasses(card.size) : ""}
                        bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl 
                        transition-all duration-300 border border-slate-100 dark:border-slate-700
                        hover:border-blue-200 dark:hover:border-blue-600
                        overflow-hidden group
                      `}
                    >
                      <div className="p-1">{card.component}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <CustomizeDashboardModal onClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
