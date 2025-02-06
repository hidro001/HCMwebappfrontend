// import React from "react";
// import IndustryPerformanceTable from "./components/IndustryPerformanceTable";
// import BusinessPerformanceTable from "./components/BusinessPerformanceTable";
// import KeyPerformanceMetrics from "./components/KeyPerformanceMetrics";
// import RaciBusinessChart from "./components/RACIChart";
// import PreviousScores from "./components/PreviousScores";
// import { motion } from "framer-motion";

// const RaciBusiness = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       {/* Animate page fade-in using Framer Motion */}
//       <motion.div
//         // Make one column by default, two columns at md, three columns at lg
//         className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {/* LEFT SECTION: spans 2 columns on md & lg */}
//         <div className="md:col-span-2 lg:col-span-2 grid gap-4">
//           <IndustryPerformanceTable />
//           <BusinessPerformanceTable />
//         </div>

//         {/* RIGHT SECTION: spans 1 column on lg; 2 columns on md so it’s full width at medium */}
//         <div className="md:col-span-2 lg:col-span-1 grid gap-4">
//           <KeyPerformanceMetrics />
//           <RaciBusinessChart />
//         </div>

//         {/* FULL-WIDTH SECTION: spans all columns */}
//         <div className="md:col-span-2 lg:col-span-3">
//           <PreviousScores />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default RaciBusiness;

import React from "react";
import { motion } from "framer-motion";
import IndustryPerformanceTable from "./components/IndustryPerformanceTable";
import BusinessPerformanceTable from "./components/BusinessPerformanceTable";
import KeyPerformanceMetrics from "./components/KeyPerformanceMetrics";
import RaciBusinessChart from "./components/RACIChart";
import PreviousScores from "./components/PreviousScores";

const RaciBusiness = () => {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 p-4 ">
      {/* Animate page fade-in using Framer Motion */}
      <motion.div
        className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="md:col-span-2 grid  h-fit">
          <IndustryPerformanceTable />
          <BusinessPerformanceTable />
          <RaciBusinessChart />
        </div>

   
        <div className="md:col-span-1 grid gap-4  h-fit">
          <KeyPerformanceMetrics />
          <PreviousScores />
        </div>

       
      </motion.div>
    </div>
  );
};

export default RaciBusiness;
