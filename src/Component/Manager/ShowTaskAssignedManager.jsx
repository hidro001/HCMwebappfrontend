// import { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AutomatedPerformanceReview from "../Manager/AutomatedPerformanceReview";
// import axios from "axios";

// const ShowTaskAssignedManager = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   // Form fields
//   const [taskDescription, setTaskDescription] = useState("");
//   const [assignType, setAssignType] = useState("department");
//   const [employee, setEmployee] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("High");
//   const [status, setStatus] = useState("Not Started");
//   const [comments, setComments] = useState("");

//   // Filters
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [showCompleted, setShowCompleted] = useState(false);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/admin/assign",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           const tasks = response.data.data.map((task) => ({
//             _id: task._id,
//             taskDescription: task.assignTaskDesc,
//             assignType: task.assignedToDepartment ? "Department" : "Individual",
//             employee: task.assignedToName || task.assignedToDepartment || "N/A",
//             employeeId: task.assignedToEmployeeId || "-",
//             dueDate: task.dueDate,
//             priority: task.priority,
//             status: task.status,
//             comments: task.updatesComments || "",
//             assignedDate: task.createdAt,
//             department: task.selectedDepartment || "N/A",
//           }));
//           setTasks(tasks);
//         } else {
//           console.error("Failed to fetch tasks: ", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching tasks: ", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleEdit = (taskId) => {
//     const task = tasks.find((task) => task._id === taskId);
//     if (task) {
//       setTaskDescription(task.taskDescription);
//       setAssignType(task.assignType);
//       setEmployee(task.employee);
//       setEmployeeId(task.employeeId);
//       setDueDate(task.dueDate);
//       setPriority(task.priority);
//       setStatus(task.status);
//       setComments(task.comments);
//       setEditingTask(task._id);
//       setIsModalOpen(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingTask(null);
//   };

//   const convertToIST = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.delete(
//         `https://apiv2.humanmaximizer.com/api/v1/admin/assign/${taskId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         const updatedTasks = tasks.filter((task) => task._id !== taskId);
//         setTasks(updatedTasks);
//       } else {
//         console.error("Failed to delete task: ", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting task: ", error);
//     }
//   };

//   const handleSave = async () => {
//     if (editingTask !== null) {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const payload = {
//           assignTaskDesc: taskDescription,
//           updatesComments: comments,
//           dueDate: dueDate,
//           priority: priority,
//           status: status,
//           // Include other fields as needed
//         };
//         const response = await axios.put(
//           `https://apiv2.humanmaximizer.com/api/v1/admin/assign/${editingTask}`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           const updatedTask = response.data.data;
//           const updatedTasks = tasks.map((task) =>
//             task._id === editingTask ? { ...task, ...updatedTask } : task
//           );
//           setTasks(updatedTasks);
//           // Reset form and close modal
//           setEditingTask(null);
//           setTaskDescription("");
//           setAssignType("department");
//           setEmployee("");
//           setEmployeeId("");
//           setDueDate("");
//           setPriority("High");
//           setStatus("Not Started");
//           setComments("");
//           setIsModalOpen(false);
//         } else {
//           console.error("Failed to update task: ", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error updating task: ", error);
//       }
//     }
//   };

//   const handleDownload = () => {
//     const ws = XLSX.utils.json_to_sheet(tasks);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Tasks");
//     XLSX.writeFile(wb, "tasks.xlsx");
//   };

//   const handleSort = (key) => {
//     const sortedTasks = [...tasks].sort((a, b) => a[key].localeCompare(b[key]));
//     setTasks(sortedTasks);
//   };

//   const filteredTasks = tasks
//     .filter(
//       (task) =>
//         (statusFilter === "" || task.status === statusFilter) &&
//         (priorityFilter === "" || task.priority === priorityFilter) &&
//         (departmentFilter === "" || task.department === departmentFilter) &&
//         ((task.employee &&
//           task.employee.toLowerCase().includes(search.toLowerCase())) ||
//           (task.employeeId &&
//             task.employeeId.toLowerCase().includes(search.toLowerCase()))) &&
//         (!showCompleted || task.status === "Completed")
//     )
//     .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

//   return (
//     <div style={styles.main}>
//       {isModalOpen && (
//         <div style={styles.modalOverlay} onClick={handleCloseModal}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <h2 style={styles.modalTitle}>Edit Task</h2>
//             <div style={styles.modalBody}>
//               <label style={styles.modalLabel}>Description:</label>
//               <input
//                 type="text"
//                 value={taskDescription}
//                 onChange={(e) => setTaskDescription(e.target.value)}
//                 style={styles.modalInput}
//               />

//               <label style={styles.modalLabel}>Due Date:</label>
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 style={styles.modalInput}
//               />

//               <label style={styles.modalLabel}>Priority:</label>
//               <select
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//                 style={styles.modalSelect}
//               >
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>

