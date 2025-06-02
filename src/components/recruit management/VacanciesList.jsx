

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import useVacancyStore from "../../store/useVacancyStore";
import ViewVacancyModal from "./model/ViewVacancyModal";
import UpdateVacancyModal from "./model/UpdateVacancyModal";
import ConfirmationDialog from "../common/ConfirmationDialog"; // Adjust path as needed
import ExportButtons from "../common/PdfExcel"; // adjust path if needed

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function VacanciesList() {
  const { vacancies, loading, error, fetchAllVacancies, deleteVacancy } =
    useVacancyStore();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  // State for confirmation dialog when deleting a vacancy
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchAllVacancies();
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
      }
    })();
  }, [fetchAllVacancies]);

  const filteredVacancies = useMemo(() => {
    if (!vacancies || vacancies.length === 0) return [];
    return vacancies.filter((job) => {
      if (searchText) {
        const matchTitle = job.jobTitle
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchDept = job.jobDepartment
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchTitle && !matchDept) return false;
      }
      if (department !== "All" && job.jobDepartment !== department)
        return false;
      if (status !== "All" && job.vacancyStatus !== status) return false;
      if (selectedDate) {
        const itemDate = new Date(job.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        const filterDate = new Date(selectedDate);
        filterDate.setHours(0, 0, 0, 0);
        if (itemDate.getTime() !== filterDate.getTime()) return false;
      }
      return true;
    });
  }, [vacancies, searchText, department, status, selectedDate]);

  const totalPages = Math.ceil(filteredVacancies.length / pageSize);

  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredVacancies.slice(startIndex, startIndex + pageSize);
  }, [filteredVacancies, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewModal = (vac) => {
    setSelectedVacancy(vac);
    setIsViewModalOpen(true);
  };

  const handleUpdateModal = (vac) => {
    setSelectedVacancy(vac);
    setIsUpdateModalOpen(true);
  };

  // When a user clicks the delete button, open the confirmation dialog.
  const handleDelete = (vac) => {
    setVacancyToDelete(vac);
    setIsConfirmDialogOpen(true);
  };

  // Called when the user confirms deletion in the confirmation dialog.
  const handleConfirmDelete = async () => {
    if (!vacancyToDelete) return;
    try {
      await deleteVacancy(vacancyToDelete._id);
      alert(`Vacancy "${vacancyToDelete.jobTitle}" deleted successfully.`);
    } catch (err) {
      alert("Error deleting vacancy. Check console.");
      console.error(err);
    }
    setVacancyToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  // Called when the user cancels deletion.
  const handleCancelDelete = () => {
    setVacancyToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  // Flatten currentTableData for export
  const exportData = currentTableData.map((vac, idx) => {
    const rowIndex = (currentPage - 1) * pageSize + (idx + 1);

    const postedBy = vac?.createdBy
      ? `${vac.createdBy.first_Name} ${vac.createdBy.last_Name} (${vac.createdBy.employee_Id})`
      : "N/A";

    const formattedSalary =
      vac.salary && vac.salary > 0 ? `${vac.salary} (${vac.currency})` : "---";

    return {
      sl: String(rowIndex).padStart(2, "0"),
      jobTitle: vac.jobTitle,
      department: vac.jobDepartment,
      salary: formattedSalary,
      postedBy,
      postedDate: new Date(vac.createdAt).toLocaleDateString("en-GB"),
      vacancyStatus: vac.vacancyStatus,
    };
  });

  // Define columns for PDF/Excel/CSV
  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Designation", dataKey: "jobTitle" },
    { header: "Department", dataKey: "department" },
    { header: "Salary", dataKey: "salary" },
    { header: "Posted By", dataKey: "postedBy" },
    { header: "Posted Date", dataKey: "postedDate" },
    { header: "Status", dataKey: "vacancyStatus" },
  ];

  return (
    <div className="mx-auto px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Vacancies Management</h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">
              Show
            </label>
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search job or dept"
              className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd MMM yyyy"
            placeholderText="Filter by date"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Department</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Status</option>
            <option value="Draft">Draft</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <ExportButtons
              data={exportData}
              columns={columns}
              filename="ReferralList"
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>
      )}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
          {Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={40}
              className="mb-2"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredVacancies.length > 0 ? (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Designation</th>
                    <th className="p-3 text-sm font-semibold">Department</th>
                    <th className="p-3 text-sm font-semibold">Salary</th>
                    <th className="p-3 text-sm font-semibold">Posted By</th>
                    <th className="p-3 text-sm font-semibold">Posted Date</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((vac, idx) => {
                    const rowIndex = (currentPage - 1) * pageSize + (idx + 1);
                    const postedBy = vac?.createdBy?.first_Name
                      ? `${vac.createdBy.first_Name} ${vac.createdBy.last_Name} (${vac.createdBy.employee_Id})`
                      : "N/A";
                    let statusClasses =
                      "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 px-2 py-1 rounded text-xs font-semibold";
                    if (vac.vacancyStatus === "Open") {
                      statusClasses =
                        "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 px-2 py-1 rounded text-xs font-semibold";
                    } else if (vac.vacancyStatus === "Closed") {
                      statusClasses =
                        "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 px-2 py-1 rounded text-xs font-semibold";
                    }
                    const formattedSalary =
                      vac.salary && vac.salary > 0
                        ? `${vac.salary} (${vac.currency})`
                        : "---";
                    const postedDate = new Date(
                      vac.createdAt
                    ).toLocaleDateString("en-GB");
                    return (
                      <motion.tr
                        key={vac._id}
                        variants={tableRowVariants}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="p-3 text-sm">
                          {String(rowIndex).padStart(2, "0")}
                        </td>
                        <td className="p-3 text-sm">{vac.jobTitle}</td>
                        <td className="p-3 text-sm">{vac.jobDepartment}</td>
                        <td className="p-3 text-sm">{formattedSalary}</td>
                        <td className="p-3 text-sm">{postedBy}</td>
                        <td className="p-3 text-sm">{postedDate}</td>
                        <td className="p-3 text-sm">
                          <span className={statusClasses}>
                            {vac.vacancyStatus}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              onClick={() => handleViewModal(vac)}
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                              onClick={() => handleUpdateModal(vac)}
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              onClick={() => handleDelete(vac)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>
              <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm text-gray-600 dark:text-gray-200 transition-colors">
                <div>
                  Showing {currentTableData.length} of{" "}
                  {filteredVacancies.length} entries
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded border transition-colors ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400 transition-colors">
              No matching records found
            </div>
          )}
        </>
      )}
      <AnimatePresence>
        {isViewModalOpen && selectedVacancy && (
          <ViewVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUpdateModalOpen && selectedVacancy && (
          <UpdateVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsUpdateModalOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* Confirmation Dialog for deletion */}
      <AnimatePresence>
        {isConfirmDialogOpen && vacancyToDelete && (
          <ConfirmationDialog
            open={isConfirmDialogOpen}
            title="Confirm Deletion"
            message={`Are you sure you want to delete job "${vacancyToDelete.jobTitle}"?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
