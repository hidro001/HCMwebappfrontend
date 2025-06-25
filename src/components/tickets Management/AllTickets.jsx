

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaSort,
  FaPlus, FaCalendarAlt, FaSortUp, FaSortDown, FaDownload,
  FaTicketAlt, FaUsers, FaClock, FaExclamationTriangle, FaCheckCircle,
  FaSpinner, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaUsersCog,
  FaClipboardList
} from "react-icons/fa";
import { 
  MdOutlineFileDownload, MdDashboard, MdFilterList, MdViewModule,
  MdRefresh, MdMoreVert, MdSearch, MdClose, MdAdd, MdSort,
  MdAccessTime, MdSupervisorAccount
} from "react-icons/md";
import { 
  HiOutlineTicket, HiOutlineEye, HiOutlinePencil, HiOutlineTrash,
  HiOutlineFilter, HiOutlineDownload, HiOutlineCalendar, HiOutlineUser,
  HiOutlineUserGroup, HiOutlinePlus, HiOutlineCollection, HiOutlineSortDescending,
  HiOutlineSortAscending
} from "react-icons/hi";
import { BiFilter, BiSearch, BiCalendar, BiRefresh, BiUser, BiSort } from "react-icons/bi";
import { AiOutlineSearch, AiOutlineFilter, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import { toast } from "react-hot-toast";
import TicketFormModal from "./model/TicketFormModal";
import ConfirmationDialog from "../common/ConfirmationDialog";
import TicketDetailsModal from "./model/TicketDetailsModal";
import useIssuesStore from "../../store/useIssuesStore";
import useDepartmentStore from "../../store/departmentStore";
import ExportButtons from "../common/PdfExcel";

export default function AllTickets() {
  const {
    issues,
    fetchAllIssues,
    createIssue,
    changeIssueStatus,
    removeIssue,
    fetchComments,
    postComment,
    loading,
  } = useIssuesStore();
  const navigate = useNavigate();
  const { departments, fetchDepartments } = useDepartmentStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [sortOrder, setSortOrder] = useState("desc");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode('cards');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchAllIssues();
    fetchDepartments();
  }, [fetchAllIssues, fetchDepartments]);

  const handleViewDetails = async (issue) => {
    setSelectedIssue(issue);
    await fetchComments(issue._id);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (issue) => {
    setModalMode("edit");
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleDelete = (issue) => {
    setConfirmTitle("Delete Issue");
    setConfirmMessage(
      `Are you sure you want to delete issue "${issue.issueTitle}"?`
    );
    setConfirmAction(() => async () => {
      setConfirmOpen(false);
      await removeIssue(issue._id);
    });
    setConfirmOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (modalMode === "create") {
      await createIssue({
        issueTitle: formData.ticketTitle,
        issueDescription: formData.description,
        priority: formData.priority,
        assignedTo: formData.department !== "All" ? formData.department : "",
        issueStatus: formData.status,
        attachment: formData.attachment,
      });
    } else if (selectedIssue) {
      await changeIssueStatus(selectedIssue._id, {
        issueTitle: formData.ticketTitle,
        issueDescription: formData.description,
        priority: formData.priority,
        assignedTo: formData.department !== "All" ? formData.department : "",
        issueStatus: formData.status,
        attachment: formData.attachment,
      });
    }
    setIsModalOpen(false);
  };

  const handleAddComment = async (commentText) => {
    if (!selectedIssue) return;
    await postComment(selectedIssue._id, commentText);
  };

  // Filter issues first
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (searchText) {
        const matchTitle = issue.issueTitle
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const matchEmployeeId = issue.createdBy?.employee_Id
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchTitle && !matchEmployeeId) return false;
      }
      if (department !== "All" && issue.assignedTo !== department) return false;
      if (status !== "All" && issue.issueStatus !== status) return false;
      if (priorityFilter !== "All" && issue.priority !== priorityFilter)
        return false;
      if (selectedDate) {
        const issueDate = new Date(issue.createdAt).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (issueDate !== filterDate) return false;
      }
      return true;
    });
  }, [issues, searchText, department, status, priorityFilter, selectedDate]);

  // Sort the filtered issues based on 'createdAt' and 'sortOrder'
  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  }, [filteredIssues, sortOrder]);

  // Paginate the sorted issues
  const totalPages = Math.ceil(sortedIssues.length / pageSize);
  const paginatedIssues = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedIssues.slice(startIndex, startIndex + pageSize);
  }, [sortedIssues, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Stats for dashboard cards - using real API data
  const stats = useMemo(() => {
    const total = issues.length;
    const pending = issues.filter(i => i.issueStatus === 'Pending').length;
    const inProgress = issues.filter(i => i.issueStatus === 'In Progress').length;
    const resolved = issues.filter(i => i.issueStatus === 'Resolved').length;
    const highPriority = issues.filter(i => i.priority === 'High').length;
    const uniqueEmployees = new Set(issues.map(i => i.createdBy?.employee_Id).filter(Boolean)).size;

    return { total, pending, inProgress, resolved, highPriority, uniqueEmployees };
  }, [issues]);

  const exportData = paginatedIssues.map((issue, index) => {
    const globalIndex = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: String(globalIndex).padStart(2, "0"),
      empId: issue.createdBy?.employee_Id || "--",
      name: issue.createdBy
        ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
        : "Unknown",
      title: issue.issueTitle,
      priority: issue.priority,
      status: issue.issueStatus,
      department: issue.assignedTo || "--",
      createdOn: new Date(issue.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  });

  // Columns for PDF/CSV/Excel
  const columnsArray = [
    { header: "S.L", dataKey: "sl" },
    { header: "Emp ID", dataKey: "empId" },
    { header: "Name", dataKey: "name" },
    { header: "Title", dataKey: "title" },
    { header: "Priority", dataKey: "priority" },
    { header: "Status", dataKey: "status" },
    { header: "Department", dataKey: "department" },
    { header: "Created On", dataKey: "createdOn" },
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <FaExclamationTriangle className="text-red-500" />;
      case 'Medium': return <FaClock className="text-yellow-500" />;
      case 'Low': return <FaCheckCircle className="text-green-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FaClock className="text-orange-500" />;
      case 'In Progress': return <FaSpinner className="text-blue-500" />;
      case 'Resolved': return <FaCheckCircle className="text-green-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'Medium': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'Low': return 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default: return 'bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'In Progress': return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'Resolved': return 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default: return 'bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 h-16 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-2xl">
      {/* DatePicker Portal */}
      <div id="react-datepicker-portal"></div>
      
      <style>{`
        .react-datepicker-popper {
          z-index: 99999 !important;
          position: fixed !important;
        }
        /* you can keep your dark-only DatePicker styles here; for light, default is fine */
      `}</style>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <MdSupervisorAccount className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  All Tickets Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Monitor and manage all employee tickets across departments
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setModalMode('create');
                  setSelectedIssue(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <FaPlus />
                <span className="hidden sm:inline">Create Ticket</span>
              </button>
              
              <button
                onClick={() => {
                  fetchAllIssues();
                  fetchDepartments();
                }}
                className="p-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <MdRefresh className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Tickets', value: stats.total, icon: FaTicketAlt, color: 'from-blue-500 to-blue-600' },
            { label: 'Pending', value: stats.pending, icon: FaClock, color: 'from-orange-500 to-orange-600' },
            { label: 'In Progress', value: stats.inProgress, icon: FaSpinner, color: 'from-blue-500 to-blue-600' },
            { label: 'Resolved', value: stats.resolved, icon: FaCheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'High Priority', value: stats.highPriority, icon: FaExclamationTriangle, color: 'from-red-500 to-red-600' },
            { label: 'Employees', value: stats.uniqueEmployees, icon: FaUsers, color: 'from-indigo-500 to-indigo-600' }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
          <div className="p-6">
            {/* Top Row Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Show
                  </label>
                  <select
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets or employee ID..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full lg:w-80"
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    showFilters
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <HiOutlineFilter />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {!isMobile && (
                  <button
                    onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-medium"
                  >
                    <MdViewModule />
                    <span className="hidden sm:inline">{viewMode === 'table' ? 'Cards' : 'Table'}</span>
                  </button>
                )}

                <ExportButtons
                  data={exportData}
                  columns={columnsArray}
                  filename="AllTickets"
                />
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative">
                    <AiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => { setSelectedDate(date); setCurrentPage(1); }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Date"
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full cursor-pointer"
                      wrapperClassName="w-full"
                      popperClassName="react-datepicker-dark"
                      calendarClassName="react-datepicker-dark"
                      popperPlacement="bottom-start"
                      portalId="react-datepicker-portal"
                      shouldCloseOnSelect={true}
                      isClearable={true}
                    />
                  </div>

                  <select
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={department}
                    onChange={(e) => { setDepartment(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Departments</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep.department}>
                        {dep.department}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={priorityFilter}
                    onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>

                  <select
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <div className="relative">
                    <BiSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full appearance-none"
                      value={sortOrder}
                      onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                    >
                      <option value="desc">🕐 Latest to Old</option>
                      <option value="asc">🕐 Old to Latest</option>
                    </select>
                    {sortOrder === 'desc' ? (
                      <HiOutlineSortDescending className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    ) : (
                      <HiOutlineSortAscending className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    )}
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchText || selectedDate || priorityFilter !== 'All' || status !== 'All' || department !== 'All' || sortOrder !== 'desc') && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSearchText('');
                        setSelectedDate(null);
                        setPriorityFilter('All');
                        setStatus('All');
                        setDepartment('All');
                        setSortOrder('desc');
                        setCurrentPage(1);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-red-400 hover:text-red-500 transition-colors"
                    >
                      <MdClose />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        {sortedIssues.length > 0 ? (
          (viewMode === 'table' && !isMobile) ? (
            /* Table View */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedIssues.map((issue, index) => {
                      const globalIndex = (currentPage - 1) * pageSize + (index + 1);

                      return (
                        <tr
                          key={issue._id}
                          className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {String(globalIndex).padStart(2, "0")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {issue.createdBy?.first_Name?.charAt(0) || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {issue.createdBy
                                    ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
                                    : "Unknown"}
                                </div>
                                <div 
                                  className="text-sm text-blue-400 cursor-pointer hover:underline"
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/employee-tickets/${issue.createdBy?.employee_Id}`
                                    )
                                  }
                                >
                                  {issue.createdBy?.employee_Id || "--"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                              {issue.issueTitle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getPriorityIcon(issue.priority)}
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityClasses(issue.priority)}`}>
                                {issue.priority}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(issue.issueStatus)}
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(issue.issueStatus)}`}>
                                {issue.issueStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {issue.assignedTo || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-3">
                              <button
                                className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                                onClick={() => handleViewDetails(issue)}
                                title="View Details"
                              >
                                <HiOutlineEye size={18} />
                              </button>
                              <button
                                onClick={() => handleEdit(issue)}
                                className="p-2 text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all"
                                title="Edit Ticket"
                              >
                                <HiOutlinePencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(issue)}
                                className="p-2 text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                                title="Delete Ticket"
                              >
                                <HiOutlineTrash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-100 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-semibold">{paginatedIssues.length}</span> of{" "}
                    <span className="font-semibold">{sortedIssues.length}</span> entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            className={`px-3 py-2 rounded-lg border transition-all ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedIssues.map((issue, index) => {
                const globalIndex = (currentPage - 1) * pageSize + (index + 1);

                return (
                  <div
                    key={issue._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-900/30 rounded-lg">
                            <FaTicketAlt className="text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                              #{String(globalIndex).padStart(2, "0")}
                            </h3>
                            <p 
                              className="text-xs text-blue-400 cursor-pointer hover:underline"
                              onClick={() => navigate(`/dashboard/employee-tickets/${issue.createdBy?.employee_Id}`)}
                            >
                              {issue.createdBy?.employee_Id || "--"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(issue.priority)}
                          {getStatusIcon(issue.issueStatus)}
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                        {issue.issueTitle}
                      </h4>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClasses(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses(issue.issueStatus)}`}>
                            {issue.issueStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Department</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {issue.assignedTo || "--"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Created By</span>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {issue.createdBy?.first_Name?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {issue.createdBy
                                ? `${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-all text-sm font-medium"
                          onClick={() => handleViewDetails(issue)}
                        >
                          <HiOutlineEye />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(issue)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-900/50 transition-all text-sm font-medium"
                        >
                          <HiOutlinePencil />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(issue)}
                          className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all"
                        >
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination for Card View */}
              <div className="col-span-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-semibold">{paginatedIssues.length}</span> of{" "}
                      <span className="font-semibold">{sortedIssues.length}</span> entries
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        <FaChevronLeft />
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              className={`px-3 py-2 rounded-lg border transition-all ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6 inline-block">
                <FaClipboardList className="text-4xl text-gray-700 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No tickets found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No tickets match your current filters. Try adjusting your search criteria or create a new ticket.
              </p>
              <button
                onClick={() => {
                  setModalMode('create');
                  setSelectedIssue(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium mx-auto"
              >
                <FaPlus />
                Create New Ticket
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <ConfirmationDialog
          open={confirmOpen}
          title={confirmTitle}
          message={confirmMessage}
          onConfirm={confirmAction}
          onCancel={() => setConfirmOpen(false)}
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <TicketFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedIssue}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        )}

        {isDetailsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <TicketDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                ticket={selectedIssue}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
