

// import React from 'react';
// import FilterChip from './FilterChip';

// function FilterPanel({ filters, handleFilterClick, handleClearAll }) {
//   return (
//     <div
//       className="overflow-y-auto pr-2 "
//       style={{ maxHeight: 'calc(80vh - 100px)' }} // adjust the value as needed
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//         <button
//           onClick={handleClearAll}
//           className="text-blue-500 text-sm underline"
//         >
//           CLEAR ALL
//         </button>
//       </div>
//       {/* Department */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Department</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Department',
//             'Development',
//             'Sales & Marketing',
//             'Project Management',
//             'Support',
//             'Analytics & Data',
//           ].map((dept) => (
//             <FilterChip
//               key={dept}
//               label={dept}
//               selected={filters.department === dept}
//               onClick={() => handleFilterClick('department', dept)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Position Type */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Position Type</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'All Positions',
//             'UX/UI Designer',
//             'PM',
//             'React Developer',
//             'QA',
//             'Data Analyst',
//             'Backend Java Developer',
//             'DevOps',
//             'Python Django Developer',
//           ].map((posType) => (
//             <FilterChip
//               key={posType}
//               label={posType}
//               selected={filters.positionType === posType}
//               onClick={() => handleFilterClick('positionType', posType)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Work Experience */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Work Experience</h3>
//         <div className="flex flex-wrap gap-2">
//           {[
//             'Any Experience',
//             'Less than 1 year',
//             '1-2 years',
//             '2-3 years',
//             '3-5 years',
//             'More than 5 years',
//           ].map((we) => (
//             <FilterChip
//               key={we}
//               label={we}
//               selected={filters.workExperience === we}
//               onClick={() => handleFilterClick('workExperience', we)}
//             />
//           ))}
//         </div>
//       </div>
//       {/* Location */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Location</h3>
//         <div className="flex flex-wrap gap-2">
//           {['Any Location', 'United States', 'Ukraine', 'Germany', 'France', 'Remote'].map(
//             (loc) => (
//               <FilterChip
//                 key={loc}
//                 label={loc}
//                 selected={filters.location === loc}
//                 onClick={() => handleFilterClick('location', loc)}
//               />
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterPanel;



import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBuilding,
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaFilter,
  FaCheckCircle
} from 'react-icons/fa';
import {
  HiOfficeBuilding,
  HiBriefcase,
  HiClock,
  HiLocationMarker,
  HiX,
  HiCheck
} from 'react-icons/hi';
import FilterChip from './FilterChip';

function FilterPanel({ filters, handleFilterClick, handleClearAll }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const filterSections = [
    {
      title: 'Department',
      icon: HiOfficeBuilding,
      color: 'blue',
      filterKey: 'department',
      options: [
        'All Department',
        'Development',
        'Sales & Marketing',
        'Project Management',
        'Support',
        'Analytics & Data',
        'HR',
        'Finance',
        'Operations'
      ]
    },
    {
      title: 'Position Type',
      icon: HiBriefcase,
      color: 'green',
      filterKey: 'positionType',
      options: [
        'All Positions',
        'UX/UI Designer',
        'PM',
        'React Developer',
        'QA',
        'Data Analyst',
        'Backend Java Developer',
        'DevOps',
        'Python Django Developer',
        'Full Stack Developer',
        'Mobile Developer'
      ]
    },
    {
      title: 'Work Experience',
      icon: HiClock,
      color: 'purple',
      filterKey: 'workExperience',
      options: [
        'Any Experience',
        'Entry Level (0-1 years)',
        'Junior (1-2 years)',
        'Mid-Level (2-3 years)',
        'Senior (3-5 years)',
        'Expert (5+ years)',
        'Lead (7+ years)'
      ]
    },
    {
      title: 'Location',
      icon: HiLocationMarker,
      color: 'orange',
      filterKey: 'location',
      options: [
        'Any Location',
        'United States',
        'United Kingdom',
        'Germany',
        'France',
        'Canada',
        'Australia',
        'India',
        'Remote',
        'Hybrid'
      ]
    }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== 'All Department' && 
      value !== 'All Positions' && 
      value !== 'Any Experience' && 
      value !== 'Any Location'
    ).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-[58vh] flex flex-col "
    >
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FaFilter className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                </p>
              )}
            </div>
          </div>
          
          {activeFiltersCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 border border-red-200 dark:border-red-800"
            >
              <HiX className="text-xs" />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center space-x-2 mb-2">
              <HiCheck className="text-blue-600 dark:text-blue-400 text-sm" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Active Filters
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(filters).map(([key, value]) => {
                if (value === 'All Department' || value === 'All Positions' || 
                    value === 'Any Experience' || value === 'Any Location') return null;
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs"
                  >
                    <span>{value}</span>
                    <button
                      onClick={() => {
                        const defaultValues = {
                          department: 'All Department',
                          positionType: 'All Positions',
                          workExperience: 'Any Experience',
                          location: 'Any Location'
                        };
                        handleFilterClick(key, defaultValues[key]);
                      }}
                      className="hover:bg-blue-200 dark:hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <HiX className="text-xs" />
                    </button>
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Filter Sections */}
      <div 
        className="flex-1 overflow-y-auto pr-2 space-y-6    [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
        style={{ maxHeight: 'calc(80vh - 200px)' }}
      >
        <AnimatePresence>
          {filterSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={sectionVariants}
              className="space-y-3"
            >
              {/* Section Header */}
              <div className="flex items-center space-x-2 mb-3">
                <div className={`p-1.5 bg-${section.color}-100 dark:bg-${section.color}-900/20 rounded-lg`}>
                  <section.icon className={`text-${section.color}-600 dark:text-${section.color}-400 text-sm`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                {filters[section.filterKey] !== section.options[0] && (
                  <span className={`px-2 py-0.5 bg-${section.color}-100 dark:bg-${section.color}-900/20 text-${section.color}-700 dark:text-${section.color}-300 rounded text-xs font-medium`}>
                    Selected
                  </span>
                )}
              </div>

              {/* Filter Options */}
              <div className="space-y-2">
                {section.options.map((option) => (
                  <motion.div
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FilterChip
                      label={option}
                      selected={filters[section.filterKey] === option}
                      onClick={() => handleFilterClick(section.filterKey, option)}
                      color={section.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <motion.div
        variants={sectionVariants}
        className="flex-shrink-0 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Filters Applied
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {activeFiltersCount} of 4
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(activeFiltersCount / 4) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FilterPanel;