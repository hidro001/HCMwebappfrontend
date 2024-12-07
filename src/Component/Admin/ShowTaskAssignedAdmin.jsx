import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import AutomatedPerformanceReview from "../Manager/AutomatedPerformanceReview";

const ShowTaskAssignedAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [assignType, setAssignType] = useState("department");
  const [employee, setEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Not Started");
  const [comments, setComments] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/admin/assigntask",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const formattedTasks = response.data.data.map((task) => ({
          _id: task._id,
          taskDescription: task.assignTaskDesc,
          assignType: task.assignedToDepartment ? "Department" : "Individual",
          employee: task.assignedToDepartment || task.assignedToName || "N/A", // Use assignedToName if it's an individual assignment
          employeeId: task.assignedToEmployeeId,
          dueDate: task.dueDate,
          priority: task.priority,
          status: task.status,
          comments: task.updatesComments || "",
          assignedDate: task.createdAt,
          department: task.assignedToDepartment || "N/A", // Handling cases where no department is assigned
        }));
        setTasks(formattedTasks);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      setTaskDescription(task.taskDescription);
      setAssignType(task.assignType);
      setEmployee(task.employee);
      setEmployeeId(task.employeeId);
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setStatus(task.status);
      setComments(task.comments);
      setEditingTask(task._id); // Store the task's ID instead of index
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const handleDelete = async (taskId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/admin/assigntask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const updatedTasks = tasks.filter((task) => task._id !== taskId); // Filter out the deleted task
      setTasks(updatedTasks);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to delete the task"
      );
    }
  };

  const handleSave = async () => {
    if (editingTask !== null) {
      const taskToEdit = tasks.find((task) => task._id === editingTask); // Use task _id to find the task
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.put(
          `https://apiv2.humanmaximizer.com/api/v1/admin/assigntask/${taskToEdit._id}`,
          {
            assignTaskDesc: taskDescription, // Description of the task
            assignedToDepartment: assignType === "department" ? employee : "-", // Default to "-" if not a department
            assignedToEmployeeId:
              assignType === "individual" ? employeeId : "-", // Default to "-" if not an individual assignment
            assignedBy: "Admin", // This needs to be dynamically fetched if possible, here "Admin" is used as a placeholder
            dueDate: dueDate,
            priority: priority,
            status: status,
            updatesComments: comments,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const updatedTasks = tasks.map((task) =>
          task._id === editingTask
            ? {
                ...task,
                taskDescription,
                assignType,
                employee,
                employeeId,
                dueDate,
                priority,
                status,
                comments,
              }
            : task
        );
        setTasks(updatedTasks);
        // Reset the form and editing state
        setEditingTask(null);
        setTaskDescription("");
        setAssignType("department");
        setEmployee("");
        setEmployeeId("");
        setDueDate("");
        setPriority("High");
        setStatus("Not Started");
        setComments("");
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to update the task"
        );
      }
      setIsModalOpen(false); // Close modal after save
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "tasks.xlsx");
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        (statusFilter === "" || task.status === statusFilter) &&
        (priorityFilter === "" || task.priority === priorityFilter) &&
        (departmentFilter === "" || task.department === departmentFilter) &&
        ((task.employee &&
          task.employee.toLowerCase().includes(search.toLowerCase())) ||
          (task.employeeId &&
            task.employeeId.toLowerCase().includes(search.toLowerCase()))) &&
        (!showCompleted || task.status === "Completed")
    )
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  // Inline CSS for modal
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1050,
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1040,
  };
  return (
    <div className="main">
      {isModalOpen && (
        <div className="hcm-rzr-task-edit-overlay" onClick={handleCloseModal}>
          <div
            className="hcm-rzr-task-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Task</h2>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="hcm-rzr-task-edit-input"
              />

              <label>Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="hcm-rzr-task-edit-input"
              />

              <label>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="hcm-rzr-task-edit-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="hcm-rzr-task-edit-select"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>

              <label>Comments:</label>
              <input
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="hcm-rzr-task-edit-input"
              />

              <button
                onClick={handleSave}
                className="hcm-rzr-task-edit-button save"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="hcm-rzr-task-edit-button close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="all-head d-flex align-items-center justify-content-between mb-3">
              <h4>Assigned task</h4>
            </div>
            <div className="razor-task-admin-filter-container">
              {/* <input
                type="text"
                placeholder="Search by Name or Employee ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="razor-task-admin-input"
              /> */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="razor-task-admin-input"
              >
                <option value="">Status(ALL)</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="razor-task-admin-input"
              >
                <option value="">Priority(ALL)</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="razor-task-admin-input"
              >
                <option value="">Choose Department(ALL)</option>
                <option value="IT">IT</option>
                <option value="BPO">BPO</option>
                <option value="RPO">RPO</option>
              </select>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="razor-task-admin-button"
              >
                {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
              </button>
              <button
                onClick={handleDownload}
                className="razor-task-admin-button"
              >
                Download as Excel
              </button>
            </div>

            <div className="razor-task-admin-table-container">
              <table className="razor-task-admin-table">
                <thead>
                  <tr className="text-center">
                    <th className="razor-task-admin-th">Description</th>
                    <th className="razor-task-admin-th">Assigned To</th>

                    <th className="razor-task-admin-th">Due Date</th>
                    <th className="razor-task-admin-th">Priority</th>
                    <th className="razor-task-admin-th">Status</th>
                    <th className="razor-task-admin-th">Updates</th>
                    <th className="razor-task-admin-th">Assigned Date</th>
                    <th className="razor-task-admin-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, index) => (
                    <tr key={index}>
                      <td
                        className="razor-task-admin-td"
                        data-label="Description"
                      >
                        {editingTask === index ? (
                          <input
                            type="text"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="razor-task-admin-input"
                          />
                        ) : (
                          task.taskDescription
                        )}
                      </td>
                      <td
                        className="razor-task-admin-td"
                        data-label="Assigned To"
                      >
                        {editingTask === index ? (
                          <>
                            <input
                              type="radio"
                              value="department"
                              checked={assignType === "department"}
                              onChange={(e) => setAssignType(e.target.value)}
                            />
                            Department
                            <input
                              type="radio"
                              value="individual"
                              checked={assignType === "individual"}
                              onChange={(e) => setAssignType(e.target.value)}
                            />
                            Individual
                            {assignType === "individual" && (
                              <select
                                value={employee}
                                onChange={(e) => setEmployee(e.target.value)}
                                className="razor-task-admin-input"
                              >
                                <option value="John Doe">John Doe</option>
                                <option value="Jane Smith">Jane Smith</option>
                              </select>
                            )}
                            {assignType === "department" && (
                              <select
                                value={employee}
                                onChange={(e) => setEmployee(e.target.value)}
                                className="razor-task-admin-input"
                              >
                                <option value="Development">Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                              </select>
                            )}
                          </>
                        ) : (
                          task.employee
                        )}
                      </td>
                      {/* <td
                        className="razor-task-admin-td"
                        data-label="Employee ID"
                      >
                        {editingTask === index ? (
                          <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="razor-task-admin-input"
                          />
                        ) : (
                          task.employeeId
                        )}
                      </td> */}
                      <td className="razor-task-admin-td" data-label="Due Date">
                        {editingTask === index ? (
                          <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="razor-task-admin-input"
                          />
                        ) : (
                          convertToIST(task.dueDate)
                        )}
                      </td>
                      <td className="razor-task-admin-td" data-label="Priority">
                        {editingTask === index ? (
                          <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="razor-task-admin-input"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        ) : (
                          task.priority
                        )}
                      </td>
                      <td className="razor-task-admin-td" data-label="Status">
                        {editingTask === index ? (
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="razor-task-admin-input"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        ) : (
                          task.status
                        )}
                      </td>
                      <td
                        className="razor-task-admin-td"
                        data-label="Updates/Comments"
                      >
                        {editingTask === index ? (
                          <input
                            type="text"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="razor-task-admin-input"
                          />
                        ) : (
                          task.comments
                        )}
                      </td>
                      <td
                        className="razor-task-admin-td"
                        data-label="Assigned Date"
                      >
                        {convertToIST(task.assignedDate)}
                      </td>
                      <td className="razor-task-admin-td" data-label="Actions">
                        {task.status !== "Completed" && (
                          <>
                            <span
                              onClick={() => handleEdit(task._id)}
                              className="p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#05941d"
                                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                                />
                              </svg>
                            </span>

                            <span
                              onClick={() => handleDelete(task._id)}
                              className="p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="17.5"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#b10606"
                                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                                />
                              </svg>
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AutomatedPerformanceReview tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTaskAssignedAdmin;
