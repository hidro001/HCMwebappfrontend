import  { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaComment,
  FaEdit,
  FaTrash,
  FaPrint,
  FaFilePdf,
} from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import IssueDetailsModal from "./model/IssueDetailsModal";
import EditStatusModal from "./model/EditStatusModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { usePoshStore } from "../../../store/poshStore";

export default function PoshManage() {
  const { poshActs, fetchPoshActs, loading } = usePoshStore(); 

  // State
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchPoshActs();
  }, [fetchPoshActs]);

  // Handlers
  const handleView = (ticket) => {
    setSelectedItem(ticket);
    setViewModalOpen(true);
  };

  const handleEdit = (ticket) => {
    setSelectedItem(ticket);
    setEditModalOpen(true);
  };

  const handleDelete = (ticket) => {
    setSelectedItem(ticket);
    setDeleteDialogOpen(true);
  };

  // Filtering
  const filteredData = useMemo(() => {
    return poshActs.filter((ticket) => {
      // Search text
      if (searchText) {
        const rId = ticket.reporterId.toLowerCase();
        const rName = ticket.reporterName.toLowerCase();
        const aId = ticket.accusedId.toLowerCase();
        const aName = ticket.accusedName.toLowerCase();
        const searchLower = searchText.toLowerCase();
        if (
          !rId.includes(searchLower) &&
          !rName.includes(searchLower) &&
          !aId.includes(searchLower) &&
          !aName.includes(searchLower)
        ) {
          return false;
        }
      }
      // Status filter
      if (statusFilter !== "All" && ticket.status !== statusFilter) return false;
      // Date filter
      if (selectedDate) {
        const ticketDate = new Date(ticket.incidentDate).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (ticketDate !== filterDate) return false;
      }
      return true;
    });
  }, [searchText, statusFilter, selectedDate, poshActs]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  // Container variants for top-level fade-in (toolbar)
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Table container variants for fade-in + staggered rows
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2, 
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // Row variants for each row animation
  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mx-auto px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors ">
      <h1 className="text-2xl font-bold mb-2">POSH Issues</h1>

      {/* Toolbar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors mb-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
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
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
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
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
          />
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Under Review">Under Review</option>
          </select>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Print">
              <FaPrint size={18} />
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export to PDF">
              <FaFilePdf size={18} />
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-100 transition-colors" title="Export CSV/Excel">
              <MdOutlineFileDownload size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Loading or Table */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 transition-colors">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
          ))}
        </div>
      ) : (
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold">S.L</th>
                <th className="p-3 text-sm font-semibold">Reporter Emp ID</th>
                <th className="p-3 text-sm font-semibold">Reporter Name</th>
                <th className="p-3 text-sm font-semibold">Accused Emp ID</th>
                <th className="p-3 text-sm font-semibold">Accused Name</th>
                <th className="p-3 text-sm font-semibold">Incident Date</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((ticket, index) => {
                const slIndex = (currentPage - 1) * pageSize + (index + 1);

                // Status classes
                let statusClasses =
                  "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500";
                if (ticket.status === "Pending") {
                  statusClasses =
                    "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600";
                } else if (ticket.status === "Resolved") {
                  statusClasses =
                    "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600";
                } else if (ticket.status === "Under Review") {
                  statusClasses =
                    "bg-purple-50 dark:bg-purple-700 text-purple-600 dark:text-purple-100 border border-purple-200 dark:border-purple-600";
                }

                return (
                  <motion.tr
                    key={ticket.id}
                    variants={tableRowVariants}
                    className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <td className="p-3 text-sm">{String(slIndex).padStart(2, "0")}</td>
                    <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
                      {ticket.reporterId}
                    </td>
                    <td className="p-3 text-sm">{ticket.reporterName}</td>
                    <td className="p-3 text-sm text-blue-600 dark:text-blue-400">
                      {ticket.accusedId}
                    </td>
                    <td className="p-3 text-sm">{ticket.accusedName}</td>
                    <td className="p-3 text-sm">
                      {ticket.incidentDate
                        ? new Date(ticket.incidentDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${statusClasses}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm space-x-3">
                      <button
                        title="View"
                        onClick={() => handleView(ticket)}
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        title="Edit"
                        onClick={() => handleEdit(ticket)}
                        className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(ticket)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </motion.table>

          {/* Pagination + No records handling */}
          {filteredData.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
              <div>
                Showing {paginatedData.length} of {filteredData.length} entries
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
          )}
          {filteredData.length === 0 && (
            <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
              No matching records found
            </div>
          )}
        </motion.div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete POSH Act"
        message="Are you sure you want to delete this record?"
        onConfirm={() => {
          const { deletePoshAct } = usePoshStore.getState();
          if (selectedItem) {
            deletePoshAct(selectedItem.id);
          }
          setDeleteDialogOpen(false);
        }}
        onCancel={() => setDeleteDialogOpen(false)}
      />

      {/* Modals */}
      <IssueDetailsModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        issue={selectedItem}
      />
      <EditStatusModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedItem}
        onUpdateStatus={() => {}}
      />
    </div>
  );
}



