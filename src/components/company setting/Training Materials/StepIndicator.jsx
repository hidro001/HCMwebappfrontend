// import React from "react";
// import { FaCheck } from "react-icons/fa";

// const stepsConfig = [
//   { step: 1, label: "Select Company" },
//   { step: 2, label: "Select Module" },
//   { step: 3, label: "View Materials" },
// ];

// export default function StepIndicator({ currentStep }) {
//   return (
//     <div className="relative mb-8">
//       {/* 1) The single horizontal line behind all circles */}
//       <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 h-0.5 z-0" />

//       {/* 2) Steps container with equal spacing */}
//       <div className="relative flex justify-between items-center">
//         {stepsConfig.map(({ step, label }, index) => {
//           const isActive = currentStep === step;
//           const isComplete = currentStep > step;

//           return (
//             <div
//               key={step}
//               className="relative z-10 flex flex-col items-center text-center"
//             >
//               {/* 3) Step circle */}
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-1
//                   ${
//                     isComplete
//                       ? "border-green-500 bg-green-500 text-white"
//                       : isActive
//                       ? "border-blue-500 bg-white dark:bg-gray-900 text-blue-500"
//                       : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-900 text-gray-600"
//                   }
//                 `}
//               >
//                 {isComplete ? <FaCheck /> : step}
//               </div>

//               {/* 4) Label */}
//               <span
//                 className={`text-xs ${
//                   isActive
//                     ? "text-blue-500 dark:text-blue-400 font-semibold"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaBuilding, FaBookOpen, FaFileAlt } from "react-icons/fa";
import { HiOfficeBuilding, HiCollection, HiDocumentText } from "react-icons/hi";

const stepsConfig = [
  { 
    step: 1, 
    label: "Select Company",
    shortLabel: "Company",
    icon: HiOfficeBuilding,
    color: "blue",
    description: "Choose your organization"
  },
  { 
    step: 2, 
    label: "Select Module",
    shortLabel: "Module", 
    icon: HiCollection,
    color: "green",
    description: "Pick a training module"
  },
  { 
    step: 3, 
    label: "View Materials",
    shortLabel: "Materials",
    icon: HiDocumentText,
    color: "purple",
    description: "Access training content"
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 100
    }
  }
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export default function StepIndicator({ currentStep }) {
  const getProgressWidth = () => {
    if (currentStep === 1) return "0%";
    if (currentStep === 2) return "50%";
    if (currentStep === 3) return "100%";
    return "0%";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative mb-8 px-4"
    >
      {/* Background line */}
      <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 left-8 right-8">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        
        {/* Progress line */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full origin-left"
          initial={{ width: "0%" }}
          animate={{ width: getProgressWidth() }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Steps container */}
      <div className="relative flex justify-between items-center">
        {stepsConfig.map(({ step, label, shortLabel, icon: Icon, color, description }, index) => {
          const isActive = currentStep === step;
          const isComplete = currentStep > step;
          const isPending = currentStep < step;

          return (
            <motion.div
              key={step}
              variants={stepVariants}
              className="relative z-10 flex flex-col items-center text-center max-w-xs"
            >
              {/* Step circle with enhanced styling */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 mb-3 transition-all duration-300 shadow-lg ${
                  isComplete
                    ? `border-${color}-500 bg-${color}-500 text-white shadow-${color}-500/30`
                    : isActive
                    ? `border-${color}-500 bg-white dark:bg-gray-800 text-${color}-500 shadow-${color}-500/20`
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {/* Animated background for active step */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-${color}-100 dark:bg-${color}-900/20 rounded-full`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Icon or check/step number */}
                <div className="relative z-10">
                  {isComplete ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <FaCheck className="text-lg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Icon className="text-xl" />
                    </motion.div>
                  )}
                </div>

                {/* Pulse animation for active step */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-${color}-500 rounded-full opacity-20`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0, 0.2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* Step information */}
              <div className="space-y-1">
                {/* Step number badge */}
                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-1 ${
                  isComplete
                    ? `bg-${color}-100 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-300`
                    : isActive
                    ? `bg-${color}-100 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-300`
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {step}
                </div>

                {/* Label */}
                <motion.h3
                  className={`font-semibold transition-colors duration-200 ${
                    isActive
                      ? `text-${color}-600 dark:text-${color}-400`
                      : isComplete
                      ? `text-${color}-700 dark:text-${color}-300`
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                </motion.h3>

                {/* Description */}
                <motion.p
                  className={`text-xs transition-colors duration-200 hidden md:block ${
                    isActive
                      ? `text-${color}-500 dark:text-${color}-400`
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  {description}
                </motion.p>

                {/* Status indicator */}
                <motion.div
                  className="flex items-center justify-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                >
                  {isComplete && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300`}>
                      ✓ Complete
                    </span>
                  )}
                  {isActive && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 dark:bg-${color}-900/20 text-${color}-800 dark:text-${color}-300`}>
                      ● Active
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      ○ Pending
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress summary */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Step {currentStep} of {stepsConfig.length}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {Math.round(((currentStep - 1) / (stepsConfig.length - 1)) * 100)}% Complete
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}