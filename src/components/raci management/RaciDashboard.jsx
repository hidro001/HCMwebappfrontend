// import { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import "tailwindcss/tailwind.css";
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from "chart.js";

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

// const data = {
//   labels: ["Business Planning", "Leadership", "Profitability", "Marketing", "Personal Development", "Continuous Improvement", "Revenue Sales", "Employee Engagement", "Reduction in Inefficiencies", "Customer Service"],
//   datasets: [
//     {
//       label: "Score",
//       data: [10, 25, 40, 30, 50, 17, 45, 35, 60, 25],
//       borderColor: "#3b82f6",
//       borderWidth: 2,
//       tension: 0.4,
//       pointBackgroundColor: "#3b82f6",
//     },
//   ],
// };

// const RaciDashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">RACI Dashboard</h1>
//         <button 
//           onClick={() => setDarkMode(!darkMode)} 
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
//         >
//           Toggle Dark Mode
//         </button>
//       </div>

//       <motion.div 
//         className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">RACI Operations</h2>
//           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">Overall Score: 80%</span>
//         </div>
//         <Line data={data} />
//       </motion.div>

//       <motion.div 
//         className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-6" 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-xl font-semibold mb-4">RACI Operations Scores</h2>
//         <table className="w-full border-collapse bg-gray-50 dark:bg-gray-700">
//           <thead>
//             <tr className="bg-blue-500 text-white">
//               <th className="p-3">SNO.</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">Overall Score</th>
//               <th className="p-3">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[1, 2, 3, 4, 5].map((num) => (
//               <tr key={num} className="border-b hover:bg-gray-200 dark:hover:bg-gray-600 transition">
//                 <td className="p-3 text-center">{num}</td>
//                 <td className="p-3 text-center">02-12-2024</td>
//                 <td className="p-3 text-center">60.00%</td>
//                 <td className="p-3 text-center">
//                   <button 
//                     onClick={() => toast.success("Viewing details...")} 
//                     className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </motion.div>
//     </div>
//   );
// };

// export default RaciDashboard;


import { useState } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const operationsData = {
  labels: ["Business Planning", "Leadership", "Profitability", "Marketing", "Personal Development", "Continuous Improvement", "Revenue Sales", "Employee Engagement", "Reduction in Inefficiencies", "Customer Service"],
  datasets: [
    {
      label: "Operations Score",
      data: [10, 25, 40, 30, 50, 17, 45, 35, 60, 25],
      borderColor: "#3b82f6",
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: "#3b82f6",
    },
  ],
};

const businessData = {
  labels: ["Business Performance", "Business Risk", "Market Demand", "Customer Satisfaction", "Management Systems", "Continuous Improvement", "Sales Growth", "Innovation", "Employee Productivity", "Estate Planning"],
  datasets: [
    {
      label: "Business Score",
      data: [15, 30, 45, 35, 55, 17, 50, 40, 65, 30],
      borderColor: "#ef4444",
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: "#ef4444",
    },
  ],
};

const tableData = [
  { id: 1, date: "02-12-2024", score: "60.00%" },
  { id: 2, date: "02-12-2024", score: "60.00%" },
  { id: 3, date: "02-12-2024", score: "60.00%" },
  { id: 4, date: "02-12-2024", score: "60.00%" },
  { id: 5, date: "02-12-2024", score: "60.00%" },
];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">RACI Dashboard</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Toggle Dark Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">RACI Operations</h2>
          <Line data={operationsData} />
          <table className="w-full mt-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">SNO.</th>
                <th className="p-2">Date</th>
                <th className="p-2">Overall Score</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b border-gray-300">
                  <td className="p-2 text-center">{row.id}</td>
                  <td className="p-2 text-center">{row.date}</td>
                  <td className="p-2 text-center">{row.score}</td>
                  <td className="p-2 text-center">
                    <button className="px-3 py-1 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">RACI Business</h2>
          <Line data={businessData} />
          <table className="w-full mt-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">SNO.</th>
                <th className="p-2">Date</th>
                <th className="p-2">Overall Score</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b border-gray-300">
                  <td className="p-2 text-center">{row.id}</td>
                  <td className="p-2 text-center">{row.date}</td>
                  <td className="p-2 text-center">{row.score}</td>
                  <td className="p-2 text-center">
                    <button className="px-3 py-1 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
