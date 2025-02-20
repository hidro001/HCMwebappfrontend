// AssignedTask.jsx
import  { useState, useEffect } from "react";
import {
  FaEye,

} from "react-icons/fa";
import AssignedTaskModal from "./AssignedTaskModal"; // View Task

import {  fetchTasksEmp } from "../../../../service/taskService";


const AssignedTask = () => {

  const [isViewOpen, setIsViewOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Function to refresh tasks from the server.
  const refreshTasks = async () => {
    const fetchedTasks = await fetchTasksEmp();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);


  
  // Open View Task Modal
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };



  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
     
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assigned Task</h2>
       
      </div>

    

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 border dark:border-gray-700">S.L</th>
              <th className="p-3 border dark:border-gray-700">Emp ID</th>
              <th className="p-3 border dark:border-gray-700">Emp Name</th>
              <th className="p-3 border dark:border-gray-700">Assigned Date</th>
              <th className="p-3 border dark:border-gray-700">Due Date</th>
              <th className="p-3 border dark:border-gray-700">Priority</th>
              <th className="p-3 border dark:border-gray-700">Status</th>
              <th className="p-3 border dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-3 text-center">
                  No data available.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-3 border dark:border-gray-700">{index + 1}</td>
                  <td className="p-3 border text-blue-600 dark:border-gray-700">
                    {task.assignedToEmployeeId}
                  </td>
                  <td className="p-3 border dark:border-gray-700">{task.assignedByName}</td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.dueDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                  <td className={`p-3 border dark:border-gray-700 font-semibold ${
                    task.priority === "High" ? "text-red-600" :
                    task.priority === "Medium" ? "text-orange-500" : "text-green-600"
                  }`}>
                    {task.priority}
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      task.status === "Completed" ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200" :
                      task.status === "In Progress" ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200" :
                      "bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-200"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 border dark:border-gray-700 flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                      onClick={() => handleViewTask(task)}
                    >
                      <FaEye />
                    </button>
                
                 
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Task Modal */}
      {isViewOpen && (
        <AssignedTaskModal
          task={selectedTask}
          onClose={() => setIsViewOpen(false)}
        />
      )}

    
    </div>
  );
};

export default AssignedTask;
