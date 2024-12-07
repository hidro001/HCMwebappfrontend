import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../services/Service";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateEmployee = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // Updated to show 10 employees per page
  const { teamName, department } = useParams(); // Get teamName and department from URL params
  const [subordinates, setSubordinates] = useState([]);

  const navigate = useNavigate();

  // Retrieve the logged-in user's ID from Redux store
  //   const userId = useSelector((state) => state.auth.userId);
  const userId = localStorage.getItem("mongo_id");
  // const employee_Id = localStorage.getItem("employeeId");

  const fetchSubordinates = async () => {
    try {
      // Ensure userId is defined
      if (!userId) {
        throw new Error("User ID is not available.");
      }

      const data = await userService.getSubordinates(userId);
      if (data.success) {
        setSubordinates(data.data);
        setTotalEmployees(data.length);
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubordinates();
  }, [userId]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = subordinates.filter(
      (user) =>
        `${user.first_Name} ${user.last_Name}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        user.employee_Id
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setSubordinates(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const indexOfLastEmployee = currentPage * employeesPerPage;
  // const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  // const currentEmployees = filteredUsers.slice(
  //   indexOfFirstEmployee,
  //   indexOfLastEmployee
  // );

  // const totalPages = Math.ceil(filteredUsers.length / employeesPerPage);

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="razor-admin-manageemp-all-head d-flex align-items-center justify-content-between">
              <div className="all-head d-flex align-items-center justify-content-between mb-3">
                <h4>Update Employees</h4>
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
                  {/* <button
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
                  </button> */}
                </form>

                {/* <div className="razor-admin-manageemp-dropdown dropdown">
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
                </div> */}

                {/* <Link
                  to={`/dashboard/all-employees/${department}/${teamName}/addUser`}
                >
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
                    <span>{subordinates.length}</span>
                    Total Employees
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

                        <th>Employee ID</th>

                        <th>Activity</th>
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
                      ) : subordinates.length > 0 ? (
                        subordinates.map((user) => (
                          <tr key={user.employee_Id}>
                            <td>
                              {user.first_Name} {user.last_Name}
                            </td>

                            <td>{user.employee_Id}</td>

                            <td>
                              {/* <span className="p-2">
                                <Link
                                  to={`/dashboard/all-employees/${department}/${teamName}/${user.employee_Id}`}
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
                                <Link to={`/dashboard/update/${user._id}`}>
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
          {/* <div className="d-flex justify-content-end">
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
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default UpdateEmployee;
