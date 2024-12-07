// File: src/components/TasksAssignedBySubordinates.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Sample data (replace this with your API call)
const sampleData = {
  success: true,
  message: "Tasks assigned by subordinates fetched successfully.",
  data: [
    {
      taskDescription: "Complete the quarterly sales report.",
      updatesComments: "Include the latest data from all regions.",
      assignedTo: {
        name: "Amit Kumar",
        employeeId: "RI00233",
        designation: "Sales Manager",
        department: "Sales",
      },
      assignedBy: {
        name: "Nikunj Gupta",
        employeeId: "RI0015",
        role: "Employee",
      },
      dueDate: "2024-12-10T00:00:00.000Z",
      priority: "High",
      status: "In Progress",
      createdAt: "2024-12-04T05:39:57.380Z",
      updatedAt: "2024-12-04T05:40:05.444Z",
    },
    // Add more tasks as needed
  ],
};

const TasksAssignedBySubordinates = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksAssignedBySubordinates();
  }, []);

  const fetchTasksAssignedBySubordinates = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/admin/assigned-by-subordinates",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire(
        "Error",
        "Failed to fetch tasks assigned by subordinates.",
        "error"
      );

      // For demonstration purposes, using sample data
      setTasks(sampleData.data);
    }
  };

  // Function to determine priority styles
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  // Function to calculate progress based on status
  const getProgressValue = (status) => {
    switch (status) {
      case "Completed":
        return 100;
      case "In Progress":
        return 50;
      case "Not Started":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="tasks-assigned-container">
      <h2>Tasks Assigned by Subordinates</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned by subordinates.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-card-header">
              <div className="assigned-by">
                <div className="avatar">{task.assignedBy.name.charAt(0)}</div>
                <div className="assigned-by-info">
                  <span>Assigned By</span>
                  <h3>{task.assignedBy.name}</h3>
                </div>
              </div>
              <div
                className={`priority-badge ${getPriorityClass(task.priority)}`}
              >
                {task.priority}
              </div>
            </div>
            <div className="task-card-body">
              <h3 className="task-title">{task.taskDescription}</h3>
              <p className="task-comments">{task.updatesComments}</p>
              <div className="task-details">
                <div className="detail-item">
                  <span className="detail-label">Assigned To:</span>
                  <span className="detail-value">
                    {task.assignedTo.name} ({task.assignedTo.employeeId})
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Due Date:</span>
                  <span className="detail-value">
                    {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Assigned By:</span>
                  <span className="detail-value">
                    {task.assignedBy.name} ({task.assignedBy.employeeId})
                  </span>
                </div>
              </div>
              <div className="task-status">
                <div
                  className={`status-badge status-${task.status
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {task.status}
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${getProgressValue(task.status)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Include CSS in the same file */}
      <style>{`
        .tasks-assigned-container {
          padding: 20px;
          background-color: #f5f6fa;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          color: #333;
          margin-bottom: 24px;
        }
        .task-card {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          margin-bottom: 24px;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .task-card:hover {
          transform: translateY(-5px);
        }
        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: #f1f1f1;
        }
        .assigned-by {
          display: flex;
          align-items: center;
        }
        .avatar {
          background-color: #0d47a1;
          color: #fff;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          font-size: 24px;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }
        .assigned-by-info span {
          font-size: 12px;
          color: #888;
          display: block;
        }
        .assigned-by-info h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }
        .priority-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
        }
        .priority-high {
          background-color: #d32f2f;
        }
        .priority-medium {
          background-color: #ed6c02;
        }
        .priority-low {
          background-color: #2e7d32;
        }
        .task-card-body {
          padding: 16px;
        }
        .task-title {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: #333;
        }
        .task-comments {
          margin: 0 0 16px 0;
          color: #555;
          font-size: 14px;
        }
        .task-details {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .detail-item {
          flex: 1 1 200px;
          margin-bottom: 8px;
        }
        .detail-label {
          font-weight: bold;
          color: #666;
          margin-right: 8px;
          display: inline-block;
        }
        .detail-value {
          color: #333;
        }
        .task-status {
          display: flex;
          align-items: center;
        }
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
          margin-right: 16px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
        }
        .status-completed {
          background-color: #2e7d32;
        }
        .status-in-progress {
          background-color: #ed6c02;
        }
        .status-not-started {
          background-color: #d32f2f;
        }
        .progress-bar-container {
          flex: 1;
        }
        .progress-bar {
          width: 100%;
          background-color: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          height: 10px;
        }
        .progress-fill {
          height: 100%;
          background-color: #0d47a1;
          transition: width 0.3s ease-in-out;
        }
        @media (max-width: 600px) {
          .task-details {
            flex-direction: column;
          }
          .detail-item {
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default TasksAssignedBySubordinates;
