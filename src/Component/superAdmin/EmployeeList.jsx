import React, { useState, useEffect } from "react";
import axios from "axios";
import { Puff } from "react-loader-spinner"; // For loading spinner
import { toast, ToastContainer } from "react-toastify"; // For notifications
import { useNavigate } from "react-router-dom"; // For navigation
import { motion } from "framer-motion"; // For animations
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const EmployeeList = () => {
  // State variables
  const [employees, setEmployees] = useState([]); // List of employees
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered employees for search
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order state
  const navigate = useNavigate(); // Navigation hook

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/employees`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const employees = response.data.data || []; // Ensure array exists

        // Filter valid employees (ensure required properties are present)
        const validEmployees = employees.filter(
          (employee) =>
            typeof employee.first_Name === "string" &&
            typeof employee.last_Name === "string" &&
            typeof employee.employee_Id === "string"
        );

        // Sort employees by first name
        const sortedEmployees = validEmployees.sort((a, b) =>
          a.first_Name.localeCompare(b.first_Name)
        );

        setEmployees(sortedEmployees);
        setFilteredEmployees(sortedEmployees); // Initialize filtered list
      } else {
        const errorMessage =
          response.data.message || "Failed to fetch employees.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message || "An error occurred.");
      toast.error(err.message || "An error occurred while fetching employees.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = employees.filter(
      (employee) =>
        `${employee.first_Name} ${employee.last_Name}`
          .toLowerCase()
          .includes(searchValue) || // Search by name
        employee.employee_Id.toLowerCase().includes(searchValue) // Search by ID
    );

    setFilteredEmployees(filtered);
  };

  // Function to sort employees by alphabetical order
  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sorted = [...filteredEmployees].sort((a, b) =>
      newSortOrder === "asc"
        ? a.first_Name.localeCompare(b.first_Name)
        : b.first_Name.localeCompare(a.first_Name)
    );

    setFilteredEmployees(sorted);
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Puff type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container ">
          <div className="rzr-emplist">
            <h3 className="mb-4 text-center">
              Total Employees {employees.length}
            </h3>

            {/* Search Bar and Sort Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <input
                type="text"
                className="form-control w-75"
                placeholder="Search by Name or Employee ID"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-secondary ms-3"
                onClick={handleSortOrderChange}
              >
                Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
              </button>
            </div>

            {filteredEmployees.length > 0 ? (
              <div className="row g-4">
                {filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee._id}
                    className="col-md-4 col-lg-3"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.1, // Delay for cascading effect
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="card h-100 shadow-sm"
                    >
                      <img
                        src={
                          employee.user_Avatar ||
                          "https://res.cloudinary.com/du40x9sao/image/upload/v1728294181/add-team-admin/ghqdshp9yb9mn6dim6dp.jpg"
                        }
                        alt={`${employee.first_Name} ${employee.last_Name}`}
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">
                          {employee.first_Name} {employee.last_Name}
                        </h5>
                        <p className="card-text">
                          <strong>Employee ID:</strong> {employee.employee_Id}
                          <br />
                          <strong>Designation:</strong> {employee.designation}
                          <br />
                          <strong>Department:</strong>
                          {employee.department}
                          <br />
                          <strong>Role:</strong> {employee.user_Role}
                        </p>
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary w-45"
                          onClick={() =>
                            navigate(
                              `/dashboard/allemployes/edit/${employee._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-secondary w-45"
                          onClick={() =>
                            navigate(
                              `/dashboard/allemployes/view/${employee._id}`
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                No employees found.
              </motion.p>
            )}

            {/* Toast Notifications */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
