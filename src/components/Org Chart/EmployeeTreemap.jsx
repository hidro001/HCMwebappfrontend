import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiGrid, FiZap } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import OrgChart from "./OrgChart";

function EmployeeTreemap() {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const chartContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className=" 
                  "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={headerVariants}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Employee
            <span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 
                           bg-clip-text text-transparent ml-3"
            >
              Hierarchy
            </span>
          </motion.h1>
        </motion.div>

        {/* Chart Container */}
        <motion.div
          className="relative"
          variants={chartContainerVariants}
          style={{ perspective: 1000 }}
        >
          {/* Chart wrapper with enhanced styling */}
          <motion.div
            className="relative min-h-[600px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <OrgChart />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EmployeeTreemap;
