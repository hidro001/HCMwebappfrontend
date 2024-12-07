import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import userService from "../../services/Service";

const ActiveInactiveEmployee = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("mongo_id");

  const navigate = useNavigate();
  const { teamName, department } = useParams();

  // Fetch subordinates data
  const fetchSubordinates = async () => {
    try {
      if (!userId) throw new Error("User ID is not available.");

      setLoading(true); // Start loading
      const data = await userService.getSubordinates(userId);
      // console.log("subordinates", data.data)

      if (data.success) {
        setUsers(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchSubordinates();
  }, [userId]);

  // Handle toggle active/inactive status
  const handleToggleChange = (employeeId, isActive) => {
    Swal.fire({
      title: `Are you sure you want to ${
        isActive ? "deactivate" : "activate"
      } this user?`,
      text: `This will ${
        isActive ? "deactivate" : "activate"
      } the user's account.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isActive ? "deactivate" : "activate"}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await userService.updateUserStatus(employeeId);
          if (response.success) {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.employee_Id === employeeId
                  ? { ...user, isActive: !isActive }
                  : user
              )
            );
            toast.success(
              `User ${isActive ? "deactivated" : "activated"} successfully!`
            );
          } else {
            throw new Error(
              response.message || "Failed to update user status."
            );
          }
        } catch (error) {
          toast.error(
            error.message || "Failed to update user status. Please try again."
          );
        }
      }
    });
  };

  // Handle search input
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filtered users (memoized)
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        `${user.first_Name} ${user.last_Name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.employee_Id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-5">
          <div className="all-employee">
            {/* Header */}
            <div className="razor-admin-manageemp-all-head d-flex align-items-center justify-content-between">
              <h4>Active/Inactive Employees</h4>
              <div className="razor-admin-manageemp-search-filter d-flex align-items-center gap-3">
                <input
                  type="search"
                  id="razor-admin-manageemp-search"
                  className="razor-admin-manageemp-form-control"
                  placeholder="Enter Employee Name or ID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Stats */}
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
                    <span>{filteredUsers.length}</span>
                    Total Employees
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Table */}
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
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.employee_Id}>
                            <td>
                              <Link
                                to={`/dashboard/employee-details/${user.employee_Id}`}
                              >
                                {user.first_Name} {user.last_Name}
                              </Link>
                            </td>

                            <td>{user.employee_Id}</td>

                            <td>
                              <div className="unique-user-status-form-switch">
                                <input
                                  className={`unique-user-status-input ${
                                    user.isActive
                                      ? "unique-user-status-active-switch"
                                      : "unique-user-status-inactive-switch"
                                  }`}
                                  checked={user.isActive}
                                  onChange={() =>
                                    handleToggleChange(
                                      user.employee_Id,
                                      user.isActive
                                    )
                                  }
                                  type="checkbox"
                                  role="switch"
                                  id={`statusSwitch-${user.employee_Id}`}
                                />
                                <label
                                  className={`unique-user-status-label ${
                                    user.isActive
                                      ? "unique-user-status-active-label"
                                      : "unique-user-status-inactive-label"
                                  }`}
                                  htmlFor={`statusSwitch-${user.employee_Id}`}
                                >
                                  {user.isActive ? "Active" : "Inactive"}
                                </label>
                              </div>
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
        </div>
      </section>
    </div>
  );
};

export default ActiveInactiveEmployee;
