// // src/Main.js
// import { useState, useEffect } from "react";

// // For Chart.js
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";

// // Import API service functions
// import { fetchLineChartData, fetchDoughnutChartData, fetchPayrollList } from "../../../service/payrollService";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function Main() {


//   // State for line chart
//   const [lineChartData, setLineChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Payout",
//         data: [],
//         borderColor: "#3b82f6",
//         backgroundColor: "rgba(59,130,246,0.1)",
//         fill: true,
//         tension: 0.3,
//       },
//     ],
//   });

//   // State for doughnut chart
//   const [doughnutData, setDoughnutData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: ["#3b82f6", "#f97316"],
//         hoverBackgroundColor: ["#2563eb", "#ea580c"],
//       },
//     ],
//   });

//   // Payroll list state
//   const [payrollList, setPayrollList] = useState([]);

//   // On mount, fetch all dashboard data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Fetch line chart data for 2025
//         const lineData = await fetchLineChartData( 2025);
//         if (lineData) {
//           const { labels, payouts } = lineData;
//           setLineChartData((prev) => ({
//             ...prev,
//             labels,
//             datasets: [
//               {
//                 ...prev.datasets[0],
//                 data: payouts,
//               },
//             ],
//           }));
//         }

//         // Fetch doughnut chart data
//         const doughnutChartData = await fetchDoughnutChartData();
//         if (doughnutChartData) {
//           const { labels, values } = doughnutChartData;
//           setDoughnutData((prev) => ({
//             ...prev,
//             labels,
//             datasets: [
//               {
//                 ...prev.datasets[0],
//                 data: values,
//               },
//             ],
//           }));
//         }

//         // Fetch payroll list
//         const payrollListData = await fetchPayrollList();
//         if (payrollListData) {
//           setPayrollList(payrollListData);
//         }
//       } catch (error) {
//         console.error("Error loading dashboard data:", error);
//       }
//     };

//     loadData();
//   }, []);

//   // Chart options for line chart
//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: { mode: "index", intersect: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (val) => "₹" + val,
//         },
//       },
//     },
//   };

//   // Chart options for doughnut chart
//   const doughnutOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//     },
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 flex flex-col">
     

//       {/* Main Content Container */}
//       <div className="p-4 max-w-7xl mx-auto w-full flex-grow">
//         {/* Top Cards Row */}
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Left Card: Total Payout with line chart */}
//           <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Total Payout</h2>
//                 <p className="text-2xl font-bold mt-1 text-black dark:text-white">
//                   ₹{" "}
//                   {lineChartData.datasets[0].data
//                     .reduce((a, b) => a + b, 0)
//                     .toLocaleString()}
//                 </p>
//                 <p className="text-sm text-green-600 dark:text-green-400">
//                   +10% Total This Month
//                 </p>
//               </div>
//               <div>
//                 <select
//                   className="
//                     border border-gray-300 dark:border-gray-700
//                     rounded-md px-2 py-1 text-sm focus:outline-none
//                     dark:bg-gray-900 dark:text-white
//                   "
//                   defaultValue="Monthly"
//                 >
//                   <option>Monthly</option>
//                   <option>Yearly</option>
//                   <option>Weekly</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-4 h-48">
//               <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//           </div>

