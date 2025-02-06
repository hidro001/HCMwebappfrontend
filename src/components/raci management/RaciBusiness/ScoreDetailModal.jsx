// import React from "react";
// import PerformanceBarChart from "./PerformanceBarChart";

// const ScoreDetailModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-xl w-full relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-red-500"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         {/* Header */}
//         <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
//           Score Details
//         </h4>

//         {/* Date */}
//         <p className="dark:text-white">
//           <strong>Date:</strong>{" "}
//           {new Date(selectedScore.date).toLocaleDateString()}
//         </p>

//         {/* Overall Score */}
//         <p className="dark:text-white">
//           <strong>Overall Score:</strong>{" "}
//           {(+selectedScore.overallScore).toFixed(2)}%
//         </p>

//         {/* Metrics Table */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
//           Metrics
//         </h5>
//         <table className="w-full border-collapse text-left mb-4">
//           <thead className="border-b">
//             <tr>
//               <th className="p-2">Metric</th>
//               <th className="p-2">Score (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedScore.metrics.map((metric, idx) => (
//               <tr key={idx} className="border-b last:border-none">
//                 <td className="p-2">{metric.category}</td>
//                 <td className="p-2">{metric.percentage}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Chart for Selected Score */}
//         <div className="h-64">
//           <PerformanceBarChart performanceData={selectedScore.metrics} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoreDetailModal;


// import React from "react";
// import PerformanceBarChart from "./PerformanceBarChart";
// import BaseModal from "../../common/BaseModal"; // Adjust your path to where BaseModal is

// const ScoreDetailModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-xl w-full relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-red-500"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         {/* Header */}
//         <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
//           Score Details
//         </h4>

//         {/* Date */}
//         <p className="dark:text-white">
//           <strong>Date:</strong>{" "}
//           {new Date(selectedScore.date).toLocaleDateString()}
//         </p>

//         {/* Overall Score */}
//         <p className="dark:text-white">
//           <strong>Overall Score:</strong>{" "}
//           {(+selectedScore.overallScore).toFixed(2)}%
//         </p>

//         {/* Metrics Table */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
//           Metrics
//         </h5>
//         <table className="w-full border-collapse text-left mb-4">
//           <thead className="border-b">
//             <tr>
//               <th className="p-2">Metric</th>
//               <th className="p-2">Score (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedScore.metrics.map((metric, idx) => (
//               <tr key={idx} className="border-b last:border-none">
//                 <td className="p-2">{metric.category}</td>
//                 <td className="p-2">{metric.percentage}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Chart for Selected Score */}
//         <div className="h-64">
//           <PerformanceBarChart performanceData={selectedScore.metrics} />
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default ScoreDetailModal;


import React from "react";
import PerformanceBarChart from "./PerformanceBarChart";
import BaseModal from "../../common/BaseModal"; // Adjust your path to where BaseModal is

const ScoreDetailModal = ({ selectedScore, onClose }) => {
  if (!selectedScore) return null;

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-xl w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Scrollable content container */}
        <div className="max-h-96 overflow-y-auto pr-2"> 
          {/* Header */}
          <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
            Score Details
          </h4>

          {/* Date */}
          <p className="dark:text-white">
            <strong>Date:</strong>{" "}
            {new Date(selectedScore.date).toLocaleDateString()}
          </p>

          {/* Overall Score */}
          <p className="dark:text-white">
            <strong>Overall Score:</strong>{" "}
            {(+selectedScore.overallScore).toFixed(2)}%
          </p>

          {/* Metrics Table */}
          <h5 className="text-lg mt-3 mb-2 font-semibold dark:text-white">
            Metrics
          </h5>
          <table className="w-full border-collapse text-left mb-4">
            <thead className="border-b">
              <tr>
                <th className="p-2">Metric</th>
                <th className="p-2">Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedScore.metrics.map((metric, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="p-2">{metric.category}</td>
                  <td className="p-2">{metric.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart for Selected Score */}
          <div className="h-96">
            <PerformanceBarChart performanceData={selectedScore.metrics} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ScoreDetailModal;
