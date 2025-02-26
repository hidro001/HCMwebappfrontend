


import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepIndicator from "./StepIndicator";
import CompaniesList from "./CompaniesList";
import ModulesList from "./ModulesList";
import MaterialsList from "./MaterialsList";
import usePublicTrainingStore from "../../../store/usePublicTrainingStore";
import FullScreenLoader from "../../../components/common/FullScreenLoader";

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

export default function TrainingMaterials() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const {
    companies,
    modules,
    materials,
    loading,
    fetchCompanies,
    fetchModules,
    fetchMaterials,
  } = usePublicTrainingStore();

  // Step indicator logic
  let currentStep = 1;
  if (selectedCompany) currentStep = 2;
  if (selectedModule) currentStep = 3;

  // On mount, load companies
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // If user chooses a company, fetch modules for it
  const handleSelectCompany = (companyId) => {
    setSelectedCompany(companyId);
    setSelectedModule(null);
    fetchModules(companyId); // call the store's action
  };

  // If user chooses a module, fetch materials
  const handleSelectModule = (moduleId) => {
    setSelectedModule(moduleId);
    fetchMaterials(moduleId);
  };

  // Reset button
  const handleReset = () => {
    setSelectedCompany(null);
    setSelectedModule(null);
  };

  // Render step content
  const renderStepContent = () => {
    if (!selectedCompany) {
      // Step 1: Choose Company
      return (
        <motion.div
          key="step1"
          variants={stepVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="mt-8"
        >
          <CompaniesList companies={companies} onSelectCompany={handleSelectCompany} />
        </motion.div>
      );
    } else if (selectedCompany && !selectedModule) {
      // Step 2: Choose Module
      return (
        <motion.div
          key="step2"
          variants={stepVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="mt-8"
        >
          <ModulesList modules={modules} onSelectModule={handleSelectModule} />
        </motion.div>
      );
    } else {
      // Step 3: Materials
      return (
        <motion.div
          key="step3"
          variants={stepVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="mt-8"
        >
          <MaterialsList materials={materials} />
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white px-6 py-8">
      {/* Loader if any fetch is in progress */}
      {loading && <FullScreenLoader />}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Training Materials</h1>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Reset / Back Buttons */}
        <div className="mt-4 space-x-2">
          <button
            onClick={handleReset}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Restart
          </button>
          {selectedCompany && currentStep === 3 && (
            <button
              onClick={() => setSelectedModule(null)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Modules
            </button>
          )}
          {selectedCompany && currentStep === 2 && (
            <button
              onClick={() => setSelectedCompany(null)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Companies
            </button>
          )}
        </div>

        {/* Animated Step Container */}
        <div className="relative">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
