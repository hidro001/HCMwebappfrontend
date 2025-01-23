


// import React, { useEffect, useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   FaEdit,
//   FaEye,
//   FaTrash,
//   FaUsers,
//   FaUserCheck,
//   FaUserSlash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// // Import your Zustand store hook
// import useEmployeesStore from "../../store/useAllEmployeesStore";

// // Animation variants for container & rows
// const tableContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.05,
//     },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function EmployeeList() {
//   // Pull what you need from the store
//   const {
//     getAllEmployeesApi,       // fetches from API
//     filteredEmployees,        // automatically updated when searching
//     handleSearchChange,       // handle search input
//     totalEmployeeCount,       // returned by API or fallback to length
//     loading,                  // indicates API loading
//   } = useEmployeesStore();

//   // Local UI states
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate(); // Navigation hook

//   // Fetch employees on mount
//   useEffect(() => {
//     getAllEmployeesApi();
//   }, [getAllEmployeesApi]);

//   // Whenever searchText changes, call the store’s “handleSearchChange”
//   useEffect(() => {
//     handleSearchChange(searchText);
//     setCurrentPage(1);
//   }, [searchText, handleSearchChange]);

//   // Filter further by department in the component
//   const departmentFilteredData = useMemo(() => {
//     if (!departmentFilter || departmentFilter === "All") {
//       return filteredEmployees;
//     }
//     return filteredEmployees.filter(
//       (emp) => emp.department === departmentFilter
//     );
//   }, [filteredEmployees, departmentFilter]);

//   // Pagination
//   const totalPages = Math.ceil(departmentFilteredData.length / pageSize);
//   const paginatedEmployees = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return departmentFilteredData.slice(startIndex, startIndex + pageSize);
//   }, [departmentFilteredData, currentPage, pageSize]);

//   // For the top summary cards (active vs inactive, total, etc.)
//   const totalActive = filteredEmployees.filter((emp) => emp.isActive).length;
//   const totalInactive = filteredEmployees.filter((emp) => !emp.isActive).length;

//   return (
//     <div
//       className="
//          min-h-screen 
//         bg-gray-50 dark:bg-gray-900 
//         text-gray-700 dark:text-gray-100 
//         transition-colors
//       "
//     >
//       {/* Top Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {/* Total Employee */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Employee
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 flex items-center justify-center">
//               <FaUsers className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalEmployeeCount}
//           </div>
//           <div className="text-xs text-green-500 mt-1">
//             +5000 Last 30 days Employee
//           </div>
//         </div>

//         {/* Total Active */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Active
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 flex items-center justify-center">
//               <FaUserCheck className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalActive}
//           </div>
//           <div className="text-xs text-red-500 mt-1">
//             -800 Last 30 days Active
//           </div>
//         </div>

//         {/* Total Inactive */}
//         <div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-xl p-4 shadow-sm flex flex-col 
//             transition-colors
//           "
//         >
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
//               Total Inactive
//             </h2>
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center">
//               <FaUserSlash className="text-white" />
//             </div>
//           </div>
//           <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {totalInactive}
//           </div>
//           <div className="text-xs text-green-500 mt-1">
//             +200 Last 30 days Inactive
//           </div>
//         </div>
//       </div>

//       {/* Title */}
//       <h1 className="text-xl font-semibold mb-3">Employee List</h1>

