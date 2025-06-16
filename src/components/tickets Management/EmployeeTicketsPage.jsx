// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useIssuesStore from "../../store/useIssuesStore";
// import { motion } from "framer-motion";
// import {
//   FaArrowLeft,
//   FaTicketAlt,
//   FaCalendarAlt,
//   FaLayerGroup,
//   FaFlag,
// } from "react-icons/fa";
// import { Skeleton } from "@mui/material";

// const EmployeeTicketsPage = () => {
//   const { employeeId } = useParams();
//   const navigate = useNavigate();
//   const { fetchEmployeeTickets, issues, employeeDetails, loading } =
//     useIssuesStore();

//   useEffect(() => {
//     fetchEmployeeTickets(employeeId);
//   }, [employeeId, fetchEmployeeTickets]);

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
//       >
//         <FaArrowLeft /> Back
//       </button>
//       {loading ? (
//         <Skeleton variant="rectangular" height={100} className="mb-4" />
//       ) : (
//         employeeDetails && (
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//               Tickets by {employeeDetails.first_Name}{" "}
//               {employeeDetails.last_Name}
//             </h1>
//             <div className="text-gray-500 dark:text-gray-400 mt-2">
//               ID: {employeeDetails.employee_Id} | {employeeDetails.designation}{" "}
//               - {employeeDetails.department}
//             </div>
//           </div>
//         )
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {loading
//           ? Array(6)
//               .fill(0)
//               .map((_, idx) => (
//                 <Skeleton key={idx} variant="rectangular" height={120} />
//               ))
//           : issues.map((issue) => (
//               <motion.div
//                 key={issue._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition"
//               >
//                 <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
//                   <FaTicketAlt className="text-blue-500" /> {issue.issueTitle}
//                 </h2>
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
//                   <FaCalendarAlt />{" "}
//                   {new Date(issue.createdAt).toLocaleDateString()}
//                 </div>
//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                     <FaLayerGroup /> {issue.assignedTo}
//                   </span>
//                   <span
//                     className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
//                       issue.priority === "High"
//                         ? "bg-red-200 dark:bg-red-700 text-red-600 dark:text-red-300"
//                         : issue.priority === "Medium"
//                         ? "bg-yellow-200 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-300"
//                         : "bg-green-200 dark:bg-green-700 text-green-600 dark:text-green-300"
//                     }`}
//                   >
//                     <FaFlag /> {issue.priority}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//       </div>
//       {!loading && issues.length === 0 && (
//         <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No tickets found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeTicketsPage;


import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useIssuesStore from "../../store/useIssuesStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaTicketAlt,
  FaCalendarAlt,
  FaLayerGroup,
  FaFlag,
  FaUser,
  FaIdBadge,
  FaBuilding,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaFilter,
  FaSort,
  FaEye,
  FaChartBar,
  FaTasks,
  FaUsers,
  FaCalendar
} from "react-icons/fa";
import {
  MdPerson,
  MdBadge,
  MdBusiness,
  MdWork,
  MdDateRange,
  MdTrendingUp,
  MdAssignment,
  MdPriorityHigh,
  MdAccessTime,
  MdCheckCircle,
  MdFilterList,
  MdSort,
  MdViewModule,
  MdViewList,
  MdArrowBack
} from "react-icons/md";
import {
  HiOutlineUser,
  HiOutlineBadgeCheck,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineTicket,
  HiOutlineFlag,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineFilter,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineArrowLeft,
  HiOutlineChartBar
} from "react-icons/hi";
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { BiUser, BiBuilding, BiCalendar, BiFilter, BiSort } from "react-icons/bi";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineFilter } from "react-icons/ai";
import { Skeleton } from "@mui/material";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.4
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const headerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, delay: 0.2 }
  },
};

const EmployeeTicketsPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { fetchEmployeeTickets, issues, employeeDetails, loading } = useIssuesStore();
  
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEmployeeTickets(employeeId);
  }, [employeeId, fetchEmployeeTickets]);

  // Filter and sort issues
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter(issue => {
      if (filterStatus !== "All" && issue.issueStatus !== filterStatus) return false;
      if (filterPriority !== "All" && issue.priority !== filterPriority) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [issues, filterStatus, filterPriority, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = issues.length;
    const pending = issues.filter(i => i.issueStatus === 'Pending').length;
    const inProgress = issues.filter(i => i.issueStatus === 'In Progress').length;
    const resolved = issues.filter(i => i.issueStatus === 'Resolved').length;
    const highPriority = issues.filter(i => i.priority === 'High').length;
    const mediumPriority = issues.filter(i => i.priority === 'Medium').length;
    const lowPriority = issues.filter(i => i.priority === 'Low').length;

    return { total, pending, inProgress, resolved, highPriority, mediumPriority, lowPriority };
  }, [issues]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'from-red-500 to-red-600';
      case 'Medium': return 'from-yellow-500 to-yellow-600';
      case 'Low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'from-orange-500 to-orange-600';
      case 'In Progress': return 'from-blue-500 to-blue-600';
      case 'Resolved': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <HiOutlineExclamationTriangle className="text-red-500" />;
      case 'Medium': return <HiOutlineClock className="text-yellow-500" />;
      case 'Low': return <HiOutlineCheckCircle className="text-green-500" />;
      default: return <HiOutlineClock className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <HiOutlineClock className="text-orange-500" />;
      case 'In Progress': return <FaSpinner className="text-blue-500" />;
      case 'Resolved': return <HiOutlineCheckCircle className="text-green-500" />;
      default: return <HiOutlineClock className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <HiOutlineArrowLeft className="text-lg" />
            <span className="font-medium">Back to Dashboard</span>
          </motion.button>
        </motion.div>

        {/* Employee Profile Header */}
        {loading ? (
          <div className="mb-8">
            <Skeleton variant="rectangular" height={200} className="rounded-2xl" />
          </div>
        ) : (
          employeeDetails && (
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8"
            >
              {/* Header Background */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    >
                      <HiOutlineUser className="text-white text-4xl" />
                    </motion.div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-white">
                        {employeeDetails.first_Name} {employeeDetails.last_Name}
                      </h1>
                      <p className="text-blue-100 mt-2 text-lg">
                        Personal Ticket Portfolio
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{stats.total}</div>
                      <div className="text-blue-100 text-sm">Total Tickets</div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{stats.resolved}</div>
                      <div className="text-blue-100 text-sm">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <HiOutlineBadgeCheck className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Employee ID</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {employeeDetails.employee_Id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <HiOutlineBriefcase className="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Designation</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {employeeDetails.designation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                      <HiOutlineOfficeBuilding className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Department</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {employeeDetails.department}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}

        {/* Statistics Cards */}
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'Total', value: stats.total, icon: HiOutlineTicket, color: 'from-blue-500 to-blue-600' },
            { label: 'Pending', value: stats.pending, icon: HiOutlineClock, color: 'from-orange-500 to-orange-600' },
            { label: 'In Progress', value: stats.inProgress, icon: FaSpinner, color: 'from-blue-500 to-blue-600' },
            { label: 'Resolved', value: stats.resolved, icon: HiOutlineCheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'High Priority', value: stats.highPriority, icon: HiOutlineExclamationTriangle, color: 'from-red-500 to-red-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tickets ({filteredAndSortedIssues.length})
                </h2>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    showFilters 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <HiOutlineFilter />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
                >
                  {viewMode === 'grid' ? <HiOutlineViewList /> : <HiOutlineViewGrid />}
                  <span className="hidden sm:inline">{viewMode === 'grid' ? 'List' : 'Grid'}</span>
                </motion.button>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="All">All Priorities</option>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>

                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="desc">🕐 Latest First</option>
                      <option value="asc">🕐 Oldest First</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tickets Display */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {Array(6).fill(0).map((_, idx) => (
              <Skeleton key={idx} variant="rectangular" height={200} className="rounded-2xl" />
            ))}
          </div>
        ) : filteredAndSortedIssues.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
          >
            {filteredAndSortedIssues.map((issue, index) => (
              <motion.div
                key={issue._id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${getPriorityColor(issue.priority)} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <HiOutlineTicket className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Ticket #{index + 1}</h3>
                        <p className="text-white/80 text-sm">{issue.priority} Priority</p>
                      </div>
                    </div>
                    {getPriorityIcon(issue.priority)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 line-clamp-2">
                    {issue.issueTitle}
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(issue.issueStatus)}
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getStatusColor(issue.issueStatus)} text-white`}>
                          {issue.issueStatus}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Department</span>
                      <div className="flex items-center gap-2">
                        <HiOutlineOfficeBuilding className="text-purple-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {issue.assignedTo || 'Unassigned'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Created</span>
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar className="text-indigo-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  {/* <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    >
                      <FaEye />
                      View Details
                    </motion.button>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-6 inline-block">
                <HiOutlineTicket className="text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No tickets found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {employeeDetails ? 
                  `${employeeDetails.first_Name} hasn't raised any tickets yet.` : 
                  'No tickets match your current filters.'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTicketsPage;