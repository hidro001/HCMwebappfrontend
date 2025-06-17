// import React, { useEffect, useState } from "react";
// import { Switch } from "@headlessui/react";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

// export default function AttendancePolicies() {
//   const {
//     attendancePolicies,
//     monthsBetweenHikesOrAdvances,
//     fetchAttendancePolicies,
//     updateAttendancePolicies,
//   } = useCompanySettingsStore();

//   const [localPolicies, setLocalPolicies] = useState(attendancePolicies);
//   const [localMonths, setLocalMonths] = useState(monthsBetweenHikesOrAdvances);

//   useEffect(() => {
//     fetchAttendancePolicies();
//   }, [fetchAttendancePolicies]);

//   useEffect(() => {
//     setLocalPolicies(attendancePolicies);
//     setLocalMonths(monthsBetweenHikesOrAdvances);
//   }, [attendancePolicies, monthsBetweenHikesOrAdvances]);

//   const handleChange = (name, value) => {
//     setLocalPolicies((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSwitch = (name) => {
//     setLocalPolicies((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const handleSave = () => {
//     updateAttendancePolicies({
//       attendancePolicies: localPolicies,
//       monthsBetweenHikesOrAdvances: Number(localMonths),
//     });
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
//       <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
//         Attendance Policies
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Full Day Hours
//           </label>
//           <input
//             type="number"
//             value={localPolicies.fullDayHours ?? ""}
//             onChange={(e) => handleChange("fullDayHours", Number(e.target.value))}
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Maximum Leave Carryover
//           </label>
//           <input
//             type="number"
//             value={localPolicies.maximumLeaveCarryover ?? ""}
//             onChange={(e) =>
//               handleChange("maximumLeaveCarryover", Number(e.target.value))
//             }
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Half Day Hours
//           </label>
//           <input
//             type="number"
//             value={localPolicies.halfDayHours ?? ""}
//             onChange={(e) => handleChange("halfDayHours", Number(e.target.value))}
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Minimum Working Hours
//           </label>
//           <input
//             type="number"
//             value={localPolicies.minimumWorkingHours ?? ""}
//             onChange={(e) =>
//               handleChange("minimumWorkingHours", Number(e.target.value))
//             }
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Auto‐Absence Threshold
//           </label>
//           <input
//             type="number"
//             value={localPolicies.autoAbsenceThreshold ?? ""}
//             onChange={(e) =>
//               handleChange("autoAbsenceThreshold", Number(e.target.value))
//             }
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Months Between Hikes/Advances
//           </label>
//           <input
//             type="number"
//             value={localMonths ?? ""}
//             onChange={(e) => setLocalMonths(e.target.value)}
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div>
//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Grace  (Minutes)
//           </label>
//           <input
//             type="number"
//             value={localPolicies.gracePeriodMinutes ?? ""}
//             onChange={(e) =>
//               handleChange("gracePeriodMinutes", Number(e.target.value))
//             }
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           />
//         </div> */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//             Calculate Salary Based On
//           </label>
//           <select
//             value={localPolicies.calcSalaryBasedOn ?? "WORKING_DAYS"}
//             onChange={(e) => handleChange("calcSalaryBasedOn", e.target.value)}
//             className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//           >
//             <option value="WORKING_DAYS">Working Days in the Month</option>
//             <option value="CALENDAR_DAYS">Total Calendar Days in the Month</option>
//           </select>
//         </div>
//       </div>
//       <div className="flex space-x-8 mt-6">
//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//             Enable Overtime
//           </label>
//           <Switch
//             checked={localPolicies.enableOvertime ?? false}
//             onChange={() => handleSwitch("enableOvertime")}
//             className={`${
//               localPolicies.enableOvertime
//                 ? "bg-green-500"
//                 : "bg-gray-200 dark:bg-gray-700"
//             } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//           >
//             <span
//               className={`${
//                 localPolicies.enableOvertime ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//             />
//           </Switch>
//         </div>
//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//             Late Coming
//           </label>
//           <Switch
//             checked={localPolicies.enableLateComing ?? false}
//             onChange={() => handleSwitch("enableLateComing")}
//             className={`${
//               localPolicies.enableLateComing
//                 ? "bg-green-500"
//                 : "bg-gray-200 dark:bg-gray-700"
//             } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//           >
//             <span
//               className={`${
//                 localPolicies.enableLateComing ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//             />
//           </Switch>
//         </div>
//       </div>
//       {localPolicies.enableOvertime && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Overtime Rate Multiplier
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               value={localPolicies.overtimeRate ?? ""}
//               onChange={(e) => handleChange("overtimeRate", Number(e.target.value))}
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//               placeholder="e.g., 1.5"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Min Overtime Hours
//             </label>
//             <input
//               type="number"
//               value={localPolicies.overtimeEligibilityHours ?? ""}
//               onChange={(e) =>
//                 handleChange("overtimeEligibilityHours", Number(e.target.value))
//               }
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//               placeholder="e.g. 10"
//             />
//           </div>
//         </div>
//       )}
//       {localPolicies.enableLateComing && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Late Coming Grace Minutes
//             </label>
//             <input
//               type="number"
//               value={localPolicies.lateComingGraceMinutes ?? ""}
//               onChange={(e) =>
//                 handleChange("lateComingGraceMinutes", Number(e.target.value))
//               }
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//               placeholder="30"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Late Coming Penalty Type
//             </label>
//             <select
//               value={localPolicies.lateComingPenaltyType ?? "fixed"}
//               onChange={(e) => handleChange("lateComingPenaltyType", e.target.value)}
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//             >
//               <option value="percentage">Percentage</option>
//               <option value="fixed">Fixed</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Late Coming Penalty Value
//             </label>
//             <input
//               type="number"
//               value={localPolicies.lateComingPenaltyValue ?? ""}
//               onChange={(e) =>
//                 handleChange("lateComingPenaltyValue", Number(e.target.value))
//               }
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//               placeholder="e.g. 5"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//               Max Monthly Lateness Allowed
//             </label>
//             <input
//               type="number"
//               value={localPolicies.maxMonthlyLatenessAllowed ?? ""}
//               onChange={(e) =>
//                 handleChange("maxMonthlyLatenessAllowed", Number(e.target.value))
//               }
//               className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
//               placeholder="e.g. 3"
//             />
//           </div>
//         </div>
//       )}
//       <button
//         onClick={handleSave}
//         className="mt-6 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
//       >
//         Save
//       </button>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaCalendarAlt,
  FaUserClock,
  FaBusinessTime,
  FaExclamationTriangle,
  FaDollarSign,
  FaSave,
  FaToggleOn,
  FaToggleOff,
  FaCog,
  FaChartLine,
  FaHistory,
  FaStopwatch,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";


