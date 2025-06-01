import { useState } from "react";
import { motion } from "framer-motion";
import CategoriesListCompact from "./SynergyCategories";
import FilterFeed from "./FilterFeed";

export default function FilterTab({ onCategoryChange, onDepartmentChange, onSort }) {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 font-sans"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex border-b border-gray-300 dark:border-gray-700 mb-6">
        <motion.button
          onClick={() => setActiveTab("categories")}
          aria-selected={activeTab === "categories"}
          role="tab"
          className={`flex-1 py-3 font-semibold text-center transition-colors duration-300 rounded-tl-2xl ${
            activeTab === "categories"
              ? "border-b-4 border-blue-600 text-blue-600 bg-white dark:bg-gray-900"
              : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Categories
        </motion.button>

        <motion.button
          onClick={() => setActiveTab("filters")}
          aria-selected={activeTab === "filters"}
          role="tab"
          className={`flex-1 py-3 font-semibold text-center transition-colors duration-300 rounded-tr-2xl ${
            activeTab === "filters"
              ? "border-b-4 border-purple-600 text-purple-600 bg-white dark:bg-gray-900"
              : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Filters & Sort
        </motion.button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        role="tabpanel"
        className="relative z-10"
      >
        {activeTab === "categories" && (
          <CategoriesListCompact onCategoryChange={onCategoryChange} />
        )}
        {activeTab === "filters" && (
          <FilterFeed onDepartmentChange={onDepartmentChange} onSort={onSort} />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-b-2xl pointer-events-none"
      />
    </motion.div>
  );
}