//           {/* Right Card: Doughnut Chart "Employee Overview" */}
//           <div className="
//             w-full md:w-1/3
//             bg-white dark:bg-gray-800
//             rounded-lg border border-gray-200 dark:border-gray-700
//             p-4 flex flex-col
//           ">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold">Employee Overview</h2>
//               <select
//                 className="
//                   border border-gray-300 dark:border-gray-700
//                   rounded-md px-2 py-1 text-sm focus:outline-none
//                   dark:bg-gray-900 dark:text-white
//                 "
//                 defaultValue="Month"
//               >
//                 <option>Month</option>
//                 <option>Year</option>
//               </select>
//             </div>
//             <div className="flex flex-col items-center justify-center mt-4 h-44">
//               <Doughnut data={doughnutData} options={doughnutOptions} />
//             </div>
//             <div className="flex gap-4 mt-3 text-sm justify-center">
//               <div className="flex items-center gap-1">
//                 <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
//                 <span>
//                   {doughnutData.labels[0]}:{" "}
//                   {doughnutData.datasets[0].data[0] || 0}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
//                 <span>
//                   {doughnutData.labels[1]}:{" "}
//                   {doughnutData.datasets[0].data[1] || 0}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payroll List Section */}
//         <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-lg font-bold">Payroll list</h2>
//             {/* <a
//               href="#"
//               className="flex items-center text-blue-600 dark:text-blue-300"
//             >
//               View All
//             </a> */}
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
//                   <th className="px-4 py-2 text-left font-semibold">Users</th>
//                   <th className="px-4 py-2 text-left font-semibold">Join Date</th>
//                   <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
//                   <th className="px-4 py-2 text-left font-semibold">Department</th>
//                   <th className="px-4 py-2 text-left font-semibold">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payrollList.map((item, i) => (
//                   <tr
//                     key={i}
//                     className="border-b last:border-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <td className="px-4 py-3 flex items-center gap-2">
//                       <div
//                         className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
//                         style={{ backgroundColor: item.avatarColor }}
//                       >
//                         {item.name.charAt(0)}
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-medium">{item.name}</span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           {item.email}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">{item.joinDate}</td>
//                     <td className="px-4 py-3">{item.empId}</td>
//                     <td className="px-4 py-3">{item.department}</td>
//                     <td className="px-4 py-3">
//                       <span className="
//                           inline-block px-2 py-1 text-xs font-semibold
//                           text-green-800 bg-green-100 rounded-md
//                           dark:bg-green-900 dark:text-green-100
//                         ">
//                         {item.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {payrollList.length === 0 && (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
//                       No payroll records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { 
  FiGrid, 
  FiList, 
  FiChevronLeft, 
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiUser,
  FiMail,
  FiCalendar,
  FiHash,
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
  FiFilter,
  FiDownload,
  FiSearch,
  FiZap,
  FiActivity,
  FiUsers,
  FiTarget,
  FiArrowUp,
  FiEye,
  FiMoreVertical
} from "react-icons/fi";

