

// import React, { useState } from 'react';
// import { FaInfoCircle, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// const HelpSection = ({
//   title = "Page Help",
//   description = "This page provides helpful information and guidance.",
//   icon = FaInfoCircle,
//   defaultExpanded = false,
//   className = ""
// }) => {
//   const [isVisible, setIsVisible] = useState(defaultExpanded);
//   const IconComponent = icon;

//   const toggleHelp = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className={`w-full rounded-2xl ${className} `}>
//       {/* Help Strip */}
//       <div className="transition-all duration-300 ease-in-out overflow-hidden">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="transition-all duration-300 ease-in-out">
//             {/* Toggle Button - Top Right */}
//             <div className="flex justify-end py-3">
//               <button 
//                 onClick={toggleHelp}
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
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
//             <div className={` w-full rounded-2xl transition-all duration-300 ease-in-out  ${
//               isVisible 
//                 ? 'max-h-96 opacity-100 translate-y-0 ' 
//                 : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none pb-0'
//             }`}>
//               <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//                 {/* Icon and Title */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//                     <IconComponent className="text-blue-600 dark:text-blue-400 text-lg" />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900 dark:text-white">
//                     {title}
//                   </h4>
//                 </div>
                
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


// import React, { useState } from 'react';
// import { FaInfoCircle, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// const HelpSection = ({
//   title = "Page Help",
//   description = "This page provides helpful information and guidance.",
//   icon = FaInfoCircle,
//   defaultExpanded = false,
//   className = "",
//   dropdownMode = false // New prop to handle dropdown usage
// }) => {
//   const [isVisible, setIsVisible] = useState(defaultExpanded);
//   const IconComponent = icon;

//   const toggleHelp = () => {
//     setIsVisible(!isVisible);
//   };

//   // If in dropdown mode, render just the content card
//   if (dropdownMode) {
//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//         {/* Icon and Title */}
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//             <IconComponent className="text-blue-600 dark:text-blue-400 text-lg" />
//           </div>
//           <h4 className="text-xl font-bold text-gray-900 dark:text-white">
//             {title}
//           </h4>
//         </div>
        
//         {/* Description */}
//         <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
//           {description}
//         </p>

//         {/* Quick Tips */}
//         <div className="space-y-2">
//           <h5 className="font-semibold text-gray-800 dark:text-gray-200">Quick Tips:</h5>
//           <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
//             <li>Use the tabs above to navigate between different sections</li>
//             <li>Click on any tab to switch views quickly</li>
//             <li>Use horizontal scroll or arrow buttons when tabs overflow</li>
//             <li>This help section provides context-specific guidance for this page</li>
//           </ul>
//         </div>
//       </div>
//     );
//   }

//   // Original full mode with toggle functionality
//   return (
//     <div className={`w-full rounded-2xl ${className}`}>
//       {/* Help Strip */}
//       <div className="transition-all duration-300 ease-in-out overflow-hidden">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="transition-all duration-300 ease-in-out">
//             {/* Toggle Button - Top Right */}
//             <div className="flex justify-end py-3">
//               <button 
//                 onClick={toggleHelp}
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
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
//             <div className={`w-full rounded-2xl transition-all duration-300 ease-in-out ${
//               isVisible 
//                 ? 'max-h-96 opacity-100 translate-y-0' 
//                 : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none pb-0'
//             }`}>
//               <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//                 {/* Icon and Title */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//                     <IconComponent className="text-blue-600 dark:text-blue-400 text-lg" />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900 dark:text-white">
//                     {title}
//                   </h4>
//                 </div>
                
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
  className = "",
  dropdownMode = false, // New prop to handle dropdown usage
  quickTips = [] // New prop for dynamic quick tips
}) => {
  const [isVisible, setIsVisible] = useState(defaultExpanded);
  const IconComponent = icon;

  const toggleHelp = () => {
    setIsVisible(!isVisible);
  };

  // If in dropdown mode, render just the content card
  if (dropdownMode) {
    return (
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
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>

        {/* Quick Tips */}
        {quickTips && quickTips.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200">Quick Tips:</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {quickTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Original full mode with toggle functionality
  return (
    <div className={`w-full rounded-2xl ${className}`}>
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
            <div className={`w-full rounded-2xl transition-all duration-300 ease-in-out ${
              isVisible 
                ? 'max-h-96 opacity-100 translate-y-0' 
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {description}
                </p>

                {/* Quick Tips */}
                {quickTips && quickTips.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200">Quick Tips:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {quickTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;