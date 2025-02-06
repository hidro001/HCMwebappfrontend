import React from "react";
import { motion } from "framer-motion";
import IndustryPerformanceTable from "./IndustryPerformanceTable";
import BusinessPerformanceTable from "./BusinessPerformanceTable";
import KeyPerformanceMetrics from "./KeyPerformanceMetrics";
import RaciBusinessChart from "./RACIChart";
import PreviousScores from "./PreviousScores";

const RaciOperations = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="font-black text-3xl py-2">RACI Operational KPI Assessment</h1>
   
      <motion.div
        className="container mx-auto 
                   grid grid-cols-1 gap-4 
                   sm:grid-cols-2 
                   lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
          <div className="overflow-x-auto">
            <IndustryPerformanceTable />
          </div>

          <div className="overflow-x-auto">
            <BusinessPerformanceTable />
          </div>

          <div className="overflow-x-auto">
            <RaciBusinessChart />
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1 space-y-4">
          <div className="overflow-x-auto">
            <KeyPerformanceMetrics />
          </div>

          <div className="overflow-x-auto">
            <PreviousScores />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RaciOperations;
