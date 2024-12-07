import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DepartmentDesignation = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
  });

  // Inline Styles for Edit and Delete Buttons
  const editButtonStyle = {
    padding: "5px 10px",
    marginRight: "5px",
    backgroundColor: "#ffc107", // Amber color
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const deleteButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#dc3545", // Red color
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  // Fetch departments from the API when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setDepartments(response.data.data || []);
      } else {
        console.error("Failed to fetch departments:", response.data.message);
        setDepartments([]); // Ensure departments is an array
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]); // Ensure departments is an array
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to add a new department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",

        {
          department: formData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        fetchDepartments();
        setFormData({ name: "" }); // Reset the form
        MySwal.fire({
          title: "Success!",
          text: "Department added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding department:", error);
      MySwal.fire({
        title: "Error!",
        text: `Failed to add department: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#6c757d",
      });
    }
  };

  // Handle Delete Operation with SweetAlert2
  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const department = departments.find((dept) => dept._id === id);

      const result = await MySwal.fire({
        title: "Are you sure?",
        text: `Do you want to delete the department "${department.department}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545", // Red color
        cancelButtonColor: "#6c757d", // Gray color
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/departments/${id}`,

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          fetchDepartments();
          MySwal.fire({
            title: "Deleted!",
            text: "The department has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      MySwal.fire({
        title: "Error!",
        text: `Failed to delete department: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#6c757d",
      });
    }
  };

  // Handle Edit Operation with SweetAlert2
  const handleEdit = async (dept) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { value: newDepartmentName } = await MySwal.fire({
        title: "Edit Department",
        input: "text",
        inputLabel: "Department Name",
        inputValue: dept.department,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "Department name cannot be empty!";
          }
          return null;
        },
      });

      if (newDepartmentName && newDepartmentName !== dept.department) {
        const response = await axios.put(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/departments/${dept._id}`,

          {
            department: newDepartmentName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          fetchDepartments();
          MySwal.fire({
            title: "Updated!",
            text: "The department has been updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error updating department:", error);
      MySwal.fire({
        title: "Error!",
        text: `Failed to update department: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#6c757d",
      });
    }
  };

  // Handle Row Click (Optional: Navigate to Department Details)
  const handleRowClick = (departmentName) => {
    navigate(`/dashboard/department/${departmentName}`);
  };

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="hm-rzr-super-add-dsg">
          <div className="all-head d-flex align-items-center justify-content-between mb-5">
            <h4>Add Department & Department Head</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <div className="form-group col-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Department Name"
                  required
                  className="hcm-deptdtl-rzr-input"
                />
              </div>
              <div className="col-4 mb-2">
                <button type="submit" className="hcm-deptdtl-rzr-button">
                  <b>Add Department</b>
                </button>
              </div>
            </div>
          </form>

          <div className="table-container">
            <div className="col-6">
              <h3 className="hcm-deptdtl-rzr-heading">
                <b>Departments</b>
              </h3>
              <table className="hcm-deptdtl-rzr-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept._id} className="hcm-deptdtl-rzr-table-row">
                      <td>
                        <Link to={`/dashboard/department-details/${dept._id}`}>
                          {dept.department}
                        </Link>
                      </td>
                      <td>
                        <button
                          style={editButtonStyle}
                          onClick={() => handleEdit(dept)}
                        >
                          Edit
                        </button>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDelete(dept._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDesignation;
