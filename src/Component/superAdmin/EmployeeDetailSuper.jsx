import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/Service";
import axios from "axios";

const EmployeeDetailSuper = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalTeam: 0,
    totalSuperAdmin: 0,
    totalAdmin: 0,
    totalManager: 0,
    totalEmployee: 0,
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeUserId, setActiveUserId] = useState(null);
  const [editDelPosition, setEditDelPosition] = useState({ top: 0, left: 0 });
  const [credentials, setCredentials] = useState({
    employee_Id: "your_employee_id",
    password: "your_password",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // Updated to show 10 employees per page
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const response = await userService.getAllUsers(credentials);
      const usersData = response.data;
      const departmentsData = [
        ...new Set(usersData.map((user) => user.department).filter(Boolean)),
      ];

      setUsers(usersData);
      setFilteredUsers(usersData);
      setTotalEmployees(usersData.length);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [credentials]);

  const handleDotsClick = (userId, event) => {
    const rect = event.target.getBoundingClientRect();
    setEditDelPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setActiveUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = users.filter(
      (user) =>
        `${user.first_Name} ${user.last_Name}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        user.employee_Id
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on search
  };
  const fetchDashboardStats = async () => {
    const API_URL = "https://apiv2.humanmaximizer.com/api/v1/superadmin/dashboard";

    const accessToken = localStorage.getItem("accessToken"); // Get the access token from storage

    conhttp: try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setStats(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    if (department === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => user.department.toLowerCase() === department.toLowerCase()
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page on department change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredUsers.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredUsers.length / employeesPerPage);

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="razor-admin-manageemp-all-head d-flex align-items-center justify-content-between">
              <div className="all-head d-flex align-items-center justify-content-between mb-3">
                <h4>Manage Employees</h4>
              </div>
              <div className="razor-admin-manageemp-search-filter d-flex align-items-center gap-3">
                <form
                  action=""
                  className="razor-admin-manageemp-form d-flex align-items-center"
                >
                  <input
                    type="search"
                    id="razor-admin-manageemp-search"
                    className="razor-admin-manageemp-form-control"
                    placeholder="Enter Employee Name or ID"
                    required=""
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="razor-admin-manageemp-search-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </form>

                <div className="razor-admin-manageemp-dropdown dropdown">
                  <button
                    className="razor-admin-manageemp-filter-btn"
                    onClick={() => {}}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      className="me-1"
                      fill="#fff"
                      height="19"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path>
                    </svg>
                    <span className="razor-admin-manageemp-filter-label">
                      Filter
                    </span>
                  </button>
                  <div className="razor-admin-manageemp-dropdown-menu dropdown-menu">
                    <button
                      className="razor-admin-manageemp-dropdown-item dropdown-item"
                      onClick={() => handleDepartmentChange("")}
                    >
                      All Dpt.
                    </button>
                    {departments.map((department) => (
                      <button
                        key={department}
                        className="razor-admin-manageemp-dropdown-item dropdown-item"
                        onClick={() => handleDepartmentChange(department)}
                      >
                        {department}
                      </button>
                    ))}
                  </div>
                </div>

                {/* <Link to={"/dashboard/add-user"}>
                  <div className="razor-admin-manageemp-add-user-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      fill="#fff"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
                    </svg>
                    <span className="razor-admin-manageemp-add-user-label">
                      Add Employees
                    </span>
                  </div>
                </Link> */}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="#fff"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>{stats.totalTeam}</span>
                    Total Employees
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="#fff"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>{stats.totalSuperAdmin}</span>
                    Total Super Admin
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="#fff"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>{stats.totalAdmin}</span>
                    Total Admin
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="#fff"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>{stats.totalManager}</span>
                    Total Manager
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="#fff"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>{stats.totalEmployee}</span>
                    Total Employee
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="stats">
                  <div className="icon-bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#fff"
                      viewBox="0 0 24 24"
                    >
                      <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1-1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
                    </svg>
                  </div>

                  <div className="number-stats">
                    <span>3</span>
                    Total Departments
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="emp-data">
                <div className="table-responsive">
                  <table className="text-center table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Employee ID</th>
                        <th>Phone Number</th>
                        <th>More</th>
                      </tr>
                    </thead>
                    <tbody>
                      {error && (
                        <tr>
                          <td colSpan="5" className="text-danger">
                            {error}
                          </td>
                        </tr>
                      )}
                      {loading ? (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      ) : currentEmployees.length > 0 ? (
                        currentEmployees.map((user) => (
                          <tr key={user.employee_Id}>
                            <td>
                              {/* <Link
                                to={`/dashboard/employee-details/${user.employee_Id}`}
                              > */}
                              {user.first_Name} {user.last_Name}
                              {/* </Link> */}
                            </td>
                            <td>{user.designation}</td>
                            <td>{user.employee_Id}</td>
                            <td>{user.mobile_No}</td>
                            <td>
                              {/* <span className="p-2">
                                <Link
                                  to={`/dashboard/edit-profile/${user.employee_Id}`}
                                >
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
                                </Link>
                              </span> */}
                              <span className="p-2">
                                <Link
                                  to={`/dashboard/employee-details/${user.employee_Id}`}
                                >
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
                                </Link>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <span className="page-link">{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <style jsx="true">{`
        .dots {
          position: relative;
        }
        .edit-del-btn {
          position: absolute;
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          z-index: 10;
        }
        .edit-del-btn ul {
          list-style: none;
          margin: 0;
          padding: 10px;
        }
        .edit-del-btn ul li {
          margin: 5px 0;
        }
        .edit-del-btn ul li a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: black;
        }
        .edit-del-btn ul li a:hover {
          background: #f1f1f1;
        }
        .dropdown-menu {
          display: none;
          position: absolute;
          background-color: white;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        .dropdown:hover .dropdown-menu {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default EmployeeDetailSuper;
