// import  { useEffect, useState } from "react";

// const categories = [
//   { name: "All Announcement", count: 15, circleBg: "bg-green-100" },
//   { name: "General", count: 15, circleBg: "bg-yellow-100" },
//   { name: "New Hire", count: 15, circleBg: "bg-sky-100" },
//   { name: "SOP Updates", count: 15, circleBg: "bg-indigo-100" },
//   { name: "Policy Updates", count: 15, circleBg: "bg-slate-100" },
//   { name: "Promotion", count: 15, circleBg: "bg-yellow-100" },
//   { name: "Transfer", count: 15, circleBg: "bg-green-100" },
//   { name: "Training", count: 15, circleBg: "bg-green-100" },
//   { name: "Special", count: 15, circleBg: "bg-yellow-100" },
// ];

// export default function CategoriesListCompact({ onCategoryChange }) {

//   const [selected, setSelected] = useState("All Announcement");

//   useEffect(() => {
//    onCategoryChange(selected)
//   }, [selected])

//   return (
//     <div className="w-56 bg-white rounded-lg shadow-sm p-3 select-none font-sans">
//       <h3 className="font-semibold text-gray-900 mb-2 text-sm">Categories</h3>
//       <ul className="max-h-72 overflow-y-auto">
//         {categories.map(({ name, count, circleBg }) => {
//           const isSelected = selected === name;
//           return (
//             <li
//               key={name}
//               onClick={() => setSelected(name)}
//               className={`flex justify-between items-center  rounded-md cursor-pointer px-2 py-1 mb-1
//                 transition-colors duration-150 ease-in-out
//                 ${
//                   isSelected
//                     ? "bg-green-50 border border-green-100"
//                     : "hover:bg-green-100"
//                 }
//               `}
//             >
//               <span
//                 className={`flex items-center gap-2 text-xs font-normal ${
//                   isSelected ? "text-green-900" : "text-gray-900"
//                 }`}
//               >
//                 {name}
//               </span>

//               <span
//                 className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5
//                   ${
//                     isSelected
//                       ? "bg-green-300"
//                       : `${circleBg} hover:bg-green-300`
//                   }
//                 `}
//                >
//                 {count}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSpeakerphone,
  HiUsers,
  HiUserAdd,
  HiClipboardList,
  HiShieldCheck,
  HiTrendingUp,
  HiSwitchHorizontal,
  HiAcademicCap,
  HiStar,
  HiChevronRight,
} from "react-icons/hi";

const categories = [
  {
    name: "All Announcement",
    count: 15,
    icon: HiSpeakerphone,
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    darkBg: "bg-gray-950/30",
  },
  {
    name: "General",
    count: 12,
    icon: HiUsers,
    gradient: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    darkBg: "bg-blue-950/30",
  },
  {
    name: "New Hire",
    count: 8,
    icon: HiUserAdd,
    gradient: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50",
    darkBg: "bg-purple-950/30",
  },
  {
    name: "SOP Updates",
    count: 6,
    icon: HiClipboardList,
    gradient: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    darkBg: "bg-orange-950/30",
  },
  {
    name: "Policy Updates",
    count: 4,
    icon: HiShieldCheck,
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    darkBg: "bg-pink-950/30",
  },
  {
    name: "Promotion",
    count: 11,
    icon: HiTrendingUp,
    gradient: "from-yellow-500 to-amber-600",
    lightBg: "bg-yellow-50",
    darkBg: "bg-yellow-950/30",
  },
  {
    name: "Transfer",
    count: 7,
    icon: HiSwitchHorizontal,
    gradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    darkBg: "bg-green-950/30",
  },
  {
    name: "Training",
    count: 9,
    icon: HiAcademicCap,
    gradient: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50",
    darkBg: "bg-indigo-950/30",
  },
  {
    name: "Special",
    count: 3,
    icon: HiStar,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    darkBg: "bg-violet-950/30",
  },
];

export default function CategoriesListCompact({ onCategoryChange }) {
  const [selected, setSelected] = useState("All Announcement");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    onCategoryChange(selected);
  }, [selected]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 select-none font-sans overflow-hidden  "
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-bold text-gray-900 dark:text-gray-100 text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent brder"
        >
          Categories
        </motion.h3>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
        />
      </div>

      {/* Categories List */}
      <div className="relative z-10">
        <div
          className="max-h-svh overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2
           [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
        "
        >
          <AnimatePresence>
            {categories.map(
              (
                { name, count, icon: Icon, gradient, lightBg, darkBg },
                index
              ) => {
                const isSelected = selected === name;
                const isHovered = hoveredItem === name;

                return (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setSelected(name)}
                    onMouseEnter={() => setHoveredItem(name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative flex items-center justify-between rounded-xl cursor-pointer p-3 mb-2 transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                      isSelected
                        ? `dark:bg-slate-700 bg-slate-300 shadow-lg border border-gray-200/50 dark:border-gray-600/50`
                        : "hover:bg-gray-50/70 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          // className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                        />
                      )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="flex items-center gap-3 flex-1">
                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale: isSelected ? 1.1 : 1,
                          rotate: isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>

                      {/* Category Name */}
                      <span
                        className={`font-medium text-sm transition-colors duration-200 ${
                          isSelected
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                        }`}
                      >
                        {name}
                      </span>
                    </div>

                    {/* Count Badge */}
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{
                          scale: isSelected ? 1.05 : 1,
                          x: isHovered ? 2 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center justify-center min-w-[24px] h-6 text-xs font-bold rounded-full transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                        }`}
                      >
                        {count}
                      </motion.span>

                      {/* Arrow Indicator */}
                      <motion.div
                        animate={{
                          x: isSelected ? 0 : -4,
                          opacity: isSelected ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiChevronRight className="w-4 h-4 text-blue-500" />
                      </motion.div>
                    </div>

                    {/* Hover Effect */}
                    <AnimatePresence>
                      {isHovered && !isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-xl pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              }
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
      />
    </motion.div>
  );
}