import { FaArrowTrendUp } from 'react-icons/fa6';
import {
  HiClock,
  HiCalendar,
  HiCurrencyDollar,
  HiExclamation,
  HiCog,
  HiTrendingUp
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

export default function AttendancePolicies() {
  const {
    attendancePolicies,
    monthsBetweenHikesOrAdvances,
    fetchAttendancePolicies,
    updateAttendancePolicies,
  } = useCompanySettingsStore();

  const [localPolicies, setLocalPolicies] = useState(attendancePolicies);
  const [localMonths, setLocalMonths] = useState(monthsBetweenHikesOrAdvances);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAttendancePolicies();
  }, [fetchAttendancePolicies]);

  useEffect(() => {
    setLocalPolicies(attendancePolicies);
    setLocalMonths(monthsBetweenHikesOrAdvances);
  }, [attendancePolicies, monthsBetweenHikesOrAdvances]);

  const handleChange = (name, value) => {
    setLocalPolicies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitch = (name) => {
    setLocalPolicies((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateAttendancePolicies({
        attendancePolicies: localPolicies,
        monthsBetweenHikesOrAdvances: Number(localMonths),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const inputFields = [
    {
      name: "fullDayHours",
      label: "Full Day Hours",
      icon: FaClock,
      color: "blue",
      placeholder: "8",
      description: "Number of hours required for a full working day"
    },
    {
      name: "halfDayHours", 
      label: "Half Day Hours",
      icon: FaStopwatch,
      color: "green",
      placeholder: "4",
      description: "Number of hours required for a half day"
    },
    {
      name: "minimumWorkingHours",
      label: "Minimum Working Hours",
      icon: FaUserClock,
      color: "purple",
      placeholder: "6",
      description: "Minimum hours an employee must work"
    },
    {
      name: "maximumLeaveCarryover",
      label: "Maximum Leave Carryover",
      icon: FaCalendarAlt,
      color: "indigo",
      placeholder: "10",
      description: "Maximum leave days that can be carried over"
    },
    {
      name: "autoAbsenceThreshold",
      label: "Auto-Absence Threshold",
      icon: FaExclamationTriangle,
      color: "red",
      placeholder: "2",
      description: "Hours below which attendance is marked as absent"
    }
  ];

  const overtimeFields = [
    {
      name: "overtimeRate",
      label: "Overtime Rate Multiplier",
      icon: FaArrowTrendUp ,
      placeholder: "1.5",
      step: "0.1",
      description: "Multiplier for overtime pay calculation"
    },
    {
      name: "overtimeEligibilityHours",
      label: "Min Overtime Hours",
      icon: FaBusinessTime,
      placeholder: "10",
      description: "Minimum hours to be eligible for overtime"
    }
  ];

  const lateComingFields = [
    {
      name: "lateComingGraceMinutes",
      label: "Late Coming Grace Minutes",
      icon: FaClock,
      placeholder: "30",
      description: "Grace period before marking as late"
    },
    {
      name: "lateComingPenaltyValue",
      label: "Late Coming Penalty Value",
      icon: FaMoneyBillWave,
      placeholder: "5",
      description: "Penalty amount for late coming"
    },
    {
      name: "maxMonthlyLatenessAllowed",
      label: "Max Monthly Lateness Allowed",
      icon: FaShieldAlt,
      placeholder: "3",
      description: "Maximum late days allowed per month"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <FaCog className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Attendance Policies
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Configure your company's attendance rules, overtime policies, and leave management settings
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Basic Policies Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <HiClock className="text-blue-600 dark:text-blue-400 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Basic Attendance Settings
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Define core attendance parameters for your organization
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inputFields.map((field) => (
                  <motion.div
                    key={field.name}
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                      <div className={`p-2 bg-${field.color}-100 dark:bg-${field.color}-900/20 rounded-lg`}>
                        <field.icon className={`text-${field.color}-600 dark:text-${field.color}-400`} />
                      </div>
                      <span>{field.label}</span>
                    </label>
                    <input
                      type="number"
                      value={localPolicies[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, Number(e.target.value))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {field.description}
                    </p>
                  </motion.div>
                ))}

                {/* Months Between Hikes */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-3"
                >
                  <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <FaHistory className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <span>Months Between Hikes/Advances</span>
                  </label>
                  <input
                    type="number"
                    value={localMonths ?? ""}
                    onChange={(e) => setLocalMonths(e.target.value)}
                    placeholder="12"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Period between salary hikes or advances
                  </p>
                </motion.div>

                {/* Salary Calculation */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-3"
                >
                  <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <HiCurrencyDollar className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span>Calculate Salary Based On</span>
                  </label>
                  <select
                    value={localPolicies.calcSalaryBasedOn ?? "WORKING_DAYS"}
                    onChange={(e) => handleChange("calcSalaryBasedOn", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                  >
                    <option value="WORKING_DAYS">Working Days in the Month</option>
                    <option value="CALENDAR_DAYS">Total Calendar Days in the Month</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Basis for salary calculation
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Policy Toggles Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <HiCog className="text-green-600 dark:text-green-400 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Policy Controls
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enable or disable specific attendance policies
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Overtime Toggle */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FaChartLine className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Enable Overtime
                      </label>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Allow overtime calculation and payments
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={localPolicies.enableOvertime ?? false}
                    onChange={() => handleSwitch("enableOvertime")}
                    className={`${
                      localPolicies.enableOvertime
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        localPolicies.enableOvertime ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </motion.div>

                {/* Late Coming Toggle */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <HiExclamation className="text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Late Coming Policy
                      </label>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Track and penalize late arrivals
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={localPolicies.enableLateComing ?? false}
                    onChange={() => handleSwitch("enableLateComing")}
                    className={`${
                      localPolicies.enableLateComing
                        ? "bg-red-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        localPolicies.enableLateComing ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Overtime Settings */}
          <AnimatePresence>
            {localPolicies.enableOvertime && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <HiTrendingUp className="text-blue-600 dark:text-blue-400 text-2xl" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Overtime Configuration
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Configure overtime rates and eligibility criteria
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {overtimeFields.map((field) => (
                      <motion.div
                        key={field.name}
                        whileHover={{ scale: 1.02 }}
                        className="space-y-3"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <field.icon className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span>{field.label}</span>
                        </label>
                        <input
                          type="number"
                          step={field.step || "1"}
                          value={localPolicies[field.name] ?? ""}
                          onChange={(e) => handleChange(field.name, Number(e.target.value))}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {field.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Late Coming Settings */}
          <AnimatePresence>
            {localPolicies.enableLateComing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-red-50 dark:bg-red-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <HiExclamation className="text-red-600 dark:text-red-400 text-2xl" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Late Coming Configuration
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Set up late arrival penalties and grace periods
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lateComingFields.map((field) => (
                      <motion.div
                        key={field.name}
                        whileHover={{ scale: 1.02 }}
                        className="space-y-3"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <field.icon className="text-red-600 dark:text-red-400" />
                          </div>
                          <span>{field.label}</span>
                        </label>
                        <input
                          type="number"
                          value={localPolicies[field.name] ?? ""}
                          onChange={(e) => handleChange(field.name, Number(e.target.value))}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {field.description}
                        </p>
                      </motion.div>
                    ))}

                    {/* Penalty Type Selector */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                          <FaDollarSign className="text-red-600 dark:text-red-400" />
                        </div>
                        <span>Late Coming Penalty Type</span>
                      </label>
                      <select
                        value={localPolicies.lateComingPenaltyType ?? "fixed"}
                        onChange={(e) => handleChange("lateComingPenaltyType", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Choose penalty calculation method
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Save Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-lg" />
                  <span>Save Attendance Policies</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}