// For Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Import API service functions
import { fetchLineChartData, fetchDoughnutChartData, fetchPayrollList } from "../../../service/payrollService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Main() {
  // Chart data states
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Payout",
        data: [],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#6366f1",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
      },
    ],
  });

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        ],
      },
    ],
  });

  // Payroll list state
  const [payrollList, setPayrollList] = useState([]);
  const [filteredPayrollList, setFilteredPayrollList] = useState([]);
  
  // UI States
  const [viewMode, setViewMode] = useState('auto'); // 'table', 'card', 'auto'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-detect screen size for view mode
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('desktop');
      } else {
        setScreenSize('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current view based on mode and screen size
  const getCurrentView = () => {
    if (viewMode === 'auto') {
      return screenSize === 'desktop' ? 'table' : 'card';
    }
    return viewMode;
  };

  // Filter payroll list based on search
  useEffect(() => {
    const filtered = payrollList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.empId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayrollList(filtered);
    setCurrentPage(1);
  }, [payrollList, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPayrollList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPayrollList.slice(startIndex, endIndex);

  // Pagination helpers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch line chart data for 2025
        const lineData = await fetchLineChartData(2025);
        if (lineData) {
          const { labels, payouts } = lineData;
          setLineChartData((prev) => ({
            ...prev,
            labels,
            datasets: [
              {
                ...prev.datasets[0],
                data: payouts,
              },
            ],
          }));
        }

        // Fetch doughnut chart data
        const doughnutChartData = await fetchDoughnutChartData();
        if (doughnutChartData) {
          const { labels, values } = doughnutChartData;
          setDoughnutData((prev) => ({
            ...prev,
            labels,
            datasets: [
              {
                ...prev.datasets[0],
                data: values,
              },
            ],
          }));
        }

        // Fetch payroll list
        const payrollListData = await fetchPayrollList();
        if (payrollListData) {
          setPayrollList(payrollListData);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        mode: "index", 
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#6366f1',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          callback: (val) => "₹" + val.toLocaleString(),
          color: 'rgb(148, 163, 184)',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 10,
        },
      },
      x: {
        border: { display: false },
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 10,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#6366f1',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
      },
    },
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Loading Dashboard
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Preparing your workspace...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

      </div>

      {/* Main Content Container */}
      <div className="relative z-10 p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <FiZap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Welcome back! Here's what's happening with your team today.
          </p>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          {/* Left Card: Total Payout with line chart */}
          <div className="xl:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 p-8 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20 hover:shadow-3xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/30 transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                    <FiTrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Total Payout</h2>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Monthly Overview</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ₹{" "}
                    {lineChartData.datasets[0].data
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <FiArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">+12.5%</span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">vs last month</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl">
                  <FiFilter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <select className="bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                  <option>Monthly</option>
                  <option>Yearly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
            <div className="h-72 lg:h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-800/50 rounded-2xl"></div>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Right Card: Doughnut Chart "Employee Overview" */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 p-8 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 hover:shadow-3xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Team Overview</h2>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Active Members</div>
                </div>
              </div>
              <select className="bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative h-48 w-48">
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {doughnutData.datasets[0].data.reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {doughnutData.labels.map((label, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-2xl backdrop-blur transition-all hover:bg-slate-100/50 dark:hover:bg-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{
                      background: index === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                                 index === 1 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                 index === 2 ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                                 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                    }}></div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {doughnutData.datasets[0].data[index] || 0}
                    </span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {doughnutData.datasets[0].data[index] ? 
                        `${Math.round((doughnutData.datasets[0].data[index] / doughnutData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100)}%` 
                        : '0%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payroll List Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-500/10 dark:shadow-slate-500/20 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 p-8 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
                <FiBriefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Employee Directory</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {filteredPayrollList.length} active members
                  </span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative group">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full sm:w-80 placeholder-slate-400"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100/50 dark:bg-slate-700/50 backdrop-blur rounded-2xl p-1.5 border border-slate-200/50 dark:border-slate-600/50">
                <button
                  onClick={() => setViewMode('auto')}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    viewMode === 'auto' 
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-lg scale-105' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                  title="Auto Mode"
                >
                  <FiTarget className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-lg scale-105' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                  title="Table View"
                >
                  <FiList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    viewMode === 'card' 
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-lg scale-105' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                  title="Card View"
                >
                  <FiGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Export Button */}
              <button className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105 group">
                <FiDownload className="w-4 h-4 group-hover:animate-bounce" />
                <span className="hidden sm:block">Export Data</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {getCurrentView() === 'table' ? (
              /* Table View */
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <FiUser className="w-5 h-5 text-indigo-500" />
                          Employee Details
                        </div>
                      </th>
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <FiCalendar className="w-5 h-5 text-emerald-500" />
                          Join Date
                        </div>
                      </th>
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <FiHash className="w-5 h-5 text-purple-500" />
                          Employee ID
                        </div>
                      </th>
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <FiBriefcase className="w-5 h-5 text-blue-500" />
                          Department
                        </div>
                      </th>
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <FiActivity className="w-5 h-5 text-orange-500" />
                          Status
                        </div>
                      </th>
                      <th className="text-left py-6 px-4 font-bold text-slate-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, i) => (
                      <tr
                        key={i}
                        className="group border-b border-slate-100 dark:border-slate-800 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30 transition-all duration-300"
                      >
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                style={{ backgroundColor: item.avatarColor }}
                              >
                                {item.name.charAt(0)}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {item.name}
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                                <FiMail className="w-4 h-4" />
                                <span className="text-sm truncate">{item.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                              <FiCalendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{item.joinDate}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                              <FiHash className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                              {item.empId}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                              <FiBriefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{item.department}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="font-semibold text-sm">{item.status}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all">
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all">
                              <FiMoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Card View */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {currentItems.map((item, i) => (
                  <div
                    key={i}
                    className="group relative bg-gradient-to-br from-white/60 to-slate-50/60 dark:from-slate-700/60 dark:to-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-600/30 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 dark:from-indigo-400/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl"
                              style={{ backgroundColor: item.avatarColor }}
                            >
                              {item.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white dark:border-slate-700 shadow-lg"></div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                              <FiMail className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">{item.email}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Details Grid */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-600/30 rounded-2xl backdrop-blur">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                              <FiCalendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Join Date</span>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">{item.joinDate}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-600/30 rounded-2xl backdrop-blur">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                              <FiHash className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Emp ID</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                            {item.empId}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-600/30 rounded-2xl backdrop-blur">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                              <FiBriefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Department</span>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">{item.department}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-600/30 rounded-2xl backdrop-blur">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                              <FiActivity className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</span>
                          </div>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="font-semibold text-xs">{item.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-600/50">
                        <button className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl group/btn">
                          <FiEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredPayrollList.length === 0 && (
              <div className="text-center py-20">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center">
                    <FiUsers className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FiSearch className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No employees found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto">
                  {searchTerm ? 'Try adjusting your search criteria to find what you\'re looking for.' : 'No payroll records are currently available in the system.'}
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}

            {/* Ultra Modern Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-10 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl">
                    <FiActivity className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredPayrollList.length)} of {filteredPayrollList.length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* First Page */}
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-2xl bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <FiChevronsLeft className="w-4 h-4" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-2xl bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-2">
                    {getVisiblePages().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && goToPage(page)}
                        disabled={page === '...'}
                        className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                          page === currentPage
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-110'
                            : page === '...'
                            ? 'text-slate-400 cursor-default'
                            : 'bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 hover:shadow-lg'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Page */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-2xl bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-2xl bg-white/50 dark:bg-slate-700/50 backdrop-blur border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <FiChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}