import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/superadmin";
const API_URL1 = "https://apiv2.humanmaximizer.com/api/v1/admin";

const ViewTask = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${API_URL}/departmentAlocated/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const validDepartments = response.data.departmentAlocated.filter(
        (dept) => !dept.includes("[") && !dept.includes("]")
      );
      setDepartments(validDepartments);
    } catch (error) {
      setError("Failed to fetch departments.");
    }
  };

  const fetchTeams = async (department) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${API_URL1}/team/team-list/?department=${department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // The response format is assumed to be like this: {"success": true, "totalCount": 4, "data": ["google", "newsample", "Team 1", "Team2"]}
      const { data: teamData } = response.data;
      setTeams(teamData); // Set the team names from the `data` array
    } catch (error) {
      setError("Failed to fetch teams.");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    fetchTeams(department); // Fetch teams based on the selected department
  };

  // Add 'department' to the state being passed
  const handleTeamClick = (team) => {
    navigate("/dashboard/view-task/task-detail", {
      state: { team, department: selectedDepartment },
    });
  };

  return (
    <div className="main">
      <section className="ems-content p-3">
        <div className="container">
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display Departments */}
          <div className="rzr-hm-view-task-dept">
            <h4>Departments</h4>
            <div className="row mt-4">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 col-sm-12"
                  onClick={() => handleDepartmentClick(dept)}
                >
                  <div className="stats">
                    <div className="number-stats">
                      <span>{dept}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedDepartment && (
              <>
                <h4 className="mt-4">Teams in {selectedDepartment}</h4>
                <div className="row mt-4">
                  {teams.length > 0 ? (
                    teams.map((team, index) => (
                      <div
                        key={index}
                        className={`col-lg-4 col-md-6 col-sm-12 team-card ${
                          index >= 3 ? "team-card-row-2" : ""
                        }`}
                        onClick={() => handleTeamClick(team)}
                      >
                        <div className="stats">
                          <div className="number-stats">
                            <span>{team}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No teams available for this department.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTask;
