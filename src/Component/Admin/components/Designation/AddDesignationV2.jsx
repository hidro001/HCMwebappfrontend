import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const AddDesignationV2 = () => {
  const navigate = useNavigate();

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
        .min(1, "At least one permission must be selected")
        .required("Permissions are required"),
    }),
    onSubmit: async (values, { resetForm }) => {
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

          const endpoint = "https://apiv2.humanmaximizer.com/api/v1/designations/add";

          const payload = {
            designation_name: values.designation_name,
            permission: values.permission.map((perm) => ({
              name: perm.label, // 'label' is mapped to 'name'
              permission: perm.value, // 'value' is now correctly mapped
            })),
          };

          const response = await axios.post(endpoint, payload, {
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
          toast.error(
            error.response?.data?.message || "An unexpected error occurred."
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Designation addition canceled.");
      }
    },
  });

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container mt-5 p-5 rzr-adddesg">
          <Link to="/dashboard/designations">
            <button className="btn btn-primary">See ALL Designations</button>
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
              <Select
                isMulti
                name="permission"
                options={availablePermissions.map((perm) => ({
                  label: perm.name, // Map 'name' to 'label'
                  value: perm.permission, // Corrected to use 'permission'
                }))}
                className={`basic-multi-select ${
                  formik.touched.permission && formik.errors.permission
                    ? "is-invalid"
                    : ""
                }`}
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  formik.setFieldValue("permission", selectedOptions || [])
                }
                onBlur={formik.handleBlur}
                value={formik.values.permission}
              />
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

export default AddDesignationV2;
