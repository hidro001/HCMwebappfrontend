import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaArrowRight } from "react-icons/fa";
import useEmployeesStore from "../../store/useAllEmployeesStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import useAuthStore from "../../store/store"; // Zustand store


const statusColors = {
  ACTIVE: "bg-green-500 text-white dark:bg-green-600",
  Inactive: "bg-red-500 text-white dark:bg-red-600",
  REMOTE: "bg-purple-500 text-white dark:bg-purple-600",
  "ON LEAVE": "bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black",
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const SkeletonCard = () => (
  <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col animate-pulse">
    <div className="relative h-20 bg-gray-300 dark:bg-gray-700">
      <span className="absolute top-2 left-2 w-16 h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
      <div className="absolute top-2 right-2 flex space-x-2">
        <span className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded" />
        <span className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
      <div className="absolute w-full flex justify-center -bottom-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 border-white dark:border-gray-800 overflow-hidden" />
      </div>
    </div>
    <div className="pt-10 px-4 pb-4 flex flex-col flex-grow justify-between text-center">
      <div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto" />
        <div className="flex justify-between items-center mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-2">
          <div className="w-1/2 text-center border-r border-gray-200 dark:border-gray-700">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-1" />
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto" />
          </div>
          <div className="w-1/2 text-center">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-1" />
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto" />
          </div>
        </div>
      </div>
      <div className="mt-4 w-full h-8 bg-blue-300 dark:bg-blue-700 rounded" />
    </div>
  </div>
);

function SupordinatesEmployess() {
  const {
    employees,
    filteredEmployees,
    totalEmployeeCount,
    searchTerm,
    sortOrder,
    loading,
    error,
    fetchEmployees,
    handleSearchChange,
    handleSortOrderChange,
    deleteEmployee,
    toggleEmployeeStatus,
  } = useEmployeesStore();

   // Auth store to get "permissions"
   const { permissions } = useAuthStore((state) => state);
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---- State for ConfirmationDialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // -- New Confirmation for Toggle Status
  const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
  const [toggleUserId, setToggleUserId] = useState(null);
  const [toggleUserStatus, setToggleUserStatus] = useState(false);

  const navigate = useNavigate();

    // ------------------------------ Derived Permissions ------------------------------
    const canDeleteEmployee = permissions?.includes("deleteEmployeeAdmin");
    const canToggleStatus = permissions?.includes("active/InactiveEmployeeAdmin");

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ---- Confirm delete logic
  const openDeleteDialog = (empId) => {
    setSelectedEmployee(empId);
    setIsConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedEmployee(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;
    await deleteEmployee(selectedEmployee);
    setSelectedEmployee(null);
    setIsConfirmOpen(false);
  };

  // ------------------------------ Toggle Status Logic ------------------------------
  // 1) Open the dialog with user info
  const openToggleDialog = (userId, currentStatus) => {
    setToggleUserId(userId);
    setToggleUserStatus(currentStatus); // e.g. true/false
    setIsToggleConfirmOpen(true);
  };

  // 2) Close without action
  const handleCancelToggle = () => {
    setToggleUserId(null);
    setToggleUserStatus(false);
    setIsToggleConfirmOpen(false);
  };

  // 3) Confirm status change
  const handleConfirmToggle = async () => {
    if (!toggleUserId) return;
    await toggleEmployeeStatus(toggleUserId, toggleUserStatus);
    setIsToggleConfirmOpen(false);
    setToggleUserId(null);
    setToggleUserStatus(false);
  };

  const totalData = filteredEmployees.length;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewProfile = (userName) => {
    toast.success(`Viewing ${userName}'s profile`);
  };

  if (loading) {
    return (
      <div className="bg-bg-secondary ">
        <Toaster />
        <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <Toaster />
        {error}
      </div>
    );
  }

  return (
    <div className=" bg-bg-secondary transition-colors duration-300 pb-4">
      <Toaster />
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            Show
          </label>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:text-gray-200"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 dark:border-gray-600 rounded pl-8 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:text-gray-200"
            value={searchTerm}
            onChange={(e) => {
              handleSearchChange(e.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="absolute left-2 top-1.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <FaSearch />
          </span>
        </div>
        <button
          className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-xs sm:text-sm"
          onClick={handleSortOrderChange}
        >
          {sortOrder === "asc" ? "Sort: A-Z" : "Sort: Z-A"}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded"
          onClick={() => navigate(`/dashboard/add-employee`)}
        >
          + Add New User
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="mb-4 text-lg font-bold dark:text-white">
          Supordinates Employees: {totalEmployeeCount}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentUsers.map((user) => {
            const fullName = `${user.first_Name || ""} ${
              user.last_Name || ""
            }`.trim();
            const status = user.isActive ? "ACTIVE" : "Inactive";
            return (
              <motion.div
                key={user._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col"
              >
                <div className="relative h-20 bg-[#6D7F9B] dark:bg-gray-700">
                  <span
                    className={`absolute top-2 left-2 text-xs font-semibold uppercase px-3 py-1 rounded-full ${
                      statusColors[status] || ""
                    }`}
                  >
                    {status}
                  </span>
                  <div className="absolute top-2 right-2 flex space-x-2 text-text-primary">
                    <button
                      title="Edit"
                      className="hover:text-gray-800 dark:hover:text-white"
                      onClick={() =>
                        navigate(
                          `/dashboard/update-employee-manager/${user._id}`
                        )
                      }
                    >
                      <FaEdit />
                    </button>
                    {/* <button
                      title="Delete"
                      className="hover:text-gray-800 dark:hover:text-white"
                      onClick={() => openDeleteDialog(user.employee_Id)}
                    >
                      <FaTrash />
                    </button> */}
                         {/* Delete Button (conditional) */}
                         {canDeleteEmployee && (
                      <button
                        title="Delete"
                        className="hover:text-gray-800 dark:hover:text-white"
                        onClick={() => openDeleteDialog(user.employee_Id)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <div className="absolute w-full flex justify-center -bottom-8">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 border-white dark:border-gray-800 overflow-hidden">
                      {user.user_Avatar ? (
                        <img
                          src={user.user_Avatar}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="pt-10 px-4 pb-4 flex flex-col flex-grow justify-between text-center">
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-gray-50 text-sm sm:text-base md:text-lg">
                      {fullName || "No Name"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-200 line-clamp-1">
                      {user.working_Email_Id || user.personal_Email_Id || "N/A"}
                    </p>
                    <div className="flex justify-between items-center mt-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-2">
                      <div className="w-1/2 text-center border-r border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                          {user.department || "N/A"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-300 line-clamp-1">
                          Department
                        </p>
                      </div>
                      <div className="w-1/2 text-center">
                        <p className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200 line-clamp-1">
                          {user.designation || "N/A"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-300">
                          Designation
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Toggle Switch to activate/deactivate user */}
                  {/* <div className="mt-4 flex items-center justify-center gap-2">
                    <label
                      htmlFor={`toggleSwitch-${user._id}`}
                      className="text-xs sm:text-sm font-semibold"
                    >
                      Status:
                    </label>
                    <input
                      id={`toggleSwitch-${user._id}`}
                      type="checkbox"
                      className="cursor-pointer h-4 w-4 accent-blue-500"
                      checked={user.isActive}
                      onChange={() =>
                        openToggleDialog(user.employee_Id, user.isActive)
                      }
                    />
                  </div> */}
                       {/* Toggle Switch to activate/deactivate user (conditional) */}
                       {canToggleStatus && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <label
                        htmlFor={`toggleSwitch-${user._id}`}
                        className="text-xs sm:text-sm font-semibold"
                      >
                        Status:
                      </label>
                      <input
                        id={`toggleSwitch-${user._id}`}
                        type="checkbox"
                        className="cursor-pointer h-4 w-4 accent-blue-500"
                        checked={user.isActive}
                        onChange={() => openToggleDialog(user.employee_Id, user.isActive)}
                      />
                    </div>
                  )}
                  <button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center"
                    onClick={() =>
                      navigate(`/dashboard/employees/details/${user._id}`)
                    }
                  >
                    View Profile
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border text-xs sm:text-sm ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={isConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {/* Confirmation Dialog for Toggle Status */}
      <ConfirmationDialog
        open={isToggleConfirmOpen}
        title="Confirm Status Change"
        message={`Are you sure you want to ${
          toggleUserStatus ? "deactivate" : "activate"
        } this user?`}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
        confirmText={toggleUserStatus ? "Deactivate" : "Activate"}
        cancelText="Cancel"
      />
    </div>
  );
}

export default SupordinatesEmployess;
