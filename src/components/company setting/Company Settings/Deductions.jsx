// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
// import DeductionModal from "./models/DeductionModal";

// export default function Deductions() {
//   const {
//     deductions,
//     fetchDeductions,
//     addOrUpdateDeduction,
//     deleteDeduction,
//   } = useCompanySettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deductionName, setDeductionName] = useState("");
//   const [percentage, setPercentage] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchDeductions();
//   }, [fetchDeductions]);

//   const handleSave = () => {
//     if (!deductionName || percentage === "") {
//       toast.error("Please fill out all deduction fields.");
//       return;
//     }
//     const numericPercent = parseFloat(percentage);
//     if (numericPercent < 0 || numericPercent > 100) {
//       toast.error("Percentage must be between 0 and 100.");
//       return;
//     }
//     const payload = {
//       id: editId,
//       name: deductionName,
//       percentage: numericPercent,
//     };
//     addOrUpdateDeduction(payload);
//     setIsModalOpen(false);
//     setDeductionName("");
//     setPercentage("");
//     setEditId(null);
//   };

//   const handleEdit = (d) => {
//     setEditId(d.id);
//     setDeductionName(d.name);
//     setPercentage(d.percentage);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     deleteDeduction(id);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setDeductionName("");
//     setPercentage("");
//     setEditId(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Deductions
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Deduction
//         </button>
//       </div>
//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Percentage (%)</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {deductions.map((d) => (
//             <tr key={d.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{d.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{d.percentage}%</td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(d)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(d.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <DeductionModal
//         isOpen={isModalOpen}
//         editId={editId}
//         deductionName={deductionName}
//         percentage={percentage}
//         onDeductionNameChange={(e) => setDeductionName(e.target.value)}
//         onPercentageChange={(e) => setPercentage(e.target.value)}
//         onClose={handleCloseModal}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaMoneyBill,
  FaPercent,
  FaSearch,
  FaFilter,
  FaCalculator,
  FaChartPie,
  FaDollarSign,
  FaWallet,
  FaCreditCard,
  FaRegMoneyBillAlt
} from "react-icons/fa";
import {
  HiCash,
  HiPlus,
  HiPencil,
  HiTrash,
  HiCalculator,
  HiCurrencyDollar
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import DeductionModal from "./models/DeductionModal";

export default function Deductions() {
  const {
    deductions,
    fetchDeductions,
    addOrUpdateDeduction,
    deleteDeduction,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deductionName, setDeductionName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // cards or table

  useEffect(() => {
    fetchDeductions();
  }, [fetchDeductions]);

  const handleSave = () => {
    if (!deductionName || percentage === "") {
      toast.error("Please fill out all deduction fields.");
      return;
    }
    const numericPercent = parseFloat(percentage);
    if (numericPercent < 0 || numericPercent > 100) {
      toast.error("Percentage must be between 0 and 100.");
      return;
    }
    const payload = {
      id: editId,
      name: deductionName,
      percentage: numericPercent,
    };
    addOrUpdateDeduction(payload);
    setIsModalOpen(false);
    setDeductionName("");
    setPercentage("");
    setEditId(null);
  };

  const handleEdit = (d) => {
    setEditId(d.id);
    setDeductionName(d.name);
    setPercentage(d.percentage);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteDeduction(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeductionName("");
    setPercentage("");
    setEditId(null);
  };

  const calculateDeductionFromSalary = (percentage, sampleSalary = 50000) => {
    return (sampleSalary * percentage / 100).toLocaleString();
  };

  const getDeductionCategory = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('tax') || lowercaseName.includes('income')) return { icon: FaCalculator, color: 'red' };
    if (lowercaseName.includes('provident') || lowercaseName.includes('pf')) return { icon: FaWallet, color: 'blue' };
    if (lowercaseName.includes('insurance') || lowercaseName.includes('medical')) return { icon: FaRegMoneyBillAlt, color: 'green' };
    if (lowercaseName.includes('loan') || lowercaseName.includes('advance')) return { icon: FaCreditCard, color: 'orange' };
    return { icon: FaMoneyBill, color: 'purple' };
  };

  const filteredDeductions = deductions.filter(deduction =>
    deduction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDeductionPercentage = deductions.reduce((sum, d) => sum + d.percentage, 0);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
    

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaChartPie className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {deductions.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Deductions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <FaPercent className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalDeductionPercentage.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Percentage
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <HiCurrencyDollar className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${calculateDeductionFromSalary(totalDeductionPercentage)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deduction on $50K
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search deductions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Desktop only */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-red-600 dark:text-red-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-red-600 dark:text-red-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Deduction</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {filteredDeductions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaMoneyBill className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm ? "No deductions found" : "No Deductions Setup"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Start by adding your first salary deduction"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add First Deduction</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredDeductions.map((deduction) => {
                      const category = getDeductionCategory(deduction.name);
                      const DeductionIcon = category.icon;
                      return (
                        <motion.div
                          key={deduction.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className={`bg-${category.color}-50 dark:bg-${category.color}-900/10 p-6 border-b border-gray-100 dark:border-gray-700`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-3 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-lg`}>
                                  <DeductionIcon className={`text-${category.color}-600 dark:text-${category.color}-400 text-xl`} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {deduction.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Salary Deduction
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Percentage Display */}
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <FaPercent className={`text-${category.color}-600 dark:text-${category.color}-400`} />
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                  {deduction.percentage}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Deduction Rate
                              </p>
                            </div>

                            {/* Sample Calculations */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">On $30K salary:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  ${calculateDeductionFromSalary(deduction.percentage, 30000)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">On $50K salary:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  ${calculateDeductionFromSalary(deduction.percentage, 50000)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">On $100K salary:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  ${calculateDeductionFromSalary(deduction.percentage, 100000)}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(deduction)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil className="text-sm" />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(deduction.id)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiTrash className="text-sm" />
                                <span>Delete</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Table View - Desktop only when selected */}
              <div className={`hidden lg:${viewMode === "table" ? "block" : "hidden"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Deduction Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            On $50K Salary
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredDeductions.map((deduction) => {
                            const category = getDeductionCategory(deduction.name);
                            const DeductionIcon = category.icon;
                            return (
                              <motion.tr
                                key={deduction.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className={`p-2 bg-${category.color}-100 dark:bg-${category.color}-900/20 rounded-lg`}>
                                      <DeductionIcon className={`text-${category.color}-600 dark:text-${category.color}-400`} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {deduction.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                      {deduction.percentage}%
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                                  ${calculateDeductionFromSalary(deduction.percentage)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800 dark:bg-${category.color}-900/20 dark:text-${category.color}-300`}>
                                    {category.color === 'red' && 'Tax'}
                                    {category.color === 'blue' && 'Savings'}
                                    {category.color === 'green' && 'Insurance'}
                                    {category.color === 'orange' && 'Loan'}
                                    {category.color === 'purple' && 'Other'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleEdit(deduction)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(deduction.id)}
                                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiTrash className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <DeductionModal
        isOpen={isModalOpen}
        editId={editId}
        deductionName={deductionName}
        percentage={percentage}
        onDeductionNameChange={(e) => setDeductionName(e.target.value)}
        onPercentageChange={(e) => setPercentage(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </motion.div>
  );
}