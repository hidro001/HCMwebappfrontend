import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/admin/team/team-member";

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("pills-home");
  const [availablePermissions, setAvailablePermissions] = useState([]);
  // Fetch the department and teamName from the URL parameters
  const { department, teamName } = useParams();

  // Ensure department and teamName are defined
  useEffect(() => {
    if (!department || !teamName) {
      toast.error("Department and Team Name are required.");
    }
  }, [department, teamName]);

  const validate = (values) => {
    const errors = {};
    if (!values.first_Name) errors.first_Name = "First Name is required";
    if (!values.user_Role) errors.user_Role = "User Role is required";
    if (!values.employee_Id) errors.employee_Id = "Employee ID is required";
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
    if (!values.date_of_Joining)
      errors.date_of_Joining = "Date of Joining is required";
    if (!values.dob) errors.dob = "Date of Birth is required";
    if (!values.password) errors.password = "Password is required";
    if (!values.confirm_Password) {
      errors.confirm_Password = "Confirm Password is required";
    } else if (values.confirm_Password !== values.password) {
      errors.confirm_Password = "Passwords must match";
    }
    if (!values.salary) errors.salary = "Salary is required";
    else if (isNaN(values.salary)) errors.salary = "Salary must be a number";
    if (!values.shift_Timing)
      errors.shift_Timing = "Shift Timings are required";
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      department: department || "", // Set department directly from params
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
      user_Avatar: null,
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
      teamName: teamName || "", // Set teamName directly from params
      permission: [], // Hold the selected permissions
      dob: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      // Append permissions
      values.permission.forEach((perm, index) => {
        formData.append(`permission[${index}]`, perm);
      });

      // Append other form fields except 'department', 'teamName', and 'dob'
      Object.keys(values).forEach((key) => {
        if (key === "user_Avatar" && values[key]) {
          formData.append(key, values[key]); // Append file for user_Avatar
        } else if (
          key !== "department" &&
          key !== "teamName" &&
          key !== "dob"
        ) {
          formData.append(key, values[key]); // Append other form data
        }
      });

      // Append 'department' explicitly
      formData.append("department", department || "RPO");

      // Append 'dob' as a formatted string
      if (values.dob) {
        const formattedDob = new Date(values.dob).toISOString().split("T")[0];
        formData.append("dob", formattedDob);
      }

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

  useEffect(() => {
    if (formik.values.user_Role === "manager") {
      setAvailablePermissions(managerPermissions);
    } else if (formik.values.user_Role === "employee") {
      setAvailablePermissions(employeePermissions);
    } else {
      setAvailablePermissions([]); // Clear if no role selected
    }
  }, [formik.values.user_Role]);

  const managerPermissions = [
    { name: "Dashboard", permission: "managerDashboard" },
    { name: "Manage Employees", permission: "manageEmployeesHR" },
    // { name: "Add Employees", permission: "AddEmployeesManager" },
    { name: "View Leave", permission: "ViewLeaveManager" },
    { name: "View Tasks", permission: "ViewTaskManager" },
    { name: "Ticket Management", permission: "ManageIssuesManager" },
    { name: "Task Management", permission: "ActionTrackerManager" },
    { name: "Performance Management", permission: "ReviewManager" },
    // Add more permissions as needed
  ];

  const employeePermissions = [
    { name: "Dashboard", permission: "employeeDashboard" },
    { name: "My Profile", permission: "viewProfile" },
    { name: "Apply For Leave", permission: "applyLeaves" },
    { name: "Update Tasks", permission: "updateTask" },
    { name: "Raise A Ticket", permission: "getSupport" },
    {
      name: "Task Management",
      permission: "actionTracker",
    },
    { name: "Attendance & Payroll", permission: "myAttendance" },
    { name: "Training Material", permission: "trainingMaterial" },
    // Add more permissions as needed
  ];

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
        shift_Timing: true,
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
                    className={`nav-link ${
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
                    className={`nav-link ${
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
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-home" ? "show active" : ""
                  }`}
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row mt-4">
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=" "
                          required
                          name="first_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.first_Name}
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
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
                          name="last_Name"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.last_Name}
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
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <label className="hm-razr-add-user-label"></label>
                        <input
                          name="department"
                          type="text"
                          className="hm-razr-add-user-input"
                          value={department} // Fetched from URL params
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <label className="hm-razr-add-user-label"></label>
                        <input
                          name="teamName"
                          type="text"
                          className="hm-razr-add-user-input"
                          value={teamName} // Fetched from URL params
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <label className="mb-2 form-label">Permissions</label>
                      <div className="permission-checkboxes">
                        {availablePermissions.length > 0 ? (
                          availablePermissions.map((permission) => (
                            <div
                              key={permission.permission}
                              className="form-check"
                            >
                              <input
                                type="checkbox"
                                name="permission"
                                value={permission.permission}
                                id={`permission-${permission.permission}`}
                                className="form-check-input"
                                onChange={formik.handleChange}
                                checked={formik.values.permission?.includes(
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
                          ))
                        ) : (
                          <p>Select a role to view permissions</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="designation"
                          className="hm-razr-add-user-input"
                          placeholder=""
                          onChange={formik.handleChange}
                          value={formik.values.designation}
                        />
                        <label className="hm-razr-add-user-label">
                          Designation
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <select
                          name="user_Role"
                          required
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.user_Role}
                        >
                          <option value="">--Choose User--</option>

                          <option>manager</option>
                          <option>employee</option>
                        </select>
                        <label className="hm-razr-add-user-label">
                          User Role*
                        </label>

                        {formik.errors.user_Role &&
                          formik.touched.user_Role && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.user_Role}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
                          required
                          name="employee_Id"
                          type="text"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.employee_Id}
                        />
                        <label className="hm-razr-add-user-label">
                          Employee ID*
                        </label>
                        {formik.errors.employee_Id &&
                          formik.touched.employee_Id && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.employee_Id}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
                          required
                          name="mobile_No"
                          type="string"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.mobile_No}
                        />
                        <label className="hm-razr-add-user-label">
                          Phone Number*
                        </label>

                        {formik.errors.mobile_No &&
                          formik.touched.mobile_No && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.mobile_No}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
                          required
                          name="personal_Email_Id"
                          type="email"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.personal_Email_Id}
                        />

                        <label className="hm-razr-add-user-label">
                          Personal Email ID*
                        </label>
                        {formik.errors.personal_Email_Id &&
                          formik.touched.personal_Email_Id && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.personal_Email_Id}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
                          required
                          name="working_Email_Id"
                          type="email"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.working_Email_Id}
                        />
                        <label className="hm-razr-add-user-label">
                          Working Email ID*
                        </label>
                        {formik.errors.working_Email_Id &&
                          formik.touched.working_Email_Id && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.working_Email_Id}
                            </div>
                          )}
                      </div>
                    </div>

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
                    <div className="mb-4 col-md-6 col-lg-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="dob"
                          required
                          type="date"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.dob}
                          min="1900-01-01" // Set a reasonable past date
                          max={new Date().toISOString().split("T")[0]} // Prevent future dates
                        />

                        <label className="hm-razr-add-user-label">
                          Date of Birth*
                        </label>
                        {formik.errors.dob && formik.touched.dob && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.dob}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 col-md-6 col-lg-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="password"
                          required
                          type="password"
                          className="hm-razr-add-user-input"
                          placeholder=""
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                        <label className="hm-razr-add-user-label">
                          Password*
                        </label>

                        {formik.errors.password && formik.touched.password && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 col-md-6 col-lg-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          name="confirm_Password"
                          required
                          placeholder=""
                          type="password"
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.confirm_Password}
                        />

                        <label className="hm-razr-add-user-label">
                          Confirm Password*
                        </label>
                        {formik.errors.confirm_Password &&
                          formik.touched.confirm_Password && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.confirm_Password}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-6 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <textarea
                          className="hm-razr-add-user-input"
                          id="address"
                          name="address"
                          placeholder=""
                          rows={2}
                          onChange={formik.handleChange}
                          value={formik.values.address}
                        />
                        <label className="hm-razr-add-user-label">
                          {" "}
                          Permanent Address
                        </label>

                        {formik.errors.address && formik.touched.address && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.address}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-6 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <textarea
                          className="hm-razr-add-user-input"
                          id="office_Address"
                          name="office_Address"
                          placeholder=""
                          rows={2}
                          required
                          onChange={formik.handleChange}
                          value={formik.values.office_Address}
                        />
                        <label className="hm-razr-add-user-label">
                          Temporary Address*
                        </label>

                        {formik.errors.office_Address &&
                          formik.touched.office_Address && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.office_Address}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
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

                        {formik.errors.salary && formik.touched.salary && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.salary}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
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

                        {formik.errors.latitude && formik.touched.latitude && (
                          <div className="hm-razr-add-user-error">
                            {formik.errors.latitude}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <input
                          placeholder=""
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

                        {formik.errors.longitude &&
                          formik.touched.longitude && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.longitude}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="hm-razr-add-user-input-group">
                        <select
                          name="shift_Timing"
                          required
                          className="hm-razr-add-user-input"
                          onChange={formik.handleChange}
                          value={formik.values.shift_Timing}
                        >
                          <option value="">--Choose Shift Timings--</option>
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
                        {formik.errors.shift_Timing &&
                          formik.touched.shift_Timing && (
                            <div className="hm-razr-add-user-error">
                              {formik.errors.shift_Timing}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-profile" ? "show active" : ""
                  }`}
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row">
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
                      <input
                        name="user_Avatar"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        id="formFile"
                        className="form-control"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          formik.setFieldValue("user_Avatar", file);
                        }}
                      />
                      {formik.errors.user_Avatar &&
                        formik.touched.user_Avatar && (
                          <div className="error">
                            {formik.errors.user_Avatar}
                          </div>
                        )}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="mb-4">
                        <label className="mb-2 form-label">PAN</label>
                        <input
                          placeholder="Pan number"
                          name="pan_No"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.pan_No}
                        />
                        {formik.errors.pan_No && formik.touched.pan_No && (
                          <div className="error">{formik.errors.pan_No}</div>
                        )}
                      </div>
                      <div className="mt-4 mb-2">
                        <label className="mb-2 form-label">Adhar Number</label>
                        <input
                          placeholder="Adhar number"
                          name="adhaar_Number"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.adhaar_Number}
                        />
                        {formik.errors.adhaar_Number &&
                          formik.touched.adhaar_Number && (
                            <div className="error">
                              {formik.errors.adhaar_Number}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-lg-4">
                      <div className="mb-2">
                        <label className="mb-2 form-label">Other Docs</label>
                        <input
                          name="other_Document"
                          accept=".pdf"
                          type="file"
                          id="marksheet"
                          className="form-control"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "other_Document",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {formik.errors.other_Document &&
                          formik.touched.other_Document && (
                            <div className="error">
                              {formik.errors.other_Document}
                            </div>
                          )}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    currentTab === "pills-contact" ? "show active" : ""
                  }`}
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <label className="mb-2 form-label">
                        Bank Holder Name
                      </label>
                      <input
                        placeholder="Holder name"
                        name="bank_Holder_Name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.bank_Holder_Name}
                      />
                      {formik.errors.bank_Holder_Name &&
                        formik.touched.bank_Holder_Name && (
                          <div className="error">
                            {formik.errors.bank_Holder_Name}
                          </div>
                        )}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="mb-2 form-label">Bank Name</label>
                      <input
                        placeholder="Enter Bank Name"
                        name="bank_Name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.bank_Name}
                      />
                      {formik.errors.bank_Name && formik.touched.bank_Name && (
                        <div className="error">{formik.errors.bank_Name}</div>
                      )}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="mb-2 form-label">
                        Bank Account No.
                      </label>
                      <input
                        placeholder="Enter Account Number"
                        name="bank_Account_No"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.bank_Account_No}
                      />
                      {formik.errors.bank_Account_No &&
                        formik.touched.bank_Account_No && (
                          <div className="error">
                            {formik.errors.bank_Account_No}
                          </div>
                        )}
                    </div>
                    <div className="col-md-6 col-lg-4 mt-4">
                      <label className="mb-2 form-label">IFSC Code</label>
                      <input
                        placeholder="Enter IFSC Code"
                        name="ifsc_Code"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.ifsc_Code}
                      />
                      {formik.errors.ifsc_Code && formik.touched.ifsc_Code && (
                        <div className="error">{formik.errors.ifsc_Code}</div>
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
