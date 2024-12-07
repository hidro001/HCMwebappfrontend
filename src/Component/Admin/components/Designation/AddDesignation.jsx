// src/components/AddDesignation.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate

const AddDesignation = () => {
  // Static list of available permissions
  const navigate = useNavigate(); // Initialize the navigate hook

  const availablePermissions = [
    { name: "Super Admin Dashboard", permission: "SuperDashboard" },
    { name: "Manager Dashboard", permission: "managerDashboard" },
    { name: "Employee Dashboard", permission: "employeeDashboard" },
    { name: "View Policies", permission: "viewPolicies" },
    { name: "Update Policies", permission: "PolicySystem" },
    { name: "Post Orientation", permission: "postInduction" },
    { name: "View Orientation", permission: "viewInduction" },
    { name: "Super Admin Add Employee", permission: "addEmployeeAdmin" },
    { name: "Manager Add Employee", permission: "addEmployeeManager" },
    { name: "Super Admin Update Employee", permission: "updateEmployeeAdmin" },
    { name: "Manager Update Employee", permission: "updateEmployeeManager" },
    { name: "Delete Employee", permission: "deleteEmployeeAdmin" },
    { name: "View Employee", permission: "viewEmployeeAdmin" },
    {
      name: "Active/Inactive Employee",
      permission: "active/InactiveEmployeeAdmin",
    },
    { name: "Organization Chart", permission: "organizationChart" },
    { name: "View Daily Tasks", permission: "ViewTaskManager" },
    { name: "Update Daily Tasks", permission: "updateTask" },
    { name: "Job Posting", permission: "jobPostingAdmin" },
    { name: "Job Management", permission: "jobVacancyAdmin" },
    { name: "View Job Vacanies", permission: "viewVacancies" },
    { name: "View All Issue", permission: "IssueManagementSuperAdmin" },
    { name: "Raise A Issue", permission: "getSupport" },
    { name: "Issues Management", permission: "manageIssuesAdmin" },
    { name: "Assign Task", permission: "ActionTrackerManager" },
    { name: "View Task Assigned", permission: "actionTracker" },
    { name: "RACI Business", permission: "Raci2" },
    { name: "RACI OPS", permission: "superAdminRaci" },
    { name: "Payroll Management", permission: "payroll" },
    { name: "View My Profile", permission: "viewProfile" },
    { name: "Post Announcement", permission: "AddAnnouncement" },
    { name: "View Attendance & Payroll", permission: "myAttendance" },
    { name: "Training Material", permission: "trainingMaterial" },
    { name: "Add Department ", permission: "superAdminDepartmentDesignation" },
    { name: "Company Overview", permission: "CompanySettings" },
    { name: "Apply Leave Employee", permission: "applyLeaves" },
    { name: "Apply Leave Manager", permission: "acceptandrejectleave" },
    { name: "Employee Leave History", permission: "viewLeaves" },
    { name: "Attendance View", permission: "viewAttendance" },
    { name: "All Employes", permission: "updateEmployeeSuperAdmin" },
    { name: "Rate Subordinate", permission: "rateSubordinate" },
    { name: "View Subordinate Ratings", permission: "viewSubordinateRatings" },
    { name: "All Employes Rating", permission: "viewAllEmployeeRatings" },
    { name: "Post Top Performer", permission: "postTopPerformer" },
    { name: "View Top Performers Employes", permission: "viewTopPerformers" },
    { name: "Company Info", permission: "companyInfo" },
    { name: "Add Designation", permission: "addDesignation" },
  ];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      designation_name: "",
      permission: [], // Array of selected permissions
    },
    validationSchema: Yup.object({
      designation_name: Yup.string()
        .trim()
        .required("Designation name is required"),
      permission: Yup.array()
        .of(Yup.string())
        .min(1, "At least one permission must be selected")
        .required("Permissions are required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // Confirmation alert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this designation?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
          }

          // API endpoint
          const endpoint = "https://apiv2.humanmaximizer.com/api/v1/designations/add"; // Adjust if necessary

          // Make POST request to backend
          const response = await axios.post(endpoint, values, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            toast.success("Designation added successfully!");
            resetForm();
          } else {
            toast.error(
              "Failed to add designation: " +
                (response.data.message || "Unknown error")
            );
          }
        } catch (error) {
          console.error("Error adding designation:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error("Error: " + error.response.data.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Designation addition canceled.");
      }
    },
  });

  // Handle permission checkbox change
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      formik.setFieldValue("permission", [...formik.values.permission, value]);
    } else {
      formik.setFieldValue(
        "permission",
        formik.values.permission.filter((perm) => perm !== value)
      );
    }
  };

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container mt-5 p-5  ">
          <Link to="/dashboard/designations">
            <button className="btn btn-primary">See ALL Designation</button>
          </Link>
          <h2>Add New Designation</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Designation Name */}
            <div className="mb-3">
              <label htmlFor="designation_name" className="form-label">
                Designation Name<span className="text-danger">*</span>
              </label>
              <input
                id="designation_name"
                name="designation_name"
                type="text"
                className={`form-control ${
                  formik.touched.designation_name &&
                  formik.errors.designation_name
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.designation_name}
                placeholder="Enter designation name"
              />
              {formik.touched.designation_name &&
              formik.errors.designation_name ? (
                <div className="invalid-feedback">
                  {formik.errors.designation_name}
                </div>
              ) : null}
            </div>

            {/* Permissions */}
            <div className="mb-3">
              <label className="form-label">
                Permissions<span className="text-danger">*</span>
              </label>
              <div className="form-check">
                {availablePermissions.map((perm, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      id={`permission-${perm.permission}`}
                      name="permission"
                      value={perm.permission}
                      className="form-check-input"
                      onChange={handlePermissionChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.permission.includes(
                        perm.permission
                      )}
                    />
                    <label
                      htmlFor={`permission-${perm.permission}`}
                      className="form-check-label"
                    >
                      {perm.name}
                    </label>
                  </div>
                ))}
              </div>
              {formik.touched.permission && formik.errors.permission ? (
                <div className="text-danger">{formik.errors.permission}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Add Designation
            </button>
          </form>

          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddDesignation;