//       {/* Filter Bar */}
//       <div
//         className="
//           flex flex-wrap items-center justify-between 
//           bg-white dark:bg-gray-800 
//           p-4 rounded-md shadow-sm mb-4 
//           transition-colors
//         "
//       >
//         {/* Show X entries & Search */}
//         <div className="flex items-center space-x-4">
//           {/* Page Size */}
//           <div className="flex items-center space-x-2">
//             <label className="text-sm font-medium">Show</label>
//             <select
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(+e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="
//                 border rounded px-2 py-1 text-sm 
//                 bg-white dark:bg-gray-700 
//                 dark:text-gray-100 
//                 focus:outline-none
//               "
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>

//           {/* Search */}
//           <div>
//             <input
//               className="
//                 border rounded px-3 py-1 text-sm 
//                 bg-white dark:bg-gray-700 
//                 dark:text-gray-100 
//                 focus:outline-none
//               "
//               placeholder="Search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Department Filter & Add User */}
//         <div className="flex items-center space-x-4 mt-2 md:mt-0">
//           <select
//             value={departmentFilter}
//             onChange={(e) => {
//               setDepartmentFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="
//               border rounded px-2 py-1 text-sm 
//               bg-white dark:bg-gray-700 
//               dark:text-gray-100 
//               focus:outline-none
//             "
//           >
//             <option value="">De (All)</option>
//             <option value="IT">IT</option>
//             <option value="HR">HR</option>
//             <option value="Sales">Sales</option>
//             {/* ... add other dept options if needed */}
//           </select>

//           <button
//             className="
//               bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium 
//               hover:bg-blue-700 transition-colors
//             "
//             onClick={() => navigate(`/dashboard/add-employee`)}
//           >
//             + Add New User
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center mt-4">Loading employees...</div>
//       ) : (
//         /* Table Container with both horizontal and vertical scroll */
//         <motion.div
//           className="
//             bg-white dark:bg-gray-800 
//             rounded-md shadow-sm 
//             overflow-auto   /* This enables both horizontal & vertical scroll */
//             transition-colors
//           "
//           variants={tableContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.table className="w-full text-left border-collapse min-w-max">
//             <thead className="bg-gray-50 dark:bg-gray-700 transition-colors">
//               <tr>
//                 <th className="p-3 text-sm font-semibold">S.L</th>
//                 <th className="p-3 text-sm font-semibold">Join Date</th>
//                 <th className="p-3 text-sm font-semibold">Name</th>
//                 <th className="p-3 text-sm font-semibold">Email</th>
//                 <th className="p-3 text-sm font-semibold">Department</th>
//                 <th className="p-3 text-sm font-semibold">Designation</th>
//                 <th className="p-3 text-sm font-semibold">Status</th>
//                 <th className="p-3 text-sm font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedEmployees.map((emp, index) => {
//                 // Construct full name
//                 const fullName = `${emp.first_Name || ""} ${
//                   emp.last_Name || ""
//                 }`.trim();
//                 // Convert to “DD MMM YYYY” or just show raw date
//                 const joinDate = emp.date_of_Joining
//                   ? new Date(emp.date_of_Joining).toDateString()
//                   : "-";
//                 // For S.L
//                 const slNumber = (currentPage - 1) * pageSize + (index + 1);

//                 return (
//                   <motion.tr
//                     key={emp._id}
//                     variants={tableRowVariants}
//                     className="
//                       border-b last:border-b-0 border-gray-200 dark:border-gray-600 
//                       hover:bg-gray-50 dark:hover:bg-gray-600 
//                       transition-colors
//                     "
//                   >
//                     <td className="p-3 text-sm">
//                       {String(slNumber).padStart(2, "0")}
//                     </td>
//                     <td className="p-3 text-sm">{joinDate}</td>
//                     <td className="p-3 text-sm flex items-center gap-2">
                        
//                       {/* Circle avatar placeholder */}
//                       <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//                         <span className="text-gray-600 dark:text-gray-200 text-xs">
                         
//                         {emp.user_Avatar ? (
//                         <img
//                           src={emp.user_Avatar}
//                           alt="avatar"
//                           className="w-10 h-10 object-cover rounded-full"
//                         />
//                       ) : null}
//                         </span>
//                       </div>



//                       <span>{fullName || "Unnamed"}</span>
//                     </td>
//                     <td className="p-3 text-sm">
//                       {emp.working_Email_Id || emp.personal_Email_Id || "-"}
//                     </td>
//                     <td className="p-3 text-sm">{emp.department || "-"}</td>
//                     <td className="p-3 text-sm">{emp.designation || "-"}</td>
//                     <td className="p-3 text-sm">
//                       <span
//                         className={`
//                           px-3 py-1 text-xs rounded-full font-semibold
//                           ${
//                             emp.isActive
//                               ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100"
//                               : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-100"
//                           }
//                         `}
//                       >
//                         {emp.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm flex space-x-2">
//                       <button
//                         title="View"
//                         className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
//                         onClick={() =>
//                           navigate(`/dashboard/employees/details/${emp._id}`)
//                         }
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         title="Edit"
//                         className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                         onClick={() =>
//                           navigate(`/dashboard/update-employee/${emp._id}`)
//                         }
//                       >
//                         <FaEdit size={16} />
//                       </button>
//                       <button
//                         title="Delete"
//                         className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//           </motion.table>

//           {/* Pagination */}
//           <div className="flex flex-col md:flex-row justify-between items-center p-3 text-sm gap-2">
//             <div>
//               Showing {paginatedEmployees.length} of{" "}
//               {departmentFilteredData.length} entries
//             </div>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`
//                     px-3 py-1 rounded border text-sm transition-colors
//                     ${
//                       currentPage === i + 1
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
//                     }
//                   `}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaUsers,
  FaUserCheck,
  FaUserSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Import your Zustand store hook
import useEmployeesStore from "../../store/useAllEmployeesStore";

// Animation variants for container & rows
const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function EmployeeList() {
  // Pull what you need from the store
  const {
    getAllEmployeesApi, // fetches from API
    filteredEmployees, // automatically updated when searching
    handleSearchChange, // handle search input
    totalEmployeeCount, // returned by API or fallback to length
    loading, // indicates API loading
  } = useEmployeesStore();

  // Local UI states
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Navigation hook

  // Fetch employees on mount
  useEffect(() => {
    getAllEmployeesApi();
  }, [getAllEmployeesApi]);

  // Whenever searchText changes, call the store’s “handleSearchChange”
  useEffect(() => {
    handleSearchChange(searchText);
    setCurrentPage(1);
  }, [searchText, handleSearchChange]);

  // Filter further by department in the component
  const departmentFilteredData = useMemo(() => {
    if (!departmentFilter || departmentFilter === "All") {
      return filteredEmployees;
    }
    return filteredEmployees.filter(
      (emp) => emp.department === departmentFilter
    );
  }, [filteredEmployees, departmentFilter]);

  // Pagination
  const totalPages = Math.ceil(departmentFilteredData.length / pageSize);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return departmentFilteredData.slice(startIndex, startIndex + pageSize);
  }, [departmentFilteredData, currentPage, pageSize]);

  // For the top summary cards (active vs inactive, total, etc.)
  const totalActive = filteredEmployees.filter((emp) => emp.isActive).length;
  const totalInactive = filteredEmployees.filter((emp) => !emp.isActive).length;

  return (
    <div
      className="
         min-h-screen 
        bg-gray-50 dark:bg-gray-900 
        text-gray-700 dark:text-gray-100 
        transition-colors
      "
    >
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Employee */}
        <div
          className="
            bg-white dark:bg-gray-800 
            rounded-xl p-4 shadow-sm flex flex-col 
            transition-colors
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
              Total Employee
            </h2>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 flex items-center justify-center">
              <FaUsers className="text-white" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {totalEmployeeCount}
          </div>
          <div className="text-xs text-green-500 mt-1">
            +5000 Last 30 days Employee
          </div>
        </div>

        {/* Total Active */}
        <div
          className="
            bg-white dark:bg-gray-800 
            rounded-xl p-4 shadow-sm flex flex-col 
            transition-colors
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
              Total Active
            </h2>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 flex items-center justify-center">
              <FaUserCheck className="text-white" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {totalActive}
          </div>
          <div className="text-xs text-red-500 mt-1">
            -800 Last 30 days Active
          </div>
        </div>

        {/* Total Inactive */}
        <div
          className="
            bg-white dark:bg-gray-800 
            rounded-xl p-4 shadow-sm flex flex-col 
            transition-colors
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200">
              Total Inactive
            </h2>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center">
              <FaUserSlash className="text-white" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {totalInactive}
          </div>
          <div className="text-xs text-green-500 mt-1">
            +200 Last 30 days Inactive
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mb-3">Employee List</h1>

      {/* Filter Bar */}
      <div
        className="
          flex flex-wrap items-center justify-between 
          bg-white dark:bg-gray-800 
          p-4 rounded-md shadow-sm mb-4 
          transition-colors
        "
      >
        {/* Show X entries & Search */}
        <div className="flex items-center space-x-4">
          {/* Page Size */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Show</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(+e.target.value);
                setCurrentPage(1);
              }}
              className="
                border rounded px-2 py-1 text-sm 
                bg-white dark:bg-gray-700 
                dark:text-gray-100 
                focus:outline-none
              "
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <input
              className="
                border rounded px-3 py-1 text-sm 
                bg-white dark:bg-gray-700 
                dark:text-gray-100 
                focus:outline-none
              "
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Department Filter & Add User */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="
              border rounded px-2 py-1 text-sm 
              bg-white dark:bg-gray-700 
              dark:text-gray-100 
              focus:outline-none
            "
          >
            <option value="">De (All)</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            {/* ... add other dept options if needed */}
          </select>

          <button
            className="
              bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium 
              hover:bg-blue-700 transition-colors
            "
            onClick={() => navigate(`/dashboard/add-employee`)}
          >
            + Add New User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-4">Loading employees...</div>
      ) : (
        /* Table Container with both horizontal and vertical scroll */
        <motion.div
          className="
            bg-white dark:bg-gray-800 
            rounded-md shadow-sm 
            overflow-auto  
         
            [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
          "
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-700 transition-colors">
              <tr>
                <th className="p-3 text-sm font-semibold">S.L</th>
                <th className="p-3 text-sm font-semibold">Join Date</th>
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Email</th>
                <th className="p-3 text-sm font-semibold">Department</th>
                <th className="p-3 text-sm font-semibold">Designation</th>
                {/* Added text-center for Status */}
                <th className="p-3 text-sm font-semibold text-center">Status</th>
                {/* Added text-center for Action */}
                <th className="p-3 text-sm font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp, index) => {
                // Construct full name
                const fullName = `${emp.first_Name || ""} ${
                  emp.last_Name || ""
                }`.trim();
                // Convert to “DD MMM YYYY” or just show raw date
                const joinDate = emp.date_of_Joining
                  ? new Date(emp.date_of_Joining).toDateString()
                  : "-";
                // For S.L
                const slNumber = (currentPage - 1) * pageSize + (index + 1);

                return (
                  <motion.tr
                    key={emp._id}
                    variants={tableRowVariants}
                    className="
                      border-b last:border-b-0 border-gray-200 dark:border-gray-600 
                      hover:bg-gray-50 dark:hover:bg-gray-600 
                      transition-colors
                    "
                  >
                    <td className="p-3 text-sm">
                      {String(slNumber).padStart(2, "0")}
                    </td>
                    <td className="p-3 text-sm">{joinDate}</td>
                    <td className="p-3 text-sm flex items-center gap-2">
                      {/* Avatar placeholder or user_Avatar if available */}
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        {emp.user_Avatar ? (
                          <img
                            src={emp.user_Avatar}
                            alt="avatar"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-gray-600 dark:text-gray-200 text-xs">
                            No Pic
                          </span>
                        )}
                      </div>
                      <span>{fullName || "Unnamed"}</span>
                    </td>
                    <td className="p-3 text-sm">
                      {emp.working_Email_Id || emp.personal_Email_Id || "-"}
                    </td>
                    <td className="p-3 text-sm">{emp.department || "-"}</td>
                    <td className="p-3 text-sm">{emp.designation || "-"}</td>

                    {/* Center the Status column */}
                    <td className="p-3 text-sm text-center">
                      <span
                        className={`
                          px-3 py-1 text-xs rounded-full font-semibold
                          ${
                            emp.isActive
                              ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-100"
                          }
                        `}
                      >
                        {emp.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Center the Action column */}
                    <td className="p-3 text-sm text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          title="View"
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                          onClick={() =>
                            navigate(`/dashboard/employees/details/${emp._id}`)
                          }
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          title="Edit"
                          className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                          onClick={() =>
                            navigate(`/dashboard/update-employee/${emp._id}`)
                          }
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </motion.table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center p-3 text-sm gap-2">
            <div>
              Showing {paginatedEmployees.length} of{" "}
              {departmentFilteredData.length} entries
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`
                    px-3 py-1 rounded border text-sm transition-colors
                    ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }
                  `}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
