import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/Service"; // Ensure this includes getManagerUserList

const AllEmployeesHR = () => {
  const [users, setUsers] = useState([]);
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
      const response = await userService.getManagerUserList(credentials);
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
                </form>
              </div>
            </div>

            <div className="hm-dash-head-cards-container">
              <div className="hm-dash-head-cards-row1">
                <div className="hm-dash-head-cards-col1">
                  <div
                    className="hm-dash-head-card animated-card"
                    id="storageCard"
                  >
                    <div className="hm-dash-head-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="42"
                        width="50"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l448 0c53 0 96-43 96-96l0-320c0-53-43-96-96-96L96 0zM64 96c0-17.7 14.3-32 32-32l448 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32L64 96zm159.8 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM96 309.3c0 14.7 11.9 26.7 26.7 26.7l56.1 0c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4l-69.3 0C119.9 256 96 279.9 96 309.3zM461.2 336l56.1 0c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3l-69.3 0c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1l-80 0c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-8.6-24.3-29.9-42.6-55.9-47zM512 176a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                        />
                      </svg>
                    </div>
                    <div className="hm-dash-head-card-title">
                      Total Employees
                    </div>
                    <div className="hm-dash-head-card-data">
                      {totalEmployees}
                    </div>
                    <hr />
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
                        {/* <th>More</th> */}
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
                              <Link
                                to={`/dashboard/employee-details/${user.employee_Id}`}
                              >
                                {user.first_Name} {user.last_Name}
                              </Link>
                            </td>
                            <td>{user.designation}</td>
                            <td>{user.employee_Id}</td>
                            <td>{user.mobile_No}</td>
                            {/* <td>
                              <span
                                className="p-2"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                              >
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
                              </span>
                              <span
                                className="p-2"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                              >
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
                            </td> */}
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
            <div className="d-flex justify-content-end mt-3">
              <ul className="hr-pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`hr-pagination-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    <span className="hr-pagination-link">{index + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
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

export default AllEmployeesHR;
