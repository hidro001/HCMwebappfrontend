import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Ensure axios is imported

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/superadmin"; // Base URL

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Initialize useNavigate
  const [managers, setManagers] = useState([]); // State to store manager data

  // Function to fetch department allocation
  const fetchDepartmentAllocation = async (employeeId) => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Get access token from localStorage

      // Make the API request
      const response = await axios.get(
        `${API_URL}/departmentAlocated/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        }
      );

      let { departmentAlocated } = response.data; // Extract department array

      // Clean the department data, removing entries like "[\"RPO\"]"
      departmentAlocated = departmentAlocated.filter((department) => {
        try {
          const parsed = JSON.parse(department); // Try to parse the department
          // If the parsed result is an array, discard it
          return typeof parsed !== "object";
        } catch (e) {
          // If parsing fails, it's likely a valid string, so keep it
          return true;
        }
      });

      setDepartments(departmentAlocated || []); // Set departments or an empty array if no data
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch department allocation"
      );
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  // useEffect to fetch departments on component mount
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId"); // Assuming employee ID is stored in localStorage

    if (employeeId) {
      fetchDepartmentAllocation(employeeId); // Fetch department allocation using employee ID
    } else {
      setError("Employee ID not found");
      setLoading(false); // Stop loading if there's no employee ID
    }
  }, []);

  // Handle department click
  const handleDepartmentClick = (department) => {
    navigate(`${department}`); // Navigate to DepartmentDetail with the department name
  };
  // Define an array of border colors
  const borderColors = [
    "#0a6075",
    "#00d4ff",
    "#3357FF",
    "#F333FF",
    "#FF33A8",
    "#33FFF5",
    "#F5FF33",
    "#FF8C33",
    "#8C33FF",
    "#33FF8C",
  ];

  // Function to get border color based on index
  const getBorderColor = (index) => {
    return borderColors[index % borderColors.length];
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
          <div className="manage-department-container">
            <h1 className="heading">Manage Department</h1>
            {loading ? (
              <p className="loading-text">Loading departments...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
              <div className="department-boxes">
                {departments.length > 0 ? (
                  departments.map((department, index) => (
                    <div
                      key={index}
                      className="department-box rzr-hm-md"
                      onClick={() => handleDepartmentClick(department)}
                      style={{
                        borderBottom: `4px solid ${getBorderColor(index)}`,
                      }} // Dynamic border-bottom
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter")
                          handleDepartmentClick(department);
                      }}
                    >
                      <div className="icon-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="25"
                          width="30"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="#09196d"
                            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"
                          />
                        </svg>
                      </div>
                      <span className="department-name">{department}</span>
                      <p className="department-team">No. of Team :6</p>
                    </div>
                  ))
                ) : (
                  <p className="no-departments">No departments allocated.</p>
                )}
              </div>
            )}
          </div>
          {/* Managers List */}
          <div className="managers-list">
            <h2>Managers</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Manager Name</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {managers.length > 0 ? (
                  managers.map((manager, index) => (
                    <tr key={index}>
                      <td>{manager.name}</td>
                      <td>{manager.department}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No managers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <div className="row">
            <div className="col-12 col-lg-6 col-sm-12 mb-4 mt-4">
              <div className="card department-card shadow-sm h-100">
                <div className="card-header department-header">
                  <div className="widget-header-md">
                    <h2>Department Name</h2>

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
                    <h2>Department Name</h2>

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

export default ManageDepartment;