//               <label style={styles.modalLabel}>Status:</label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 style={styles.modalSelect}
//               >
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//                 <option value="On Hold">On Hold</option>
//               </select>

//               <label style={styles.modalLabel}>Comments:</label>
//               <textarea
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 style={styles.modalTextarea}
//               />

//               <div style={styles.modalButtons}>
//                 <button onClick={handleSave} style={styles.saveButton}>
//                   Save
//                 </button>
//                 <button onClick={handleCloseModal} style={styles.closeButton}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="ems-content">
//         <div className="container">
//           <div className="hm-asgn-taskmng">
//             <div className="">
//               <h4>
//                 {" "}
//                 <b> Assigned Tasks</b>
//               </h4>
//             </div>
//             <div className="filters">
//               <input
//                 type="text"
//                 placeholder="Search by Name or Employee ID"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">Status (ALL)</option>
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//                 <option value="On Hold">On Hold</option>
//               </select>
//               <select
//                 value={priorityFilter}
//                 onChange={(e) => setPriorityFilter(e.target.value)}
//               >
//                 <option value="">Priority (ALL)</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//               <select
//                 value={departmentFilter}
//                 onChange={(e) => setDepartmentFilter(e.target.value)}
//               >
//                 <option value="">Department (ALL)</option>
//                 <option value="IT">IT</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Sales">Sales</option>
//               </select>
//               <button onClick={() => setShowCompleted(!showCompleted)}>
//                 {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
//               </button>
//               <button onClick={handleDownload}>Download as Excel</button>
//             </div>

