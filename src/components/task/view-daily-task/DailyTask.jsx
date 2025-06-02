// DailyTask.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaCommentDots,
} from "react-icons/fa";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";  // ADD THIS
import DailyTaskModal from "./DailyTaskModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { fetchManagerTasks, getSubordinateDepartments } from "../../../service/taskService";
import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
import { Toaster, toast } from "react-hot-toast";

const DailyTask = () => {
  // State for tasks and modals.
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentTask, setCommentTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const navigate = useNavigate();  // ADD THIS
  // Set default date to today's date in YYYY-MM-DD format.
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
  // States for search, department filter and pagination.
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch tasks for the selected date.
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchManagerTasks(selectedDate);
      setTasks(fetchedTasks);
      setCurrentPage(1); // Reset page on date change.
    };
    loadTasks();
  }, [selectedDate]);

  // Fetch subordinate departments on component mount.
  useEffect(() => {
    const loadDepartments = async () => {
      const deptData = await getSubordinateDepartments();
      setDepartments(deptData);
    };
    loadDepartments();
  }, []);

  // Filter tasks based on search input (by Employee ID, Name) and department.
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.employee_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.full_Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" || task.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle task deletion.
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeleteTask(null);
    toast.success("Task deleted successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white transition-all">
      <Toaster /> {/* Global toaster for notifications */}

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">View Daily Task</h2>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Data Per Page Select */}
        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Show
          </label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
            per page
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Employee ID or Name"
            className="w-full focus:outline-none dark:bg-gray-900"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Date Picker & Department Filter */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Date Picker */}
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            />
          </div>
          {/* Department Filter */}
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            >
              <option value="All Departments">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 transition-all">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-black dark:text-white">
                <th className="p-3">S.L</th>
                <th className="p-3">Emp ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Assigned Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No data available.
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                     <td 
  className="p-3 text-blue-500 cursor-pointer"
  onClick={async () => {
    try {
      const employeeId = task.employee_Id;
      const dailyTasks = await fetchDailyTasksByEmployeeId(employeeId);

      // Check if tasks were fetched successfully
      if (dailyTasks.length > 0) {
        // You can pass data via state or context. Here, a simple example using state:
        navigate(`/dashboard/employee-particular-tasks/${employeeId}`, {
          state: { dailyTasks, employeeName: task.full_Name },
        });
      } else {
        toast.error("No daily tasks found for this employee.");
      }
    } catch (error) {
      console.error("Error fetching employee daily tasks:", error);
      toast.error("Failed to load daily tasks.");
    }
  }}
>
  {task.employee_Id}
</td>
                    <td className="p-3">{task.full_Name}</td>
                    <td className="p-3">
                      {new Date(task.createdAt || "N/A").toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className="p-3 flex gap-3">
                      <FaEye
                        size={20}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setSelectedTask(task)}
                      />
                      {/* Uncomment below for additional actions */}
                      {/* <FaCommentDots
                        size={20}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => setCommentTask(task)}
                      />
                      <FaTrash
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => setDeleteTask(task)}
                      /> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Go to page:</label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                let page = Number(e.target.value);
                if (page > totalPages) page = totalPages;
                if (page < 1) page = 1;
                setCurrentPage(page);
              }}
              className="w-16 border rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <DailyTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
      <ConfirmationDialog
        open={!!deleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={() => handleDelete(deleteTask?.id)}
        onCancel={() => setDeleteTask(null)}
      />
    </div>
  );
};

export default DailyTask;
