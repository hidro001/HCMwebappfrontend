import React, { useEffect, useState } from 'react';
import {
  FaRegEye,
  FaPen,
  FaTrash,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaCalendarAlt,
  FaFileAlt,
} from 'react-icons/fa';

// Hypothetical service functions
import { fetchAllRequests, getDepartment } from '../../../service/payrollService';

// Tab components
import HikeRequests from './hike-requests/HikeRequests';
import AdvanceRequests from './advance-requests/AdvanceRequests';
import ReimbursementRequests from './reimbursement-requests/ReimbursementRequests';
import LoanRequests from './loan-requests/LoanRequests';

export default function ManageClaim() {
  const [activeTab, setActiveTab] = useState('hike');
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const [month, setMonth] = useState(`${currentYear}-${String(currentMonth).padStart(2, "0")}`);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Fetch all requests
  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await fetchAllRequests();
        setAllRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    }
    loadRequests();
  }, []);

  // Fetch departments
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await getDepartment();
        setDepartments(data.map((dept) => dept.department));
      } catch (err) {
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  // Update filtered requests when filters change
  useEffect(() => {
    let requests = [...allRequests];

    // Filter by active tab
    requests = requests.filter((r) => {
      if (activeTab === 'hike') return r.type === 'Hike';
      if (activeTab === 'advance') return r.type === 'Advance';
      if (activeTab === 'reimbursement') return r.type === 'Reimbursement';
      if (activeTab === 'loan') return r.type === 'Loan';
      return false;
    });

    // Filter by Employee ID (Search)
    if (searchTerm) {
      requests = requests.filter((r) =>
        r.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Department
    if (selectedDepartment) {
      requests = requests.filter((r) => r.department === selectedDepartment);
    }

    // Filter by Month & Year
    if (month) {
      const [year, monthNum] = month.split("-");
      requests = requests.filter((r) => {
        const requestDate = new Date(r.requestedAt);
        return (
          requestDate.getFullYear() === parseInt(year) &&
          requestDate.getMonth() + 1 === parseInt(monthNum)
        );
      });
    }

    setFilteredRequests(requests);
    setCurrentPage(1); // Reset to first page on filter change
  }, [activeTab, searchTerm, selectedDepartment, month, allRequests]);

  // Pagination logic
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedRequests = filteredRequests.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 p-4">
        {['hike', 'advance', 'reimbursement', 'loan'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-100 dark:border-purple-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="px-4 mb-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Requests
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Show select */}
        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            {[5, 10, 25].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Employee ID"
            className="w-full focus:outline-none dark:bg-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Month + Department */}
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
          />

          <select
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Export CSV"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-green-100 text-green-600
              hover:bg-green-200
              dark:bg-green-900 dark:text-green-200
              dark:hover:bg-green-800
            "
          >
            <FaFileAlt className="w-4 h-4" />
          </button>
          <button
            title="Export Excel"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-purple-100 text-purple-600
              hover:bg-purple-200
              dark:bg-purple-900 dark:text-purple-200
              dark:hover:bg-purple-800
            "
          >
            <FaFileExcel className="w-4 h-4" />
          </button>
          <button
            title="Export PDF"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-red-100 text-red-600
              hover:bg-red-200
              dark:bg-red-900 dark:text-red-200
              dark:hover:bg-red-800
            "
          >
            <FaFilePdf className="w-4 h-4" />
          </button>
          <button
            title="Print"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-md
              bg-orange-100 text-orange-600
              hover:bg-orange-200
              dark:bg-orange-900 dark:text-orange-200
              dark:hover:bg-orange-800
            "
          >
            <FaPrint className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'hike' && <HikeRequests requests={displayedRequests} />}
      {activeTab === 'advance' && <AdvanceRequests requests={displayedRequests} />}
      {activeTab === 'reimbursement' && <ReimbursementRequests requests={displayedRequests} />}
      {activeTab === 'loan' && <LoanRequests requests={displayedRequests} />}
    </div>
  );
}
