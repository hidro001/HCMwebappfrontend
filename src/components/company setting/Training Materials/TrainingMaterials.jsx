// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import StepIndicator from "./StepIndicator";
// import CompaniesList from "./CompaniesList";
// import ModulesList from "./ModulesList";
// import MaterialsList from "./MaterialsList";
// import usePublicTrainingStore from "../../../store/usePublicTrainingStore";
// import FullScreenLoader from "../../common/FullScreenLoader";

// const stepVariants = {
//   hidden: { opacity: 0, x: 20 },
//   enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//   exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
// };

// export default function TrainingMaterials() {
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);

//   const {
//     companies,
//     modules,
//     materials,
//     loading,
//     fetchCompanies,
//     fetchModules,
//     fetchMaterials,
//   } = usePublicTrainingStore();

//   // Step indicator logic
//   let currentStep = 1;
//   if (selectedCompany) currentStep = 2;
//   if (selectedModule) currentStep = 3;

//   // On mount, load companies
//   useEffect(() => {
//     fetchCompanies();
//   }, [fetchCompanies]);

//   // If user chooses a company, fetch modules for it
//   const handleSelectCompany = (companyId) => {
//     setSelectedCompany(companyId);
//     setSelectedModule(null);
//     fetchModules(companyId); // call the store's action
//   };

//   // If user chooses a module, fetch materials
//   const handleSelectModule = (moduleId) => {
//     setSelectedModule(moduleId);
//     fetchMaterials(moduleId);
//   };

//   // Reset button
//   const handleReset = () => {
//     setSelectedCompany(null);
//     setSelectedModule(null);
//   };

//   // Render step content
//   const renderStepContent = () => {
//     if (!selectedCompany) {
//       // Step 1: Choose Company
//       return (
//         <motion.div
//           key="step1"
//           variants={stepVariants}
//           initial="hidden"
//           animate="enter"
//           exit="exit"
//           className="mt-8"
//         >
//           <CompaniesList
//             companies={companies}
//             onSelectCompany={handleSelectCompany}
//           />
//         </motion.div>
//       );
//     } else if (selectedCompany && !selectedModule) {
//       // Step 2: Choose Module
//       return (
//         <motion.div
//           key="step2"
//           variants={stepVariants}
//           initial="hidden"
//           animate="enter"
//           exit="exit"
//           className="mt-8"
//         >
//           <ModulesList modules={modules} onSelectModule={handleSelectModule} />
//         </motion.div>
//       );
//     } else {
//       // Step 3: Materials
//       return (
//         <motion.div
//           key="step3"
//           variants={stepVariants}
//           initial="hidden"
//           animate="enter"
//           exit="exit"
//           className="mt-8"
//         >
//           <MaterialsList materials={materials} />
//         </motion.div>
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen dark:bg-gray-900 dark:text-white px-6 py-8">
//       {/* Loader if any fetch is in progress */}
//       {loading && <FullScreenLoader />}

//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">Training Materials</h1>

//         {/* Step Indicator */}
//         <StepIndicator currentStep={currentStep} />

//         {/* Reset / Back Buttons */}
//         <div className="mt-4 space-x-2">
//           <button
//             onClick={handleReset}
//             className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//           >
//             Restart
//           </button>
//           {selectedCompany && currentStep === 3 && (
//             <button
//               onClick={() => setSelectedModule(null)}
//               className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             >
//               Back to Modules
//             </button>
//           )}
//           {selectedCompany && currentStep === 2 && (
//             <button
//               onClick={() => setSelectedCompany(null)}
//               className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             >
//               Back to Companies
//             </button>
//           )}
//         </div>

//         {/* Animated Step Container */}
//         <div className="relative">
//           <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBuilding,
  FaBookOpen,
  FaFileAlt,
  FaArrowLeft,
  FaRedo,
  FaChevronRight,
  FaPlay,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import {
  HiAcademicCap,
  HiOfficeBuilding,
  HiBookOpen,
  HiDocumentText,
  HiArrowLeft,
  HiRefresh,
  HiChevronRight
} from "react-icons/hi";
import StepIndicator from "./StepIndicator";
import CompaniesList from "./CompaniesList";
import ModulesList from "./ModulesList";
import MaterialsList from "./MaterialsList";
import usePublicTrainingStore from "../../../store/usePublicTrainingStore";
import FullScreenLoader from "../../common/FullScreenLoader";

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  enter: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      type: "spring", 
      stiffness: 100 
    } 
  },
  exit: { 
    opacity: 0, 
    x: -50, 
    scale: 0.95, 
    transition: { 
      duration: 0.3 
    } 
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const stepData = [
  {
    id: 1,
    title: "Select Process",
    description: "Choose your Process",
    icon: HiOfficeBuilding,
    color: "blue"
  },
  {
    id: 2,
    title: "Choose Module",
    description: "Pick a training module",
    icon: HiBookOpen,
    color: "green"
  },
  {
    id: 3,
    title: "Access Materials",
    description: "View training content",
    icon: HiDocumentText,
    color: "purple"
  }
];

export default function TrainingMaterials() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    fetchModules(companyId);
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
    setSearchTerm("");
  };

  // Get current step info
  const getCurrentStepInfo = () => {
    return stepData.find(step => step.id === currentStep) || stepData[0];
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
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
                <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
            </div>
         
          </div>
          <CompaniesList
            companies={companies}
            onSelectCompany={handleSelectCompany}
          />
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
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-2xl">
                <HiBookOpen className="text-green-600 dark:text-green-400 text-3xl" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Training Module
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select a module to access its training materials and resources
              </p>
            </div>
          </div>
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
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-2xl">
                <HiDocumentText className="text-purple-600 dark:text-purple-400 text-3xl" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Training Materials
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Access your learning resources, documents, and training content
              </p>
            </div>
          </div>
          <MaterialsList materials={materials} />
        </motion.div>
      );
    }
  };

  const currentStepInfo = getCurrentStepInfo();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      {/* Loader if any fetch is in progress */}
      {loading && <FullScreenLoader />}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
              <HiAcademicCap className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Training Portal
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Access your organization's training materials, modules, and learning resources
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className={`bg-${currentStepInfo.color}-50 dark:bg-${currentStepInfo.color}-900/10 p-6 border-b border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${currentStepInfo.color}-100 dark:bg-${currentStepInfo.color}-900/20 rounded-xl`}>
                  <currentStepInfo.icon className={`text-${currentStepInfo.color}-600 dark:text-${currentStepInfo.color}-400 text-xl`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Step {currentStep}: {currentStepInfo.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentStepInfo.description}
                  </p>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center space-x-2">
                {stepData.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                      step.id <= currentStep
                        ? `bg-${currentStepInfo.color}-600 text-white`
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.id}
                    </div>
                    {index < stepData.length - 1 && (
                      <div className={`w-8 h-1 transition-all duration-200 ${
                        step.id < currentStep
                          ? `bg-${currentStepInfo.color}-600`
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Step Indicator */}
          {/* <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <StepIndicator currentStep={currentStep} />
          </div> */}

          {/* Navigation Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <HiRefresh className="text-sm" />
                <span>Restart Journey</span>
              </motion.button>

              {selectedCompany && currentStep === 3 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedModule(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <HiArrowLeft className="text-sm" />
                  <span>Back to Modules</span>
                </motion.button>
              )}

              {selectedCompany && currentStep === 2 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCompany(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <HiArrowLeft className="text-sm" />
                  <span>Back to Companies</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats/Info Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaBuilding className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Organizations</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {companies?.length || 0} companies available
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaBookOpen className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Training Modules</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCompany ? `${modules?.length || 0} modules` : 'Select Process first'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaFileAlt className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Learning Materials</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedModule ? `${materials?.length || 0} materials` : 'Select module first'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Breadcrumb Navigation */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">You are here:</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Training Portal</span>
            {selectedCompany && (
              <>
                <HiChevronRight className="text-gray-400" />
                <span className="text-green-600 dark:text-green-400 font-medium">Company Selected</span>
              </>
            )}
            {selectedModule && (
              <>
                <HiChevronRight className="text-gray-400" />
                <span className="text-purple-600 dark:text-purple-400 font-medium">Module Selected</span>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}