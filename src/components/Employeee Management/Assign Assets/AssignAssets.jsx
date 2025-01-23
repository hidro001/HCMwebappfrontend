import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaFilePdf, FaFileCsv, FaPrint, FaSearch } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";

// Import your animation variants & motion
import {
  motion,
  tableContainerVariants,
  tableRowVariants,
} from "../../common/animationVariants";

// Import the separate modal component
import AssetGroupModal from "./AssetGroupModal";
import ViewAssetGroupsModal from "./ViewAssetGroupsModal";
import AssignAssetModal from "./AssignAssetModal";

// // Dummy data for demonstration
const DUMMY_EMPLOYEES = [
  { id: "526534", name: "Sameer Hameed", department: "IT" },
  { id: "696589", name: "Kyser Shah", department: "Marketing" },
  { id: "256584", name: "Nikunj Gupta", department: "Sales" },
  { id: "526587", name: "Anand Sharma", department: "Finance" },
  { id: "105986", name: "Yash Tandon", department: "Designing" },
  { id: "526589", name: "Rishi Kumar", department: "Operation" },
  { id: "526520", name: "Akhilesh Sharma", department: "Marketing" },
  { id: "256584", name: "Kyser Shah", department: "Operation" },
  { id: "200257", name: "Nishant Tandon", department: "IT" },
  { id: "526525", name: "Nikunj Gupta", department: "Finance" },
  { id: "526503", name: "Abdul Rahman", department: "Sales" },
  { id: "569874", name: "Pooja Kumari", department: "IT" },
];
// Example dummy groups
const DUMMY_GROUPS = [
  { id: "g1", name: "XYZ", description: "XYZ ABC XYZ HSJK" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },
  { id: "g2", name: "Some Group", description: "Another group" },

  // ...
];

export default function AssignAssetsPage() {
  const [searchValue, setSearchValue] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [groups, setGroups] = useState(DUMMY_GROUPS);

  // Track whether the modal is open
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Filtering employees
  const filteredEmployees = DUMMY_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      searchValue === "" ||
      emp.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchValue.toLowerCase());
    const matchesDept =
      selectedDepartment === "Department" ||
      selectedDepartment === emp.department;
    return matchesSearch && matchesDept;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredEmployees.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Example departments
  const departmentsList = Array.from(
    new Set(DUMMY_EMPLOYEES.map((e) => e.department))
  );

  // Called after user submits the "Add Asset Group" form
  const handleSubmitAssetGroup = (data) => {
    console.log("AssetGroupModal data:", data);
    // Perform any API call or state update here
  };

  // Called when user deletes a group from the modal
  const handleDeleteGroup = (groupId) => {
    // For example, remove the group from state or call an API
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors  ">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assign Assets</h1>
      </div>

      {/* Top controls row */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left group: page size, search, department */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Page size */}
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

            {/* Search with icon */}
            <div className="relative w-64">
              {" "}
              {/* w-64 = wider width */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 dark:border-gray-700 
                     rounded pl-8 pr-3 py-1 text-sm focus:outline-none 
                     bg-white dark:bg-gray-900 w-full"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Department filter */}
            <div>
              <select
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>Department</option>
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right group: buttons + export icons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-600 
                     text-blue-600 dark:text-white rounded shadow-sm text-sm font-medium 
                     hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                onClick={() => setIsViewModalOpen(true)}
              >
                <span className="mr-2">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.33-8-5.33S0 8 0 8s3 5.33 8 5.33S16 8 16 8z" />
                    <path d="M8 11.333c-1.837 0-3.333-1.496-3.333-3.333S6.163 4.667 8 4.667 11.333 6.163 11.333 8 9.837 11.333 8 11.333z" />
                  </svg>
                </span>
                View Assets Group
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-600 
                     text-white rounded shadow-sm text-sm font-medium 
                     hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
              >
                <AiOutlinePlus className="mr-2" size={16} />
                Add Asset Group
              </button>
            </div>

            {/* Export icons with distinct colors */}
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

      {/* Table container with motion */}
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
              <th className="py-3 px-4 text-center">Assets</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((emp, idx) => {
                const serialNumber = (currentPage - 1) * pageSize + (idx + 1);
                return (
                  <motion.tr
                    key={emp.id}
                    variants={tableRowVariants}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <td className="py-3 px-4">
                      {String(serialNumber).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                      #{emp.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
                      {emp.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-100">
                      {emp.department}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
                        onClick={() => setShowAssignModal(true)}
                      >
                        <AiOutlinePlus className="mr-1" size={14} />
                        Assign Asset
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 px-4 text-center text-sm text-gray-500"
                >
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {paginatedData.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              Showing {paginatedData.length} of {filteredEmployees.length}{" "}
              entries
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

      {/* Render the separate modal component */}
      <AssetGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAssetGroup}
      />
      <ViewAssetGroupsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        groups={groups}
        onDeleteGroup={handleDeleteGroup}
      />

      <AssignAssetModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onSubmit={(formData) => {
          console.log("Assigned Asset:", formData);
          // Do an API call or state update
        }}
        employeeName="Kyser Shah"
      />
    </div>
  );
}
