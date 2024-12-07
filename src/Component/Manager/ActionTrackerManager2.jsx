import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment"; // For date manipulation and formatting

const KPI_API_URL = "https://apiv2.humanmaximizer.com/api/v1/manager/kpis";
const PERFORMER_SCORE_API_URL =
  "https://apiv2.humanmaximizer.com/api/v1/manager/performer-score";
const USER_LIST_API_URL = "https://apiv2.humanmaximizer.com/api/v1/manager/user-list";

const ActionTrackerManager2 = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeScores, setEmployeeScores] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [savedKpis, setSavedKpis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [alreadyScoredEmployees, setAlreadyScoredEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  // Get department from Redux store
  const userDepartment = useSelector((state) => state.auth.department);
  const credentials = {}; // Define your credentials if needed

  // Fetch KPIs for the department
  // Fetch KPIs for the department
  const fetchKpisForDepartment = async (department) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${KPI_API_URL}?department=${department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const departmentKpis = response.data.data
        .filter((item) => item.department === department)
        .reduce((acc, item) => {
          const departmentKpiRecordId = item._id; // The department KPI record ID
          const kpisWithRecordId = item.kpis.map((kpi) => ({
            ...kpi,
            departmentKpiRecordId: departmentKpiRecordId,
          }));
          return acc.concat(kpisWithRecordId);
        }, []);

      setSavedKpis(departmentKpis); // Set the combined KPIs to state
    } catch (error) {
      console.error("Failed to fetch KPIs for the department.");
    }
  };

  useEffect(() => {
    if (userDepartment) {
      fetchKpisForDepartment(userDepartment);
    }
  }, [userDepartment]);

  // Fetch all employees
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          USER_LIST_API_URL,
          { ...credentials },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const usersData = response.data.data;
        setAllEmployees(usersData); // Set all employees without filtering
      } catch (error) {
        console.error("Failed to fetch all employees.");
      }
    };

    fetchAllEmployees();
  }, []); // Removed dependency on userDepartment

  // Fetch leaderboard data for the selected month
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const [year, month] = selectedMonth.split("-");

        // Send month and year as query parameters
        const response = await axios.get(
          `${PERFORMER_SCORE_API_URL}?month=${month}&year=${year}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const scoresData = response.data.data || [];
        setLeaderboard(scoresData);
      } catch (error) {
        console.error("Failed to fetch leaderboard data.");
      }
    };

    if (userDepartment) {
      fetchLeaderboard();
    }
  }, [userDepartment, selectedMonth]);

  // Fetch already scored employees for the current month
  useEffect(() => {
    const fetchAlreadyScoredEmployees = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const currentMonth = moment().format("YYYY-MM");
        const [year, month] = currentMonth.split("-");

        const response = await axios.get(
          `${PERFORMER_SCORE_API_URL}?month=${month}&year=${year}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const scoredEmployees = response.data.data.map((e) => e.emp_Id);
        setAlreadyScoredEmployees(scoredEmployees);
      } catch (error) {
        console.error("Failed to fetch already scored employees.");
      }
    };

    if (userDepartment) {
      fetchAlreadyScoredEmployees();
    }
  }, [userDepartment]);

  // Handle search input
  const handleEmployeeSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== "") {
      searchEmployee(term.trim());
    } else {
      setFilteredEmployees([]);
    }
  };

  // Fetch employees based on search query
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
        `https://apiv2.humanmaximizer.com/api/v1/manager/v2/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Directly set the filteredEmployees to the search results
      setFilteredEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  // Select an employee to assign scores
  const selectEmployee = (employee) => {
    if (alreadyScoredEmployees.includes(employee.employee_Id)) {
      setMessage("Already scored this month");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      return;
    }
    setSelectedEmployee(employee);
    setEmployeeScores({});

    // Determine the employee's department
    let employeeDepartment = employee.department;
    if (!employeeDepartment || employeeDepartment.trim() === "") {
      // Try to get department from employee's teams
      if (
        employee.teams &&
        employee.teams.length > 0 &&
        employee.teams[0].department
      ) {
        employeeDepartment = employee.teams[0].department;
      } else {
        // Try to get department from localStorage
        const teamsFromLocalStorage = JSON.parse(localStorage.getItem("teams"));
        if (
          teamsFromLocalStorage &&
          teamsFromLocalStorage.length > 0 &&
          teamsFromLocalStorage[0].department
        ) {
          employeeDepartment = teamsFromLocalStorage[0].department;
        }
      }
    }

    if (employeeDepartment) {
      fetchKpisForDepartment(employeeDepartment);
    } else {
      console.error("Department not found for the selected employee.");
    }
  };

  // Handle score input changes
  const handleScoreChange = (kpiId, score) => {
    setEmployeeScores({ ...employeeScores, [kpiId]: parseFloat(score) });
  };

  // Save scores and update leaderboard
  const saveScores = async () => {
    // Prepare the aasign_Score array
    const aasign_Score = savedKpis.map((kpi) => ({
      name: kpi.name,
      score: employeeScores[kpi._id] || 0,
    }));

    const employeeData = {
      emp_Id: selectedEmployee.employee_Id,
      full_Name: `${selectedEmployee.fullName}`,
      aasign_Score: aasign_Score,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");

      // POST request without query parameters
      await axios.post(PERFORMER_SCORE_API_URL, employeeData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Scores saved successfully");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds

      // Update the leaderboard
      setLeaderboard([...leaderboard, employeeData]);
      setAlreadyScoredEmployees([
        ...alreadyScoredEmployees,
        selectedEmployee.employee_Id,
      ]);
      setSelectedEmployee(null);
      setEmployeeScores({});
      setSearchTerm("");
      setFilteredEmployees([]);
    } catch (error) {
      console.error("Failed to save scores.");
      setMessage("Failed to save scores");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  // Calculate total score for an employee
  const calculateTotalScore = (aasign_Score) => {
    return aasign_Score.reduce((total, item) => total + item.score, 0);
  };

  // Get the best performer
  const getBestPerformer = () => {
    if (leaderboard.length === 0) return null;
    return leaderboard.reduce((prev, current) =>
      calculateTotalScore(prev.aasign_Score) >
      calculateTotalScore(current.aasign_Score)
        ? prev
        : current
    );
  };

  const bestPerformer = getBestPerformer();

  // Handle month change for leaderboard
  const handleMonthChange = (event) => {
    const date = event.target.value;
    const formattedDate = moment(date).format("YYYY-MM");
    setSelectedMonth(formattedDate);
  };

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <div className="rzr-hm-hr-reviewm-container">
            <div className="all-head mb-5">
              <h4>Assign Scores to Employees</h4>
            </div>

            <div className="rzr-hm-hr-reviewm-searchContainer">
              <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={handleEmployeeSearch}
                className="rzr-hm-hr-reviewm-searchInput"
              />
            </div>

            {filteredEmployees.length > 0 ? (
              <ul className="rzr-hm-hr-reviewm-employeeList">
                {filteredEmployees.map((employee) => (
                  <li
                    key={employee.employee_Id}
                    className="rzr-hm-hr-reviewm-employeeItem"
                    onClick={() => selectEmployee(employee)}
                  >
                    {`${employee.fullName}`}
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm && (
                <p className="rzr-hm-hr-reviewm-noResult">
                  No employees found.
                </p>
              )
            )}

            {selectedEmployee && (
              <div className="rzr-hm-hr-reviewm-scoreForm">
                <h3 className="rzr-hm-hr-reviewm-subHeading">
                  Assign Scores to {`${selectedEmployee.fullName} `}
                </h3>
                {savedKpis.map((kpi) => (
                  <div key={kpi._id} className="rzr-hm-hr-reviewm-formGroup">
                    <label className="rzr-hm-hr-reviewm-label">
                      {kpi.name} ({kpi.weight}%):
                    </label>
                    <input
                      type="number"
                      max="100"
                      min="0"
                      value={employeeScores[kpi._id] || ""}
                      onChange={(e) =>
                        handleScoreChange(kpi._id, e.target.value)
                      }
                      className="rzr-hm-hr-reviewm-input"
                      required
                    />
                  </div>
                ))}
                <button
                  onClick={saveScores}
                  className="rzr-hm-hr-reviewm-submitButton"
                >
                  Save Scores
                </button>
              </div>
            )}

            {message && <p className="rzr-hm-hr-reviewm-message">{message}</p>}

            {/* Leaderboard Section */}
            <h2 className="rzr-hm-hr-reviewm-heading">Leaderboard</h2>
            <div className="rzr-hm-hr-reviewm-monthPicker">
              <label className="rzr-hm-hr-reviewm-label">Select Month:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="rzr-hm-hr-reviewm-input"
              />
            </div>

            {allEmployees.length > 0 ? (
              <table className="rzr-hm-hr-reviewm-table">
                <thead>
                  <tr>
                    <th className="rzr-hm-hr-reviewm-tableHeader">Employee</th>
                    <th className="rzr-hm-hr-reviewm-tableHeader">
                      Total Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((employee) => {
                    const employeeScoreData = leaderboard.find(
                      (item) => item.emp_Id === employee.employee_Id
                    );
                    const totalScore = employeeScoreData
                      ? calculateTotalScore(employeeScoreData.aasign_Score)
                      : null;

                    return (
                      <tr
                        key={employee.employee_Id}
                        className={
                          bestPerformer &&
                          employee.employee_Id === bestPerformer.emp_Id
                            ? "rzr-hm-hr-reviewm-bestPerformerRow"
                            : "rzr-hm-hr-reviewm-tableRow"
                        }
                      >
                        <td className="rzr-hm-hr-reviewm-tableCell">
                          {`${employee.first_Name} ${employee.last_Name}`}
                        </td>
                        <td className="rzr-hm-hr-reviewm-tableCell">
                          {totalScore !== null ? totalScore.toFixed(2) : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="rzr-hm-hr-reviewm-noScores">No employees found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "30px",
    backgroundColor: "#f0f2f5",
    borderRadius: "10px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  monthPicker: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px",
    color: "#333",
  },
  searchContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  employeeList: {
    listStyleType: "none",
    padding: "0",
    marginBottom: "20px",
  },
  employeeItem: {
    padding: "15px",
    backgroundColor: "#fff",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid #e0e0e0",
    transition: "background-color 0.3s",
  },
  noResult: {
    textAlign: "center",
    color: "#888",
  },
  scoreForm: {
    marginBottom: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  subHeading: {
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "12px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    width: "100%",
    transition: "background-color 0.3s",
  },
  message: {
    textAlign: "center",
    color: "#28a745",
    fontWeight: "bold",
    marginTop: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    padding: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #e0e0e0",
  },
  bestPerformerRow: {
    backgroundColor: "#d4edda",
  },
  tableCell: {
    padding: "15px",
    textAlign: "left",
    color: "#333",
  },
  noScores: {
    textAlign: "center",
    color: "#888",
    marginTop: "20px",
  },
};

export default ActionTrackerManager2;
