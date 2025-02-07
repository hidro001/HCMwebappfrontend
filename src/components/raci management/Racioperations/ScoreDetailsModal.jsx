// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const ScoreDetailsModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   // Convert key success factors into data for Recharts
//   const ksfData = Object.keys(selectedScore.keySuccessFactors).map((factor) => ({
//     name: factor,
//     score: selectedScore.keySuccessFactors[factor] * 10,
//   }));

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow max-w-xl w-full relative max-h-[80%] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-red-500 font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h4 className="text-xl font-bold mb-2">
//           Score Details
//         </h4>

//         <p>
//           <strong>Date: </strong>
//           {new Date(selectedScore.date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Overall Score: </strong>
//           {(selectedScore.overallScore * 10).toFixed(2)}%
//         </p>

//         {/* Metrics Table */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Metrics</h5>
//         <table className="w-full border-collapse text-left mb-4">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Metric</th>
//               <th className="p-2">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedScore.metrics.map((metric, index) => (
//               <tr key={index} className="border-b last:border-none">
//                 <td className="p-2">{metric.metric}</td>
//                 <td className="p-2">{metric.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Key Success Factors */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Key Success Factors</h5>
//         <ul className="list-disc list-inside mb-4">
//           {Object.keys(selectedScore.keySuccessFactors).map((factor, idx) => (
//             <li key={idx}>
//               <strong>{factor}:</strong>{" "}
//               {selectedScore.keySuccessFactors[factor].toFixed(2)}
//             </li>
//           ))}
//         </ul>

//         {/* KSF Chart */}
//         <div className="p-2 border rounded dark:border-gray-700 dark:bg-gray-900">
//           <h2 className="text-lg font-semibold mb-2">
//             Key Success Factors Graph
//           </h2>
//           <div style={{ width: "100%", height: 400 }}>
//             <ResponsiveContainer>
//               <BarChart
//                 data={ksfData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="score" fill="#8cc01d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Optional close button at bottom */}
//         <button
//           className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ScoreDetailsModal;


// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import BaseModal from "../../common/BaseModal"; 

// const ScoreDetailsModal = ({ selectedScore, onClose }) => {
//   if (!selectedScore) return null;

//   // Convert key success factors into data for Recharts
//   const ksfData = Object.keys(selectedScore.keySuccessFactors).map((factor) => ({
//     name: factor,
//     score: selectedScore.keySuccessFactors[factor] * 10,
//   }));

//   return (
//     <BaseModal isOpen={true} onClose={onClose}>
//       <div
//         className="bg-white dark:bg-gray-800 text-black dark:text-white
//                    p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
//                    overflow-y-auto"
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-red-500 font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h4 className="text-xl font-bold mb-2">Score Details</h4>

//         <p>
//           <strong>Date: </strong>
//           {new Date(selectedScore.date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Overall Score: </strong>
//           {(selectedScore.overallScore * 10).toFixed(2)}%
//         </p>

//         {/* Metrics Table */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Metrics</h5>
//         <table className="w-full border-collapse text-left mb-4">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Metric</th>
//               <th className="p-2">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedScore.metrics.map((metric, index) => (
//               <tr key={index} className="border-b last:border-none">
//                 <td className="p-2">{metric.metric}</td>
//                 <td className="p-2">{metric.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Key Success Factors */}
//         <h5 className="text-lg mt-3 mb-2 font-semibold">Key Success Factors</h5>
//         <ul className="list-disc list-inside mb-4">
//           {Object.keys(selectedScore.keySuccessFactors).map((factor, idx) => (
//             <li key={idx}>
//               <strong>{factor}:</strong>{" "}
//               {selectedScore.keySuccessFactors[factor].toFixed(2)}
//             </li>
//           ))}
//         </ul>

//         {/* KSF Chart */}
//         <div className="p-2 border rounded dark:border-gray-700 dark:bg-gray-900">
//           <h2 className="text-lg font-semibold mb-2">
//             Key Success Factors Graph
//           </h2>
//           <div style={{ width: "100%", height: 400 }}>
//             <ResponsiveContainer>
//               <BarChart
//                 data={ksfData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="score" fill="#8cc01d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Optional close button at bottom */}
//         <button
//           className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </BaseModal>
//   );
// };

// export default ScoreDetailsModal;


import React from "react";
import BaseModal from "../../common/BaseModal";

// 1) Import Chart.js and react-chartjs-2:
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 2) Register Chart.js components:
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreDetailsModal = ({ selectedScore, onClose }) => {
  if (!selectedScore) return null;

  // Convert key success factors into data for Chart.js
  // ksfData = [{ name: 'factorName', score: numericValue }, ... ]
  const ksfData = Object.keys(selectedScore.keySuccessFactors).map((factor) => ({
    name: factor,
    score: selectedScore.keySuccessFactors[factor] * 10, // 0-100 scale
  }));

  // Build Chart.js data
  const chartJsData = {
    labels: ksfData.map((item) => item.name),
    datasets: [
      {
        label: "Score",
        data: ksfData.map((item) => item.score),
        backgroundColor: "#8cc01d",
      },
    ],
  };

  // Chart.js options
  const chartJsOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100, // same domain as Recharts: [0, 100]
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        // optional: add custom tooltip settings here
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div
        className="bg-white dark:bg-gray-800 text-black dark:text-white
                   p-4 rounded shadow max-w-xl w-full relative max-h-[80%]
                   overflow-y-auto"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-red-500 font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h4 className="text-xl font-bold mb-2">Score Details</h4>

        <p>
          <strong>Date: </strong>
          {new Date(selectedScore.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Overall Score: </strong>
          {(selectedScore.overallScore * 10).toFixed(2)}%
        </p>

        {/* Metrics Table */}
        <h5 className="text-lg mt-3 mb-2 font-semibold">Metrics</h5>
        <table className="w-full border-collapse text-left mb-4">
          <thead>
            <tr className="border-b">
              <th className="p-2">Metric</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {selectedScore.metrics.map((metric, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="p-2">{metric.metric}</td>
                <td className="p-2">{metric.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Key Success Factors */}
        <h5 className="text-lg mt-3 mb-2 font-semibold">Key Success Factors</h5>
        <ul className="list-disc list-inside mb-4">
          {Object.keys(selectedScore.keySuccessFactors).map((factor, idx) => (
            <li key={idx}>
              <strong>{factor}:</strong>{" "}
              {selectedScore.keySuccessFactors[factor].toFixed(2)}
            </li>
          ))}
        </ul>

        {/* Chart.js Bar Chart for KSF */}
        <div className="p-2 border rounded dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-2">
            Key Success Factors Graph
          </h2>
          {/* Provide a fixed height for the chart container */}
          <div style={{ width: "100%", height: 400 }}>
            <Bar data={chartJsData} options={chartJsOptions} />
          </div>
        </div>

        {/* Optional close button at bottom */}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
};

export default ScoreDetailsModal;
