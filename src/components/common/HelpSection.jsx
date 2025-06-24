// import React, { useState } from 'react';
// import { FaInfoCircle, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// const HelpSection = ({
//   title = "Page Help",
//   description = "This page provides helpful information and guidance.",
//   icon = FaInfoCircle,
//   defaultExpanded = true,
//   className = ""
// }) => {
//   const [isVisible, setIsVisible] = useState(defaultExpanded);
//   const IconComponent = icon;

//   const toggleHelp = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className={`w-full ${className}`}>
//       {/* Help Strip */}
//       <div className={`bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 transition-all duration-300 ease-in-out overflow-hidden ${
//         isVisible ? 'py-4' : 'py-2'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="transition-all duration-300 ease-in-out">
//             {/* Header with Toggle Button */}
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//                   <IconComponent className="text-blue-600 dark:text-blue-400 text-lg" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
//                   Page Help
//                 </h3>
//               </div>
//               <button 
//                 onClick={toggleHelp}
//                 className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
//               >
//                 {isVisible ? (
//                   <FaChevronUp className="text-xs" />
//                 ) : (
//                   <FaChevronDown className="text-xs" />
//                 )}
//                 <span>{isVisible ? 'Hide Help' : 'Show Help'}</span>
//               </button>
//             </div>

//             {/* Help Content */}
//             <div className={`transition-all duration-300 ease-in-out ${
//               isVisible 
//                 ? 'max-h-96 opacity-100 translate-y-0' 
//                 : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
//             }`}>
//               <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-blue-200 dark:border-blue-700">
//                 {/* Title */}
//                 <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                   {title}
//                 </h4>
                
//                 {/* Description */}
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HelpSection;

import React, { useState } from 'react';
import { FaInfoCircle, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const HelpSection = ({
  title = "Page Help",
  description = "This page provides helpful information and guidance.",
  icon = FaInfoCircle,
  defaultExpanded = false,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(defaultExpanded);
  const IconComponent = icon;

  const toggleHelp = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`w-full rounded-2xl ${className} `}>
      {/* Help Strip */}
      <div className="transition-all duration-300 ease-in-out overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-300 ease-in-out">
            {/* Toggle Button - Top Right */}
            <div className="flex justify-end py-3">
              <button 
                onClick={toggleHelp}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
              >
                {isVisible ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
                <span>{isVisible ? 'Hide Help' : 'Show Help'}</span>
              </button>
            </div>

            {/* Help Content */}
            <div className={` w-full rounded-2xl transition-all duration-300 ease-in-out  ${
              isVisible 
                ? 'max-h-96 opacity-100 translate-y-0 ' 
                : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none pb-0'
            }`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Icon and Title */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <IconComponent className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {title}
                  </h4>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;