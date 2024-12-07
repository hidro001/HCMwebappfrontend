import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/admin";

const ManageDepartmentDetail = () => {
  const { department } = useParams(); // Get department name from route params
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch teams for the department
  const fetchTeams = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_URL}/team`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          department,
        },
      });
      setTeams(response.data.teams || []); // Populate teams data
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch teams");
    }
  };

  // Add a new team (both team name and department are required)
  const addTeam = async () => {
    if (!teamName || !department) {
      setError("Both Team Name and Department Name are required.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${API_URL}/team`,
        {
          teamName: teamName.trim(),
          departmentName: department.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTeams([...teams, response.data.team]); // Add the new team to the list
      setTeamName(""); // Reset the team name input
      setIsModalOpen(false); // Close modal
      setError(null); // Clear any existing errors
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add team");
    }
  };

  // Fetch teams when department changes
  useEffect(() => {
    fetchTeams();
  }, [department]);

  const handleTeamClick = (teamName) => {
    navigate(`/dashboard/all-employees/${department}/${teamName}`); // Navigate to the team's page
  };

  const employees = [
    { firstName: "John", lastName: "Doe", email: "johndoe@email.com" },
    { firstName: "John", lastName: "Doe", email: "johndoe@email.com" },
    { firstName: "John", lastName: "Doe", email: "johndoe@email.com" },
    { firstName: "John", lastName: "Doe", email: "johndoe@email.com" },
    { firstName: "John", lastName: "Doe", email: "johndoe@email.com" },
  ];

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <div>
            <div className="row">
              <div className="col-md-6">
                <h1 className="heading">{`Department: ${department}`}</h1>

                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="col-md-6 text-end">
                {/* Button to open modal */}
                <button
                  className="hm-rzrr-addT "
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="me-3 text-center">Add Team</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="17"
                    width="15.5"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#0b3275"
                      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Display teams as separate cards */}
            {teams.length > 0 && (
              <div className="hm-dash-head-cards-row mt-5">
                {teams.map((team, index) => (
                  <div className="hm-dash-head-cards-col" key={index}>
                    <div
                      className="hm-dash-head-card-emp animated-card"
                      id="employeeCard"
                      onClick={() => handleTeamClick(team.teamName)}
                    >
                      <div className="hm-dash-head-card-icon-emp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          width="30"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="#ffffff"
                            d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l448 0c53 0 96-43 96-96l0-320c0-53-43-96-96-96L96 0zM64 96c0-17.7 14.3-32 32-32l448 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32L64 96zm159.8 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM96 309.3c0 14.7 11.9 26.7 26.7 26.7l56.1 0c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4l-69.3 0C119.9 256 96 279.9 96 309.3zM461.2 336l56.1 0c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3l-69.3 0c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1l-80 0c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-8.6-24.3-29.9-42.6-55.9-47zM512 176a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                          />
                        </svg>
                      </div>
                      <div className="hm-dash-head-card-title-emp">
                        <p>{team.teamName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal for adding a new team */}
            {isModalOpen && (
              <div className="hm-rzr-addteamf modal">
                <div className="modal-content">
                  <h2>Add New Team</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addTeam(); // Call the addTeam function on form submit
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="teamName">Team Name:</label>
                      <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Department is read-only, displayed here */}
                    <div className="form-group">
                      <label htmlFor="department">Department Name:</label>
                      <input
                        type="text"
                        id="department"
                        value={department}
                        readOnly
                        disabled
                        required
                      />
                    </div>

                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          {/* Example team cards below */}
          {/* <div className="row">
            <div className="col-12 col-lg-6 col-sm-12 mb-4 mt-4">
              <div className="card department-card shadow-sm h-100">
                <div className="card-header department-header">
                  <div className="widget-header-md">
                    <h2>Team Name :Team1 </h2>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="21"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#05446b"
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                      />
                    </svg>
                  </div>
                  <div className="hm-rzr-team-emp"> Total Employee:10</div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive">
                    <table className="hm-rzr-md-tabel table table-bordered table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((emp, idx) => (
                          <tr key={idx}>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-sm-12 mb-4 mt-4">
              <div className="card department-card shadow-sm h-100">
                <div className="card-header department-header">
                  <div className="widget-header-md">
                    <h2>Team Name :Team2 </h2>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="21"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#05446b"
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                      />
                    </svg>
                  </div>
                  <div className="hm-rzr-team-emp"> Total Employee:09</div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive">
                    <table className="hm-rzr-md-tabel table table-bordered table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((emp, idx) => (
                          <tr key={idx}>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ManageDepartmentDetail;