//             <div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th onClick={() => handleSort("taskDescription")}>
//                       Description
//                     </th>
//                     <th onClick={() => handleSort("employee")}>Assigned To</th>
//                     <th onClick={() => handleSort("dueDate")}>Due Date</th>
//                     <th onClick={() => handleSort("priority")}>Priority</th>
//                     <th onClick={() => handleSort("status")}>Status</th>
//                     <th>Updates</th>
//                     <th>Assigned Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredTasks.map((task) => (
//                     <tr key={task._id}>
//                       <td>{task.taskDescription}</td>
//                       <td>{task.employee}</td>
//                       <td>{convertToIST(task.dueDate)}</td>
//                       <td>{task.priority}</td>
//                       <td>{task.status}</td>
//                       <td>{task.comments}</td>
//                       <td>{convertToIST(task.assignedDate)}</td>
//                       <td>
//                         {task.status !== "Completed" && (
//                           <div className="actionIcons">
//                             <span
//                               onClick={() => handleEdit(task._id)}
//                               className="actionIcons"
//                               title="Edit Task"
//                             >
//                               {/* Edit Icon */}
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="20"
//                                 width="20"
//                                 viewBox="0 0 512 512"
//                               >
//                                 <path
//                                   fill="#05941d"
//                                   d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
//                                 />
//                               </svg>
//                             </span>
//                             <span
//                               onClick={() => handleDelete(task._id)}
//                               className="actionIcons"
//                               title="Delete Task"
//                             >
//                               {/* Delete Icon */}
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="20"
//                                 width="17.5"
//                                 viewBox="0 0 448 512"
//                               >
//                                 <path
//                                   fill="#b10606"
//                                   d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
//                                 />
//                               </svg>
//                             </span>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredTasks.length === 0 && (
//                     <tr>
//                       <td colSpan="8" className="noTasks">
//                         No tasks found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <AutomatedPerformanceReview tasks={tasks} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // CSS styles within the file
// const styles = {
//   main: {
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: "#f4f6f9",
//     minHeight: "100vh",
//     padding: "20px",
//   },
//   emsContent: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     padding: "20px",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//   },
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//   },
//   taskSection: {
//     marginTop: "20px",
//   },
//   header: {
//     borderBottom: "1px solid #e0e0e0",
//     paddingBottom: "10px",
//     marginBottom: "20px",
//   },
//   headerTitle: {
//     color: "#333",
//     fontSize: "24px",
//     margin: "0",
//   },
//   filterContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   filterInput: {
//     flex: "1",
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     minWidth: "150px",
//   },
//   filterButton: {
//     padding: "8px 16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   tableContainer: {
//     overflowX: "auto",
//   },
//   taskTable: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   tableHeaderRow: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//   },
//   tableHeader: {
//     padding: "10px",
//     textAlign: "left",
//     cursor: "pointer",
//     whiteSpace: "nowrap",
//   },
//   tableRow: {
//     backgroundColor: "#fff",
//     transition: "background-color 0.2s",
//   },
//   tableCell: {
//     padding: "10px",
//     borderBottom: "1px solid #e0e0e0",
//     whiteSpace: "nowrap",
//   },
//   actionIcons: {
//     display: "flex",
//     gap: "10px",
//   },
//   actionIcon: {
//     cursor: "pointer",
//     display: "inline-flex",
//     alignItems: "center",
//   },
//   noTasks: {
//     textAlign: "center",
//     padding: "20px",
//     color: "#777",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     zIndex: 999,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     width: "500px",
//     maxWidth: "90%",
//     padding: "20px",
//     position: "relative",
//   },
//   modalTitle: {
//     marginTop: "0",
//     marginBottom: "20px",
//   },
//   modalBody: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   modalLabel: {
//     fontWeight: "bold",
//   },
//   modalInput: {
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   modalSelect: {
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   modalTextarea: {
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     minHeight: "80px",
//   },
//   modalButtons: {
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: "10px",
//     marginTop: "20px",
//   },
//   saveButton: {
//     padding: "8px 16px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   closeButton: {
//     padding: "8px 16px",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default ShowTaskAssignedManager;

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import AutomatedPerformanceReview from "../Manager/AutomatedPerformanceReview";
import axios from "axios";

const ShowTaskAssignedManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Form fields
  const [taskDescription, setTaskDescription] = useState("");
  const [assignType, setAssignType] = useState("department");
  const [employee, setEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Not Started");
  const [comments, setComments] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/admin/assign",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          const tasks = response.data.data.map((task) => ({
            _id: task._id,
            taskDescription: task.assignTaskDesc,
            assignType: task.assignedToDepartment ? "Department" : "Individual",
            employee: task.assignedToName || task.assignedToDepartment || "N/A",
            employeeId: task.assignedToEmployeeId || "-",
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status,
            comments: task.updatesComments || "",
            assignedDate: task.createdAt,
            department: task.selectedDepartment || "N/A",
          }));
          setTasks(tasks);
        } else {
          console.error("Failed to fetch tasks: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

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
      setEditingTask(task._id);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const handleDelete = async (taskId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/admin/assign/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error("Failed to delete task: ", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleSave = async () => {
    if (editingTask !== null) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const payload = {
          assignTaskDesc: taskDescription,
          updatesComments: comments,
          dueDate: dueDate,
          priority: priority,
          status: status,
          // Include other fields as needed
        };
        const response = await axios.put(
          `https://apiv2.humanmaximizer.com/api/v1/admin/assign/${editingTask}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          const updatedTask = response.data.data;
          const updatedTasks = tasks.map((task) =>
            task._id === editingTask ? { ...task, ...updatedTask } : task
          );
          setTasks(updatedTasks);
          // Reset form and close modal
          setEditingTask(null);
          setTaskDescription("");
          setAssignType("department");
          setEmployee("");
          setEmployeeId("");
          setDueDate("");
          setPriority("High");
          setStatus("Not Started");
          setComments("");
          setIsModalOpen(false);
        } else {
          console.error("Failed to update task: ", response.data.message);
        }
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      tasks.map(({ _id, employeeId, ...task }) => ({
        ...task,
        employeeId, // Include Employee ID in the download
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "tasks.xlsx");
  };

  const handleSort = (key) => {
    const sortedTasks = [...tasks].sort((a, b) => a[key].localeCompare(b[key]));
    setTasks(sortedTasks);
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

  return (
    <div style={styles.main}>
      <div className="ems-content">
        <div className="container">
          <div className="hm-asgn-taskmng">
            <div className="">
              <h4>
                {" "}
                <b> Assigned Tasks</b>
              </h4>
            </div>
            <div className="filters">
              <input
                type="text"
                placeholder="Search by Name or Employee ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status (ALL)</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">Priority (ALL)</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Department (ALL)</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
              <button onClick={() => setShowCompleted(!showCompleted)}>
                {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
              </button>
              <button onClick={handleDownload}>Download as Excel</button>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("taskDescription")}>
                      Description
                    </th>
                    <th onClick={() => handleSort("employee")}>
                      Assigned To
                    </th>
                    <th onClick={() => handleSort("employeeId")}>
                      Employee ID
                    </th>
                    <th onClick={() => handleSort("dueDate")}>Due Date</th>
                    <th onClick={() => handleSort("priority")}>Priority</th>
                    <th onClick={() => handleSort("status")}>Status</th>
                    <th>Updates</th>
                    <th>Assigned Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.taskDescription}</td>
                      <td>{task.employee}</td>
                      <td>{task.employeeId}</td>
                      <td>{convertToIST(task.dueDate)}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>{task.comments}</td>
                      <td>{convertToIST(task.assignedDate)}</td>
                      <td>
                        {task.status !== "Completed" && (
                          <div className="actionIcons">
                            <span
                              onClick={() => handleEdit(task._id)}
                              className="actionIcons"
                              title="Edit Task"
                            >
                              {/* Edit Icon */}
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
                              className="actionIcons"
                              title="Delete Task"
                            >
                              {/* Delete Icon */}
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
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan="9" className="noTasks">
                        No tasks found
                      </td>
                    </tr>
                  )}
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

// CSS styles within the file
const styles = {
  main: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    padding: "20px",
  },
  emsContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  noTasks: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
  },
};

export default ShowTaskAssignedManager;

