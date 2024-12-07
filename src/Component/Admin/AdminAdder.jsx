import { useState, useEffect } from "react";
import { useFormik } from "formik";
import apiService from "../../services/Service";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/superadmin";

const API_URL1 = "https://apiv2.humanmaximizer.com/api/v1/admin";

export default function AddManagerSuper() {
  const [currentTab, setCurrentTab] = useState("pills-home");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState("");

  const teams = useSelector((state) => state.auth.teams || []); // All teams fetched from state

  // Fetch departments from API
  // Fetch departments from API
  // Fetch departments from API
  const fetchDepartments = async (employeeId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${API_URL}/departmentAlocated/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Directly use the departmentAlocated array from response data
      const { departmentAlocated } = response.data;

      // Filter out incorrectly formatted entries and update the state
      const validDepartments = departmentAlocated.filter(
        (dept) => !dept.includes("[") && !dept.includes("]")
      );

      // Update the state with the valid departmentAlocated array
      setDepartments(validDepartments || []);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch department allocation"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId"); // Assuming employee ID is stored in localStorage

    if (employeeId) {
      fetchDepartments(employeeId); // Fetch department allocation using employee ID
    } else {
      setError("Employee ID not found");
      setLoading(false); // Stop loading if there's no employee ID
    }
  }, []);

  // Fetch teams based on selected department from API
  const fetchTeamsByDepartment = async (department) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${API_URL1}/team/team-list/?department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data: teamList } = response.data;
      setFilteredTeams(teamList || []); // Update filtered teams with API response
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch teams for the selected department"
      );
    }
  };

  // useEffect to fetch teams when the selected department changes
  useEffect(() => {
    if (selectedDepartment) {
      fetchTeamsByDepartment(selectedDepartment); // Fetch teams from API when department changes
    } else {
      setFilteredTeams([]); // Clear teams if no department is selected
    }
    setSelectedTeams([]); // Reset selected teams when the department changes
    setSelectAll(false);
  }, [selectedDepartment]);
  // Define available permission
  const availablePermission = [
    { name: "Dashboard", permission: "dashboardAdmin" },
    { name: "Manage Employees", permission: "manageEmployeesAdmin" },
    { name: "Add Department Head", permission: "addUsersAdmin" },
    { name: "View Leaves", permission: "viewLeavesAdmin" },
    { name: "View Tasks", permission: "viewTasksAdmin" },
    { name: "Job Posting", permission: "jobPostingAdmin" },
    { name: "Ticket Management", permission: "manageIssuesAdmin" },
    { name: "Job Vacancy HR", permission: "jobVacancyAdmin" },
    { name: "Payroll", permission: "payroll" },
    {
      name: "Task Management",
      permission: "actionTrackerAdmin",
    },
    {
      name: "Performance Management",
      permission: "ReviewAdmin2",
    },
    {
      name: "RACI OPS",
      permission: "AdminRaci",
    },
    {
      name: "RACI Business",
      permission: "AdminRaci2",
    },
    // Add other permission as needed
  ];

  const validate = (values) => {
    const errors = {};

    // Check if all required fields are present and valid
    if (!values.first_Name) {
      errors.first_Name = "First Name is required";
    }

    if (!values.user_Role) {
      errors.user_Role = "User Role is required";
    }

    if (!values.employee_Id) {
      errors.employee_Id = "Employee ID is required";
    }

    if (!values.mobile_No) {
      errors.mobile_No = "Phone Number is required";
    } else if (!/^\d{10}$/.test(values.mobile_No)) {
      errors.mobile_No = "Phone Number must be exactly 10 digits";
    }

    if (!values.personal_Email_Id) {
      errors.personal_Email_Id = "Personal Email ID is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.personal_Email_Id)
    ) {
      errors.personal_Email_Id = "Invalid email address";
    }

    if (!values.working_Email_Id) {
      errors.working_Email_Id = "Working Email ID is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.working_Email_Id)
    ) {
      errors.working_Email_Id = "Invalid email address";
    }

    if (!values.date_of_Joining) {
      errors.date_of_Joining = "Date of Joining is required";
    }
    if (!values.dob) {
      errors.dob = "Date of Birth is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    if (!values.confirm_Password) {
      errors.confirm_Password = "Confirm Password is required";
    } else if (values.confirm_Password !== values.password) {
      errors.confirm_Password = "Passwords must match";
    }

    if (!values.salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(values.salary)) {
      errors.salary = "Salary must be a number";
    }

    if (!values.shift_Timing) {
      errors.shift_Timing = "Shift Timings are required";
    }

    if (!values.office_Address) {
      errors.office_Address = "Office Address is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      department: "",
      designation: "",
      user_Role: "",
      employee_Id: "",
      mobile_No: "",
      personal_Email_Id: "",
      working_Email_Id: "",
      date_of_Joining: "",
      password: "",
      confirm_Password: "",
      address: "",
      user_Avatar: "",
      pan_No: "",
      adhaar_Number: "",
      other_Document: null,
      bank_Holder_Name: "",
      bank_Name: "",
      bank_Account_No: "",
      ifsc_Code: "",
      salary: "",
      latitude: "",
      longitude: "",
      shift_Timing: "",
      office_Address: "",
      permission: [],
      departmentAlocated: [],
      teams: [],
      dob: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      // Append permissions
      values.permission.forEach((perm, index) => {
        formData.append(`permission[${index}]`, perm);
      });

      // Append other form fields except 'department' and 'teamName'
      Object.keys(values).forEach((key) => {
        if (key === "user_Avatar" && values[key]) {
          formData.append(key, values[key]); // Append file for user_Avatar
        } else if (key !== "department" && key !== "teamName") {
          formData.append(key, values[key]); // Append other form data, including 'dob'
        }
      });

      // Append 'department' explicitly
      formData.append("department", department || "RPO");

      // Append 'teams' details
      formData.append("teams[0][department]", department || "RPO");
      formData.append("teams[0][teamName]", teamName || "google");

      // Construct API URL with query parameters
      const apiUrlWithQuery = `${API_URL}?department=${department}&teamName=${teamName}`;

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(apiUrlWithQuery, formData, {
              headers: {
                "Content-Type": "multipart/form-data", // Required for file uploads
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Add token
              },
            });

            if (response.data.success) {
              toast.success("User registered successfully");
              resetForm(); // Reset form after successful submission
              setCurrentTab("pills-home"); // Switch tab after success
            } else {
              toast.error("Registration failed: " + response.data.message);
            }
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.details
            ) {
              error.response.data.details.forEach((detail) => {
                toast.error(detail.message);
              });
            } else if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(
                "Registration failed: " + error.response.data.message
              );
            } else {
              toast.error("Registration failed: " + error.message);
            }
            setCurrentTab("pills-home");
          }
        }
      });
    },
  });

  console.log(teams);

  const handleNext = () => {
    if (currentTab === "pills-home") {
      formik.setTouched({
        first_Name: true,
        user_Role: true,
        employee_Id: true,
        mobile_No: true,
        personal_Email_Id: true,
        working_Email_Id: true,
        date_of_Joining: true,
        password: true,
        confirm_Password: true,
        salary: true,
        latitude: true,
        longitude: true,
        shift_Timings: true,
        office_Address: true,
      });

      if (Object.keys(formik.errors).length > 0) {
        setCurrentTab("pills-home");
      } else {
        setCurrentTab("pills-profile");
      }
    } else if (currentTab === "pills-profile") {
      setCurrentTab("pills-contact");
    } else if (currentTab === "pills-contact") {
      formik.handleSubmit();
    }
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  // Handle permission checkbox change
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add permission if it's checked
      formik.setFieldValue("permission", [...formik.values.permission, value]);
    } else {
      // Remove permission if it's unchecked
      formik.setFieldValue(
        "permission",
        formik.values.permission.filter((permission) => permission !== value)
      );
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);

    // Update the formik state for 'department' and 'departmentAlocated'
    formik.setFieldValue("department", selectedDept);
    formik.setFieldValue(
      "departmentAlocated",
      selectedDept ? [selectedDept] : []
    );
  };

  const handleTeamCheckboxChange = (e) => {
    const { value, checked } = e.target;

    let updatedTeams;

    if (checked) {
      // Add the selected team (as string) if it's checked
      updatedTeams = [...selectedTeams, value];
    } else {
      // Remove the selected team (as string) if it's unchecked
      updatedTeams = selectedTeams.filter((team) => team !== value);
    }

    setSelectedTeams(updatedTeams);
    formik.setFieldValue("teams", updatedTeams); // Update the Formik state with the selected teams
  };

  const handleSelectAll = (e) => {
    let updatedTeams;
    if (e.target.checked) {
      // Select all filtered teams (as strings)
      updatedTeams = filteredTeams;
    } else {
      // Deselect all
      updatedTeams = [];
    }

    setSelectedTeams(updatedTeams);
    formik.setFieldValue("teams", updatedTeams); // Update the Formik state
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <form
              id="userForm"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link me-3 ${
                      currentTab === "pills-home" ? "active" : ""
                    }`}
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected={currentTab === "pills-home"}
                    onClick={() => handleTabClick("pills-home")}
                  >
                    Employee Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link me-3 ${
                      currentTab === "pills-profile" ? "active" : ""
                    }`}
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected={currentTab === "pills-profile"}
                    onClick={() => handleTabClick("pills-profile")}
                  >
                    Personal Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      currentTab === "pills-contact" ? "active" : ""
                    }`}
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected={currentTab === "pills-contact"}
                    onClick={() => handleTabClick("pills-contact")}
                  >
                    Bank Details
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                {/* ----- Home Tab ----- */}
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-home" ? "show active" : ""
                  }`}
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row mt-4">
                    {/* First Name */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          required
                          name="first_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.first_Name}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          First Name*
                        </label>
                      </div>
                      {formik.errors.first_Name &&
                        formik.touched.first_Name && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.first_Name}
                          </div>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="last_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.last_Name}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Last Name
                        </label>
                      </div>
                      {formik.errors.last_Name && formik.touched.last_Name && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.last_Name}
                        </div>
                      )}
                    </div>

                    {/* Department */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <select
                          name="department"
                          className="hm-razr-add-user-input"
                          onChange={handleDepartmentChange}
                          value={selectedDepartment}
                          placeholder=" "
                        >
                          <option value="" disabled>
                            --Select Department--
                          </option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <label className="hm-razr-add-user-label">
                          Department*
                        </label>
                      </div>
                      {formik.errors.department &&
                        formik.touched.department && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.department}
                          </div>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          type="text"
                          name="designation"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.designation}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Designation
                        </label>
                      </div>
                      {formik.errors.designation &&
                        formik.touched.designation && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.designation}
                          </div>
                        )}
                    </div>

                    {/* Permission */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <h3>PERMISSION</h3>
                      <div className="hm-razr-add-user-input-group">
                        {/* Placeholder used to align label */}
                        <input type="hidden" placeholder=" " />
                        <label className="hm-razr-add-user-label"></label>
                      </div>
                      <div className="permission-checkboxes">
                        {availablePermission.map((permission) => (
                          <div key={permission.value} className="form-check">
                            <input
                              type="checkbox"
                              name="permission"
                              value={permission.permission}
                              id={`permission-${permission.permission}`}
                              className="form-check-input"
                              onChange={handlePermissionChange}
                              checked={formik.values.permission.includes(
                                permission.permission
                              )}
                            />
                            <label
                              htmlFor={`permission-${permission.permission}`}
                              className="form-check-label"
                            >
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      {formik.errors.permission &&
                        formik.touched.permission && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.permission}
                          </div>
                        )}
                    </div>

                    {/* Team Allocated */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <h3>TEAM ALLOCATED</h3>
                      <div className="hm-razr-add-user-input-group">
                        {/* Placeholder used to align label */}
                        <input type="hidden" placeholder=" " />
                        <label className="hm-razr-add-user-label"></label>
                      </div>
                      {selectedDepartment && filteredTeams.length > 0 ? (
                        <div>
                          {filteredTeams.map((team) => (
                            <div key={team} className="form-check">
                              <input
                                type="checkbox"
                                value={team}
                                name="team_Allocated"
                                id={`team-${team}`}
                                className="form-check-input"
                                checked={selectedTeams.includes(team)}
                                onChange={handleTeamCheckboxChange}
                              />
                              <label
                                htmlFor={`team-${team}`}
                                className="form-check-label"
                              >
                                {team}
                              </label>
                            </div>
                          ))}
                          <div className="form-check mt-2">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              id="select-all"
                              className="form-check-input"
                            />
                            <label
                              htmlFor="select-all"
                              className="form-check-label"
                            >
                              Select All
                            </label>
                          </div>
                        </div>
                      ) : (
                        <p>No teams available for the selected department.</p>
                      )}
                    </div>

                    {/* User Role */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <select
                          name="user_Role"
                          required
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.user_Role}
                          placeholder=" "
                        >
                          <option value="" disabled>
                            --Choose User--
                          </option>
                          <option>admin</option>
                          {/* Add other roles as needed */}
                        </select>
                        <label className="hm-razr-add-user-label">
                          User Role*
                        </label>
                      </div>
                      {formik.errors.user_Role && formik.touched.user_Role && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.user_Role}
                        </div>
                      )}
                    </div>

                    {/* Employee ID */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          required
                          name="employee_Id"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.employee_Id}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Employee ID*
                        </label>
                      </div>
                      {formik.errors.employee_Id &&
                        formik.touched.employee_Id && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.employee_Id}
                          </div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          required
                          name="mobile_No"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.mobile_No}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Phone Number*
                        </label>
                      </div>
                      {formik.errors.mobile_No && formik.touched.mobile_No && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.mobile_No}
                        </div>
                      )}
                    </div>

                    {/* Personal Email ID */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          required
                          name="personal_Email_Id"
                          type="email"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.personal_Email_Id}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Personal Email ID*
                        </label>
                      </div>
                      {formik.errors.personal_Email_Id &&
                        formik.touched.personal_Email_Id && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.personal_Email_Id}
                          </div>
                        )}
                    </div>

                    {/* Working Email ID */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          required
                          name="working_Email_Id"
                          type="email"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.working_Email_Id}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Working Email ID*
                        </label>
                      </div>
                      {formik.errors.working_Email_Id &&
                        formik.touched.working_Email_Id && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.working_Email_Id}
                          </div>
                        )}
                    </div>

                    {/* Date of Joining */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="date_of_Joining"
                          required
                          type="date"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.date_of_Joining}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Date of Joining*
                        </label>
                      </div>
                      {formik.errors.date_of_Joining &&
                        formik.touched.date_of_Joining && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.date_of_Joining}
                          </div>
                        )}
                    </div>

                    {/* Date of Birth */}

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="dob"
                          required
                          type="date"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.dob}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Date of Birth*
                        </label>
                      </div>
                      {formik.errors.dob && formik.touched.dob && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.dob}
                        </div>
                      )}
                    </div>

                    {/* Password */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="password"
                          required
                          type="password"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Password*
                        </label>
                      </div>
                      {formik.errors.password && formik.touched.password && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.password}
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="confirm_Password"
                          required
                          type="password"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.confirm_Password}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Confirm Password*
                        </label>
                      </div>
                      {formik.errors.confirm_Password &&
                        formik.touched.confirm_Password && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.confirm_Password}
                          </div>
                        )}
                    </div>

                    {/* Shift Timings */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <select
                          name="shift_Timing"
                          required
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.shift_Timing}
                          placeholder=" "
                        >
                          <option value="" disabled>
                            --Choose Shift Timings--
                          </option>
                          <option>10 AM - 7 PM</option>
                          <option>10:30 AM - 7:30 PM</option>
                          <option>9 AM - 6 PM</option>
                          <option>9:30 AM - 6:30 PM</option>
                          <option>8 AM - 5 PM</option>
                          <option>8:30 AM - 5:30 PM</option>
                        </select>
                        <label className="hm-razr-add-user-label">
                          Shift Timings*
                        </label>
                      </div>
                      {formik.errors.shift_Timing &&
                        formik.touched.shift_Timing && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.shift_Timing}
                          </div>
                        )}
                    </div>

                    {/* Salary */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=" "
                          required
                          name="salary"
                          type="number"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.salary}
                        />
                        <label className="hm-razr-add-user-label">
                          Salary*
                        </label>
                      </div>
                      {formik.errors.salary && formik.touched.salary && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.salary}
                        </div>
                      )}
                    </div>

                    {/* Latitude */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=" "
                          required
                          name="latitude"
                          type="number"
                          step="0.000001"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.latitude}
                        />
                        <label className="hm-razr-add-user-label">
                          Latitude*
                        </label>
                      </div>
                      {formik.errors.latitude && formik.touched.latitude && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.latitude}
                        </div>
                      )}
                    </div>

                    {/* Longitude */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=" "
                          required
                          name="longitude"
                          type="number"
                          step="0.000001"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.longitude}
                        />
                        <label className="hm-razr-add-user-label">
                          Longitude*
                        </label>
                      </div>
                      {formik.errors.longitude && formik.touched.longitude && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.longitude}
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="col-md-6 col-lg-6 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <textarea
                          className="hm-razr-add-user-input"
                          id="address"
                          name="address"
                          placeholder=" "
                          rows={2}
                          onChange={formik.handleChange}
                          value={formik.values.address}
                        ></textarea>
                        <label className="hm-razr-add-user-label">
                          Permanent Address
                        </label>
                      </div>
                      {formik.errors.address && formik.touched.address && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>

                    {/* Office Address */}
                    <div className="col-lg-6 col-md-6 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <textarea
                          className="hm-razr-add-user-input"
                          id="office_Address"
                          name="office_Address"
                          placeholder=" "
                          rows={2}
                          required
                          onChange={formik.handleChange}
                          value={formik.values.office_Address}
                        ></textarea>
                        <label className="hm-razr-add-user-label">
                          Temporary Address*
                        </label>
                      </div>
                      {formik.errors.office_Address &&
                        formik.touched.office_Address && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.office_Address}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* ----- Profile Tab ----- */}
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-profile" ? "show active" : ""
                  }`}
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row">
                    {/* User Avatar */}
                    <div className="col-md-6 col-lg-4">
                      <div className="profile-photo mb-3">
                        <img
                          src={
                            "https://ems11.s3.amazonaws.com/user-profile.jpg"
                          }
                          alt="User Profile Photo"
                        />
                      </div>
                      <h5>Upload Photo</h5>
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="user_Avatar"
                          accept=".png, .jpg, .jpeg"
                          type="file"
                          id="formFile"
                          className="hm-razr-add-user-input"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            formik.setFieldValue("user_Avatar", file);
                          }}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Upload Photo
                        </label>
                      </div>
                      {formik.errors.user_Avatar &&
                        formik.touched.user_Avatar && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.user_Avatar}
                          </div>
                        )}
                    </div>

                    {/* PAN and Adhaar Number */}
                    <div className="col-md-6 col-lg-4">
                      {/* PAN Number */}
                      <div className="hm-razr-add-user-input-group mb-4">
                        <input
                          name="pan_No"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.pan_No}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">PAN</label>
                      </div>
                      {formik.errors.pan_No && formik.touched.pan_No && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.pan_No}
                        </div>
                      )}

                      {/* Adhaar Number */}
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="adhaar_Number"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.adhaar_Number}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Adhaar Number
                        </label>
                      </div>
                      {formik.errors.adhaar_Number &&
                        formik.touched.adhaar_Number && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.adhaar_Number}
                          </div>
                        )}
                    </div>

                    {/* Other Documents */}
                    <div className="col-md-6 col-lg-4">
                      <div className="hm-razr-add-user-input-group mb-2">
                        <input
                          name="other_Document"
                          accept=".pdf"
                          type="file"
                          id="marksheet"
                          className="hm-razr-add-user-input"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "other_Document",
                              event.currentTarget.files[0]
                            );
                          }}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Other Docs
                        </label>
                      </div>
                      {formik.errors.other_Document &&
                        formik.touched.other_Document && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.other_Document}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* ----- Contact Tab ----- */}
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-contact" ? "show active" : ""
                  }`}
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div className="row">
                    {/* Bank Holder Name */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="bank_Holder_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.bank_Holder_Name}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Bank Holder Name
                        </label>
                      </div>
                      {formik.errors.bank_Holder_Name &&
                        formik.touched.bank_Holder_Name && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.bank_Holder_Name}
                          </div>
                        )}
                    </div>

                    {/* Bank Name */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="bank_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.bank_Name}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Bank Name
                        </label>
                      </div>
                      {formik.errors.bank_Name && formik.touched.bank_Name && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.bank_Name}
                        </div>
                      )}
                    </div>

                    {/* Bank Account No. */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="bank_Account_No"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.bank_Account_No}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          Bank Account No.
                        </label>
                      </div>
                      {formik.errors.bank_Account_No &&
                        formik.touched.bank_Account_No && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.bank_Account_No}
                          </div>
                        )}
                    </div>

                    {/* IFSC Code */}
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="ifsc_Code"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.ifsc_Code}
                          placeholder=" "
                        />
                        <label className="hm-razr-add-user-label">
                          IFSC Code
                        </label>
                      </div>
                      {formik.errors.ifsc_Code && formik.touched.ifsc_Code && (
                        <div className="hm-razr-add-user-error">
                          {formik.errors.ifsc_Code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="submit upd-btn"
                onClick={handleNext}
              >
                Save &amp; Add User
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ms-1"
                  fill="#fff"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                >
                  <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z" />
                  <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
