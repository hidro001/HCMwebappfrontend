import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ActionTrackerAdmin = () => {
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [updatesComments, setUpdatesComments] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    fetchAllocatedDepartments();
  }, []);

  const fetchAllocatedDepartments = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/departmentAlocated/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const validDepartments = response.data.departmentAlocated.filter(
        (dept) => !dept.includes("[") && !dept.includes("]")
      );
      setDepartments(validDepartments);
    } catch (error) {
      console.error("Failed to fetch departments.", error);
    }
  };

  const fetchTeams = async (department) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/admin/team/team-list/?department=${department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const { data: teamData } = response.data;
      setTeams(teamData);
    } catch (error) {
      console.error("Failed to fetch teams.", error);
    }
  };

  const handleDepartmentChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDepartment(selectedDept);
    setSelectedTeams([]); // Clear previously selected teams
    if (selectedDept) {
      fetchTeams(selectedDept); // Fetch teams for the selected department
    }
  };

  const handleTeamCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTeams((prev) => [...prev, value]);
    } else {
      setSelectedTeams((prev) => prev.filter((team) => team !== value));
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to assign this task?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Payload with selected department and teams
          const payload = {
            assignTaskDesc: taskDesc,
            selectedDepartment,
            selectedTeam: selectedTeams,
            dueDate,
            priority,
            updatesComments,
          };

          console.log("Payload to be sent:", payload);
          const accessToken = localStorage.getItem("accessToken");

          const response = await axios.post(
            "https://apiv2.humanmaximizer.com/api/v1/admin/assigntask",
            payload,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          toast.success(response.data.message);
        } catch (error) {
          console.error("Error assigning task:", error.message);
          toast.error("Failed to assign task: " + error.message);
        }
      }
    });
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
          <div className="row">
            <div className="hm-rzr-task-assign-admin">
              <div className="hm-rzr-task-assign-admin-header d-flex justify-content-between align-items-center mb-3">
                <h2>Assign Task</h2>
                <Link to="/dashboard/admin-action-tracker/task-assigned-admin">
                  <button className="show-tasks-button">
                    Show Tasks Assigned
                  </button>
                </Link>
              </div>

              <form
                onSubmit={handleTaskSubmit}
                className="rzr-action-admin-form"
              >
                <div className="rzr-action-admin-formGroup floating-label">
                  <input
                    type="text"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    required
                    className="rzr-action-admin-input"
                  />
                  <label>Task Description</label>
                </div>

                <div className="rzr-action-admin-formGroup floating-label">
                  <select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="rzr-action-admin-input"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <label>Select Department</label>
                </div>

                {selectedDepartment && (
                  <div className="rzr-action-admin-formGroup">
                    <label>Select Teams:</label>
                    {teams.map((team) => (
                      <div key={team}>
                        <label>
                          <input
                            type="checkbox"
                            value={team}
                            checked={selectedTeams.includes(team)}
                            onChange={handleTeamCheckboxChange}
                          />
                          {team}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rzr-action-admin-formGroup floating-label">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="rzr-action-admin-input"
                  />
                  <label>Due Date</label>
                </div>

                <div className="rzr-action-admin-formGroup floating-label">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="rzr-action-admin-input"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <label>Priority</label>
                </div>

                <div className="rzr-action-admin-formGroup floating-label">
                  <textarea
                    value={updatesComments}
                    onChange={(e) => setUpdatesComments(e.target.value)}
                    required
                    className="rzr-action-admin-input"
                  ></textarea>
                  <label>Updates/Comments</label>
                </div>

                <button
                  type="submit"
                  className="hm-rzr-task-assign-admin-button"
                >
                  Assign Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionTrackerAdmin;
