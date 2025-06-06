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
import useFeedStore from "../../../store/feedStore.js";

const baseCategories = [
  {
    name: "All Post",
    icon: HiSpeakerphone,
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    darkBg: "bg-gray-950/30",
  },
  {
    name: "General",
    icon: HiUsers,
    gradient: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    darkBg: "bg-blue-950/30",
  },
  {
    name: "New Hire",
    icon: HiUserAdd,
    gradient: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50",
    darkBg: "bg-purple-950/30",
  },
  {
    name: "SOP Updates",
    icon: HiClipboardList,
    gradient: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    darkBg: "bg-orange-950/30",
  },
  {
    name: "Policy Updates",
    icon: HiShieldCheck,
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    darkBg: "bg-pink-950/30",
  },
  {
    name: "Promotion",
    icon: HiTrendingUp,
    gradient: "from-yellow-500 to-amber-600",
    lightBg: "bg-yellow-50",
    darkBg: "bg-yellow-950/30",
  },
  {
    name: "Transfer",
    icon: HiSwitchHorizontal,
    gradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    darkBg: "bg-green-950/30",
  },
  {
    name: "Training",
    icon: HiAcademicCap,
    gradient: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50",
    darkBg: "bg-indigo-950/30",
  },
  {
    name: "Special",
    icon: HiStar,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    darkBg: "bg-violet-950/30",
  },
];

export default function CategoriesListCompact({ onCategoryChange }) {
  const feed = useFeedStore((state) => state.feed);

  const [categories, setCategories] = useState(baseCategories);
  const [selected, setSelected] = useState("All Post");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (!feed || feed.length === 0) {
      setCategories(baseCategories.map((cat) => ({ ...cat, count: 0 })));
      return;
    }

    const counts = baseCategories.reduce((acc, cat) => {
      acc[cat.name] = 0;
      return acc;
    }, {});

    feed.forEach((item) => {
      if (item.categories && counts.hasOwnProperty(item.categories)) {
        counts[item.categories]++;
      }
    });

    counts["All Post"] = feed.length;

    setCategories(
      baseCategories.map((cat) => ({
        ...cat,
        count: counts[cat.name] || 0,
      }))
    );
  }, [feed]);

  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(selected);
    }
  }, [selected]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full h-[50vh] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl dark:border-gray-700/50 select-none font-sans overflow-hidden rounded-xl border border-white/30 dark:border-gray-700"
    >
      {/* Background blur layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 h-[50vh] overflow-y-auto custom-scrollbar px-2 py-3">
        <ul className="space-y-2">
          <AnimatePresence>
            {categories.map(({ name, count, icon: Icon, gradient }, index) => {
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
                  className={`group relative flex items-center justify-between rounded-xl cursor-pointer p-3 transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                    isSelected
                      ? "dark:bg-slate-700 bg-slate-300 shadow-lg border border-gray-200/50 dark:border-gray-600/50"
                      : "hover:bg-gray-50/70 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-3 flex-1">
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
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </motion.div>
  );
}

