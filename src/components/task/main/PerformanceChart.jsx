


// import React, { useEffect } from "react";
// import { useDashboardStore } from "../../../store/useDashboardStore";

// function PerformanceChart() {
//   const { topDesignations, fetchTopDesignations } = useDashboardStore();

//   // Fetch top designations when the component mounts.
//   useEffect(() => {
//     // Change the month/year as needed.
//     fetchTopDesignations(1, 2025);
//   }, [fetchTopDesignations]);

//   // Default colors to cycle through.
//   const defaultColors = ["orange-500", "blue-500", "green-500", "amber-500"];

//   return (
//     <div
//       className="
//         w-full 
//         rounded-xl
//         shadow-2xl
//         bg-lime-50 dark:bg-lime-900
//         bg-opacity-60
//         p-4
//         text-gray-800 dark:text-gray-100
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-base sm:text-lg font-semibold text-lime-600 dark:text-lime-400">
//           Top Rated Designations
//         </h2>
//         {/* Icon / Options Button */}
//         <button
//           className="
//             text-gray-400 hover:text-gray-600
//             dark:text-gray-300 dark:hover:text-gray-100
//           "
//           aria-label="Performance options"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 sm:h-6 sm:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <circle cx="5" cy="12" r="1"></circle>
//             <circle cx="12" cy="12" r="1"></circle>
//             <circle cx="19" cy="12" r="1"></circle>
//           </svg>
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

//       {/* Designations & Bars */}
//       <div className="flex flex-col space-y-4">
//         {topDesignations && topDesignations.length > 0 ? (
//           topDesignations.map((item, index) => {
//             // Convert average rating (assumed out of 5) to percentage.
//             const percentage = `${(item.averageRating / 5) * 100}%`;
//             const color = defaultColors[index % defaultColors.length];

//             return (
//               <div key={item.designation}>
//                 <div className="flex justify-between text-sm font-medium mb-1">
//                   <span>{item.designation}</span>
//                   <span>
//                     {item.averageRating} ({item.totalRatings} ratings)
//                   </span>
//                 </div>
//                 {/* Progress bar */}
//                 <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
//                   <div
//                     className={`absolute left-0 top-0 h-3 rounded-full bg-${color}`}
//                     style={{ width: percentage }}
//                   ></div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div>No top rated designations found</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PerformanceChart;





import React, { useEffect } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore";
import { 
  FaTrophy, 
  FaStar, 
  FaChartLine, 
  FaEllipsisH,
  FaAward,
  FaMedal,
  FaCrown,
  FaGem
} from "react-icons/fa";

function PerformanceChart() {
  const { topDesignations, fetchTopDesignations } = useDashboardStore();

  // Fetch top designations when the component mounts.
  useEffect(() => {
    // Change the month/year as needed.
    fetchTopDesignations(1, 2025);
  }, [fetchTopDesignations]);

  // Enhanced color configurations with gradients
  const colorConfigs = [
    {
      gradient: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-600 dark:text-orange-400",
      icon: FaTrophy
    },
    {
      gradient: "from-blue-400 to-blue-600", 
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600 dark:text-blue-400",
      icon: FaAward
    },
    {
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-500/10 dark:bg-green-500/20", 
      borderColor: "border-green-500/30",
      textColor: "text-green-600 dark:text-green-400",
      icon: FaMedal
    },
    {
      gradient: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      borderColor: "border-amber-500/30", 
      textColor: "text-amber-600 dark:text-amber-400",
      icon: FaGem
    }
  ];

  // Get appropriate icon for ranking
  const getRankIcon = (index) => {
    if (index === 0) return FaCrown;
    if (index === 1) return FaTrophy;
    if (index === 2) return FaMedal;
    return FaAward;
  };

  return (
    <div className="w-full bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-lime-50/80 dark:from-gray-800/90 dark:via-gray-700/80 dark:to-gray-800/90 backdrop-blur-sm border border-emerald-200/30 dark:border-gray-600/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
            <FaChartLine className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent">
              Top Rated Designations
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">Performance rankings</p>
          </div>
        </div>
        
        {/* Options Button */}
        <button
          className="p-2 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300 hover:scale-105"
          aria-label="Performance options"
        >
          <FaEllipsisH className="text-sm" />
        </button>
      </div>

      {/* Elegant Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-emerald-200 dark:via-gray-600 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-700 px-3">
            <FaStar className="text-emerald-400 text-xs animate-pulse" />
          </div>
        </div>
      </div>

      {/* Designations & Performance Bars */}
      <div className="space-y-5">
        {topDesignations && topDesignations.length > 0 ? (
          topDesignations.map((item, index) => {
            // Convert average rating (assumed out of 5) to percentage.
            const percentage = (item.averageRating / 5) * 100;
            const config = colorConfigs[index % colorConfigs.length];
            const RankIcon = getRankIcon(index);
            const ItemIcon = config.icon;

            return (
              <div 
                key={item.designation}
                className="group animate-fade-in-up hover:scale-102 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Desktop View */}
                <div className="hidden sm:block">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
                          <RankIcon className={`${config.textColor} text-sm`} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {item.designation}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Rank #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {item.averageRating}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ({item.totalRatings} reviews)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-200/80 dark:bg-gray-700/80 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out shadow-sm animate-pulse`}
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="h-full bg-white/20 rounded-full animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="absolute right-2 top-0 bottom-0 flex items-center">
                      <span className="text-xs font-medium text-white/90 drop-shadow-sm">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden">
                  <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border ${config.borderColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${config.bgColor} ${config.borderColor} border`}>
                          <ItemIcon className={`${config.textColor} text-lg`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                            {item.designation}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <RankIcon className={`${config.textColor} text-xs`} />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Rank #{index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {item.averageRating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.totalRatings} reviews
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Performance</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200/80 dark:bg-gray-700/80 rounded-full overflow-hidden shadow-inner">
                        <div
                          className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out animate-pulse`}
                          style={{ width: `${percentage}%` }}
                        >
                          <div className="h-full bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <FaChartLine className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No Performance Data
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Top rated designations will appear here
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default PerformanceChart;