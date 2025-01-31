import  { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
// import { FaFilePdf, FaFileCsv, FaPrint, FaSearch, FaEye } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { AiOutlinePlus } from "react-icons/ai";
// import useAssetStore from "../../../store/useAssetStore";
// import AssetGroupModal from "./AssetGroupModal";
// import ViewAssetGroupsModal from "./ViewAssetGroupsModal";
// import AssignAssetModal from "./AssignAssetModal";
// import ViewAssignedAssetsModal from "./ViewAssignedAssetsModal";
// import { motion } from "framer-motion";

// const tableContainerVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 5 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function AssignAssetsPage() {
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [assignModalOpen, setAssignModalOpen] = useState(false);
//   const [viewAssignedModalOpen, setViewAssignedModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const {
//     subordinates,
//     getSubordinates,
//     loadingSubordinates,
//     errorSubordinates,
//   } = useAssetStore();

//   const userId = localStorage.getItem("mongo_id");

//   useEffect(() => {
//     if (userId) {
//       getSubordinates(userId);
//     }
//   }, [userId, getSubordinates]);

//   const filtered = subordinates.filter((emp) => {
//     const matchesSearch =
//       searchValue === "" ||
//       `${emp.first_Name} ${emp.last_Name}`
//         .toLowerCase()
//         .includes(searchValue.toLowerCase()) ||
//       emp.employee_Id.toLowerCase().includes(searchValue.toLowerCase());
//     const matchesDept =
//       selectedDepartment === "All" ||
//       (emp.department &&
//         emp.department.toLowerCase() === selectedDepartment.toLowerCase());
//     return matchesSearch && matchesDept;
//   });

//   const departmentsList = Array.from(
//     new Set(subordinates.map((s) => s.department || ""))
//   ).filter(Boolean);

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleOpenAssignModal = (employee) => {
//     setSelectedEmployee(employee);
//     setAssignModalOpen(true);
//   };

//   const handleOpenViewAssignedModal = (employee) => {
//     setSelectedEmployee(employee);
//     setViewAssignedModalOpen(true);
//   };

//   if (loadingSubordinates) {
//     return <div className="p-4">Loading subordinates...</div>;
//   }

//   if (errorSubordinates) {
//     return (
//       <div className="p-4 text-red-600">
//         Failed to fetch subordinates: {errorSubordinates}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <h1 className="text-xl font-semibold">Assign Assets</h1>
//       </div>
//       <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <label className="text-sm font-medium">Show</label>
//               <select
//                 value={pageSize}
//                 onChange={(e) => {
//                   setPageSize(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select>
//             </div>
//             <div className="relative w-64">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
//                 <FaSearch />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 w-full"
//                 value={searchValue}
//                 onChange={(e) => {
//                   setSearchValue(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//             <div>
//               <select
//                 className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
//                 value={selectedDepartment}
//                 onChange={(e) => {
//                   setSelectedDepartment(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               >
//                 <option value="All">All Departments</option>
//                 {departmentsList.map((dept) => (
//                   <option key={dept} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center gap-2">
//               <button
//                 className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white rounded shadow-sm text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
//                 onClick={() => setIsViewModalOpen(true)}
//               >
//                 <FaEye className="mr-2" size={16} />
//                 View Assets Group
//               </button>
//               <button
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white rounded shadow-sm text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 <AiOutlinePlus className="mr-2" size={16} />
//                 Add Asset Group
//               </button>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="hover:opacity-75 transition">
//                 <FaPrint size={16} className="text-teal-500" />
//               </button>
//               <button className="hover:opacity-75 transition">
//                 <FaFilePdf size={16} className="text-red-500" />
//               </button>
//               <button className="hover:opacity-75 transition">
//                 <FaFileCsv size={16} className="text-green-600" />
//               </button>
//               <button className="hover:opacity-75 transition">
//                 <MdOutlineFileDownload size={16} className="text-blue-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <table className="w-full text-left min-w-max">
//           <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
//             <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Employee ID</th>
//               <th className="py-3 px-4">Employee Name</th>
//               <th className="py-3 px-4">Department</th>
//               <th className="py-3 px-4 text-center">Assign Asset</th>
//               <th className="py-3 px-4 text-center">View Assigned Assets</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((emp, idx) => {
//                 const serialNumber = (currentPage - 1) * pageSize + (idx + 1);
//                 return (
//                   <motion.tr
//                     key={emp._id}
//                     variants={tableRowVariants}
//                     className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
//                   >
//                     <td className="py-3 px-4">
//                       {String(serialNumber).padStart(2, "0")}
//                     </td>
//                     <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
//                       #{emp.employee_Id}
//                     </td>
//                     <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
//                       {emp.first_Name} {emp.last_Name}
//                     </td>
//                     <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
//                       {emp.department || "—"}
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() => handleOpenAssignModal(emp)}
//                       >
//                         <AiOutlinePlus className="mr-1" size={14} />
//                         Assign Asset
//                       </button>
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="inline-flex items-center bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 hover:bg-blue-900 text-xs font-semibold px-3 py-1 rounded transition-colors"
//                         onClick={() => handleOpenViewAssignedModal(emp)}
//                       >
//                         <FaEye className="mr-1" size={14} />
//                         View Assigned
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="py-4 px-4 text-center text-sm text-gray-500"
//                 >
//                   No matching records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {paginatedData.length > 0 && (
//           <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
//             <div>
//               Showing {paginatedData.length} of {filtered.length} entries
//             </div>
//             <div className="flex items-center space-x-1 mt-2 md:mt-0">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-1 rounded border transition-colors ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   }`}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//       <AssetGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//       <ViewAssetGroupsModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
//       {selectedEmployee && (
//         <AssignAssetModal
//           isOpen={assignModalOpen}
//           onClose={() => setAssignModalOpen(false)}
//           employeeId={selectedEmployee._id}
//           employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
//         />
//       )}
//       {selectedEmployee && (
//         <ViewAssignedAssetsModal
//           isOpen={viewAssignedModalOpen}
//           onClose={() => setViewAssignedModalOpen(false)}
//           employeeId={selectedEmployee._id}
//           employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
//         />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileCsv, FaPrint, FaSearch, FaEye } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import useAssetStore from "../../../store/useAssetStore";

import AssetGroupModal from "./AssetGroupModal";
import ViewAssetGroupsModal from "./ViewAssetGroupsModal";
import AssignAssetModal from "./AssignAssetModal";
import ViewAssignedAssetsModal from "./ViewAssignedAssetsModal";

// Framer Motion Variants
const tableContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

// Skeleton component for table rows
function TableBodySkeleton({ rowCount, colCount }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: colCount }).map((_, colIndex) => (
            <td key={colIndex} className="py-3 px-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function AssignAssetsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [viewAssignedModalOpen, setViewAssignedModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    subordinates,
    getSubordinates,
    loadingSubordinates,
    errorSubordinates,
  } = useAssetStore();

  const userId = localStorage.getItem("mongo_id");

  useEffect(() => {
    if (userId) {
      getSubordinates(userId);
    }
  }, [userId, getSubordinates]);

  // NOTE: We remove the direct "if (loadingSubordinates) return ..." block
  // because we now want to show the table with a skeleton instead.
  /*
  if (loadingSubordinates) {
    return <div className="p-4">Loading subordinates...</div>;
  }
  */

  if (errorSubordinates) {
    return (
      <div className="p-4 text-red-600">
        Failed to fetch subordinates: {errorSubordinates}
      </div>
    );
  }

  // Filter Logic
  const filtered = subordinates.filter((emp) => {
    const matchesSearch =
      searchValue === "" ||
      `${emp.first_Name} ${emp.last_Name}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      emp.employee_Id.toLowerCase().includes(searchValue.toLowerCase());

    const matchesDept =
      selectedDepartment === "All" ||
      (emp.department &&
        emp.department.toLowerCase() === selectedDepartment.toLowerCase());

    return matchesSearch && matchesDept;
  });

  // Department List
  const departmentsList = Array.from(
    new Set(subordinates.map((s) => s.department || ""))
  ).filter(Boolean);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modals
  const handleOpenAssignModal = (employee) => {
    setSelectedEmployee(employee);
    setAssignModalOpen(true);
  };

  const handleOpenViewAssignedModal = (employee) => {
    setSelectedEmployee(employee);
    setViewAssignedModalOpen(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assign Assets</h1>
      </div>

      <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Show</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 dark:border-gray-700 rounded pl-8 pr-3 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900 w-full"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div>
              <select
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Departments</option>
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white rounded shadow-sm text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                onClick={() => setIsViewModalOpen(true)}
              >
                <FaEye className="mr-2" size={16} />
                View Assets Group
              </button>
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white rounded shadow-sm text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <AiOutlinePlus className="mr-2" size={16} />
                Add Asset Group
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="hover:opacity-75 transition">
                <FaPrint size={16} className="text-teal-500" />
              </button>
              <button className="hover:opacity-75 transition">
                <FaFilePdf size={16} className="text-red-500" />
              </button>
              <button className="hover:opacity-75 transition">
                <FaFileCsv size={16} className="text-green-600" />
              </button>
              <button className="hover:opacity-75 transition">
                <MdOutlineFileDownload size={16} className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Employee ID</th>
              <th className="py-3 px-4">Employee Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4 text-center">Assign Asset</th>
              <th className="py-3 px-4 text-center">View Assigned Assets</th>
            </tr>
          </thead>
          <tbody>
            {/* If loading, show skeleton. Otherwise, show data or "No records." */}
            {loadingSubordinates ? (
              <TableBodySkeleton rowCount={pageSize} colCount={6} />
            ) : paginatedData.length > 0 ? (
              paginatedData.map((emp, idx) => {
                const serialNumber =
                  (currentPage - 1) * pageSize + (idx + 1);
                return (
                  <motion.tr
                    key={emp._id}
                    variants={tableRowVariants}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <td className="py-3 px-4">
                      {String(serialNumber).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                      #{emp.employee_Id}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
                      {emp.first_Name} {emp.last_Name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
                      {emp.department || "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
                        onClick={() => handleOpenAssignModal(emp)}
                      >
                        <AiOutlinePlus className="mr-1" size={14} />
                        Assign Asset
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="inline-flex items-center bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 hover:bg-blue-900 text-xs font-semibold px-3 py-1 rounded transition-colors"
                        onClick={() => handleOpenViewAssignedModal(emp)}
                      >
                        <FaEye className="mr-1" size={14} />
                        View Assigned
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 px-4 text-center text-sm text-gray-500"
                >
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {!loadingSubordinates && paginatedData.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              Showing {paginatedData.length} of {filtered.length} entries
            </div>
            <div className="flex items-center space-x-1 mt-2 md:mt-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AssetGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ViewAssetGroupsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      {selectedEmployee && (
        <AssignAssetModal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          employeeId={selectedEmployee._id}
          employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
        />
      )}
      {selectedEmployee && (
        <ViewAssignedAssetsModal
          isOpen={viewAssignedModalOpen}
          onClose={() => setViewAssignedModalOpen(false)}
          employeeId={selectedEmployee._id}
          employeeName={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
        />
      )}
    </div>
  );
}

