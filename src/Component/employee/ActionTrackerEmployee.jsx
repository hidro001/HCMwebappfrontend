import { useState, useEffect } from "react";
import TasksAssignedBySubordinates from "./TaskAssignedBySubordinates";

const ActionTrackerEmployee = () => {
  const [individualTasks, setIndividualTasks] = useState([]);
  const [departmentTasks, setDepartmentTasks] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Function to convert date to IST
  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  // Fetch tasks and reviews when the component mounts
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    // Fetch individual tasks
    const fetchIndividualTasks = async () => {
      const url = "https://apiv2.humanmaximizer.com/api/v1/admin/individual";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIndividualTasks(data.success ? data.data : []);
      } catch (error) {
        console.error("Error fetching individual tasks:", error);
        setIndividualTasks([]);
      }
    };

    // Fetch department tasks
    const fetchDepartmentTasks = async () => {
      const url = "https://apiv2.humanmaximizer.com/api/v1/employee/tasks/department";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setDepartmentTasks(result.success ? result.data : []);
      } catch (error) {
        console.error("Error fetching department tasks:", error);
        setDepartmentTasks([]);
      }
    };

    // Fetch reviews
    const fetchReviews = async () => {
      const url = "https://apiv2.humanmaximizer.com/api/v1/employee/reviews";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.success ? data.data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    fetchIndividualTasks();
    fetchDepartmentTasks();
    fetchReviews();
  }, []);

  const truncateText = (text, maxLength) => {
    if (typeof text !== "string") return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="main">
      <div className="ems-content">
        <div className="razr-task-dashboard">
          <div className="row">
            {/* Individual Tasks */}
            <div className="col-12">
              <div className="razr-task-card">
                <div className="razr-task-header d-flex align-items-center justify-content-between">
                  <h4>Your Tasks</h4>
                </div>
                <div className="razr-task-table-container mt-4 mb-4">
                  <table className="razr-task-table table table-hover table-bordered table-striped">
                    <thead>
                      <tr className="razr-task-tr razr-action-tr">
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Assigned Date</th>
                        <th>Assigned By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {individualTasks.map((task, index) => (
                        <tr
                          key={index}
                          className="razr-task-des razr-action-des"
                        >
                          <td>{task.assignTaskDesc}</td>
                          <td>{convertToIST(task.due_date)}</td>
                          <td
                            className={
                              task.priority === "High"
                                ? "high-priority"
                                : task.priority === "Medium"
                                ? "medium-priority"
                                : "low-priority"
                            }
                          >
                            {task.priority}
                          </td>
                          <td>{task.status}</td>
                          <td>{truncateText(task.updatesComments, 50)}</td>
                          <td>{convertToIST(task.createdAt)}</td>
                          <td>{task.assignedByName}</td>
                        </tr>
                      ))}
                      {individualTasks.length === 0 && (
                        <tr>
                          <td colSpan="7">No individual tasks found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <TasksAssignedBySubordinates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionTrackerEmployee;
