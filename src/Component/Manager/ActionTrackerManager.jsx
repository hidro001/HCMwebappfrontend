import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionTrackerManager = () => {
  const [employee, setEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [updatesComments, setUpdatesComments] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch subordinates from the API on component mount
  useEffect(() => {
    const fetchSubordinates = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/admin/subordinates",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error("Error fetching subordinates:", error.message);
        Swal.fire("Error", "Failed to fetch subordinates", "error");
      }
    };

    fetchSubordinates();
  }, []);

  // Function to assign task
  const assignTaskToManager = async (
    taskDescription,
    dueDate,
    priority,
    updatesComments,
    assignedTo
  ) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/admin/assign",
        {
          title: taskDescription, // Maps to assignTaskDesc
          description: updatesComments, // Maps to updatesComments
          assigned_to: assignedTo, // Employee ID
          due_date: dueDate, // Due date
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to assign task");
    }
  };

  // Handle task submission
  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields: task, employeeId, dueDate
    if (!task || !employeeId || !dueDate) {
      Swal.fire(
        "Error",
        "Please fill out all required fields: Task Description, Assigned To, and Due Date.",
        "error"
      );
      return;
    }

    // Debugging: Log the payload being sent
    console.log("Submitting Task:", {
      title: task,
      description: updatesComments,
      assigned_to: employeeId,
      due_date: dueDate,
      priority,
    });

    Swal.fire({
      title: "Are you sure?",
      text: "You want to assign this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign it!",
    }).then((result) => {
      if (result.isConfirmed) {
        assignTaskToManager(
          task,
          dueDate,
          priority,
          updatesComments,
          employeeId
        )
          .then((response) => {
            setTasks([...tasks, response.data]);
            setTask("");
            setDueDate("");
            setPriority("High");
            setUpdatesComments("");
            setEmployee("");
            setEmployeeId("");
            setSelectedEmployee(null); // Reset selected employee
            toast.success("Task assigned successfully!");
          })
          .catch((error) => {
            console.error("Error assigning task:", error.message);
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  // Search employees
  const searchEmployee = async (query) => {
    if (!query) {
      console.error(
        "Query parameter is required and should be a non-empty string."
      );
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/admin/subordinates?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      Swal.fire("Error", "Failed to search employees", "error");
    }
  };

  // Handle employee search input
  const handleEmployeeSearch = (event) => {
    const query = event.target.value;
    setEmployee(query);
    if (query.trim() !== "") {
      searchEmployee(query.trim());
    } else {
      setSearchResults([]);
    }
  };

  // Handle employee selection from dropdown
  const handleEmployeeSelect = (employee) => {
    setEmployee(`${employee.first_Name} ${employee.last_Name}`); // Display full name
    setEmployeeId(employee.employee_Id); // Store employee ID
    setSelectedEmployee(employee); // Store the full employee object
    setSearchResults([]); // Clear search results
  };

  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="ems-content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className="rzr-hm-action-tracker-hr">
                <div className="rzr-hm-asigntask-header d-flex justify-content-between align-items-center mb-3">
                  <h2>Assign Task</h2>
                  <Link to="/dashboard/manager-action-tracker/task-assigned-manager">
                    <button className="rzr-hm-asigntask-button show-tasks-button">
                      Show Tasks Assigned
                    </button>
                  </Link>
                </div>

                <form
                  onSubmit={handleTaskSubmit}
                  className="rzr-hm-asigntask-form"
                >
                  {/* Task Description */}
                  <div className="rzr-hm-asigntask-formGroup floating-label">
                    <textarea
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      required
                      className="rzr-hm-asigntask-input"
                      placeholder="Task Description"
                    ></textarea>
                    <label>Task Description</label>
                  </div>

                  {/* Assigned To */}
                  <div className="rzr-hm-asigntask-formGroup floating-label">
                    <input
                      type="text"
                      placeholder="Search Employee"
                      value={employee}
                      onChange={handleEmployeeSearch}
                      className="rzr-hm-asigntask-input"
                      required
                    />
                    <label>Assigned To</label>
                    {Array.isArray(searchResults) &&
                      searchResults.length > 0 && (
                        <div className="rzr-hm-asigntask-dropdown">
                          {searchResults.map((result) => (
                            <div
                              key={result.employee_Id}
                              onClick={() => handleEmployeeSelect(result)}
                              className="rzr-hm-asigntask-dropdownItem"
                            >
                              {result.first_Name} {result.last_Name} -{" "}
                              {result.designation} -{" "}
                              {result.employee_Id}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Due Date and Priority */}
                  {/* <div className="rzr-hm-asigntask-row">
                    <div className="rzr-hm-asigntask-formGroup floating-label">
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="rzr-hm-asigntask-input"
                      />
                      <label>Due Date</label>
                    </div>

                    <div className="rzr-hm-asigntask-formGroup floating-label">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="rzr-hm-asigntask-input"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <label>Priority</label>
                    </div>
                  </div> */}

<div className="rzr-hm-asigntask-row">
  <div className="rzr-hm-asigntask-formGroup floating-label">
    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      required
      min={new Date().toISOString().split("T")[0]} // Disable past dates
      className="rzr-hm-asigntask-input"
    />
    <label>Due Date</label>
  </div>

  <div className="rzr-hm-asigntask-formGroup floating-label">
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="rzr-hm-asigntask-input"
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <label>Priority</label>
  </div>
</div>


                  {/* Updates/Comments */}
                  <div className="rzr-hm-asigntask-formGroup floating-label">
                    <textarea
                      value={updatesComments}
                      onChange={(e) => setUpdatesComments(e.target.value)}
                      className="rzr-hm-asigntask-input"
                      placeholder="Updates/Comments"
                    ></textarea>
                    <label>Updates/Comments</label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="rzr-hm-asigntask-button">
                    Assign Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles (optional, can be moved to CSS file) */}
      <style jsx>{`
        .main {
          padding: 20px;
        }
        .rzr-hm-action-tracker-hr {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .rzr-hm-asigntask-header h2 {
          margin: 0;
        }
        .show-tasks-button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        .show-tasks-button:hover {
          background-color: #218838;
        }
        .rzr-hm-asigntask-formGroup {
          position: relative;
          margin-bottom: 20px;
        }
        .floating-label {
          position: relative;
        }
        .rzr-hm-asigntask-input {
          width: 100%;
          padding: 10px 10px 10px 5px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
        }
        .rzr-hm-asigntask-input:focus {
          border-color: #007bff;
        }
        .floating-label label {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          background: white;
          padding: 0 5px;
          color: #999;
          pointer-events: none;
          transition: 0.2s ease all;
        }
        .rzr-hm-asigntask-input:focus + label,
        .rzr-hm-asigntask-input:not(:placeholder-shown) + label {
          top: -10px;
          font-size: 12px;
          color: #007bff;
        }
        .rzr-hm-asigntask-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          border-top: none;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        .rzr-hm-asigntask-dropdownItem {
          padding: 10px;
          cursor: pointer;
        }
        .rzr-hm-asigntask-dropdownItem:hover {
          background-color: #f1f1f1;
        }
        .rzr-hm-asigntask-row {
          display: flex;
          gap: 20px;
        }
        .rzr-hm-asigntask-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .rzr-hm-asigntask-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ActionTrackerManager;
