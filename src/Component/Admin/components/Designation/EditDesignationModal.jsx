import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const EditDesignationModal = ({ designation, onClose, onEditSuccess }) => {
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
      designation_name: designation.designation_name || "",
      permission: designation.permission || [], // Ensure permission is an array of objects
    },
    validationSchema: Yup.object({
      designation_name: Yup.string()
        .trim()
        .required("Designation name is required"),
      permission: Yup.array()
        .of(
          Yup.object({
            name: Yup.string().required(),
            permission: Yup.string().required(),
          })
        )
        .min(1, "At least one permission must be selected")
        .required("Permissions are required"),
    }),
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save these changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
          }
          console.log("======================.>", designation.id);
          const endpoint = `https://apiv2.humanmaximizer.com/api/v1/designations/${designation.id}`;

          const response = await axios.put(
            endpoint,
            { ...values }, // Send the updated values
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            toast.success("Designation updated successfully!");
            onEditSuccess();
          } else {
            toast.error(
              "Failed to update designation: " +
                (response.data.message || "Unknown error")
            );
          }
        } catch (error) {
          console.error("Error updating designation:", error);
          toast.error(
            error.response?.data?.message || "An unexpected error occurred."
          );
        }
      } else {
        toast.info("Update canceled.");
      }
    },
  });

  const handlePermissionChange = (permission) => {
    const existingPermissions = formik.values.permission;

    if (
      existingPermissions.some(
        (perm) => perm.permission === permission.permission
      )
    ) {
      // Remove if already exists
      formik.setFieldValue(
        "permission",
        existingPermissions.filter(
          (perm) => perm.permission !== permission.permission
        )
      );
    } else {
      // Add if not exists
      formik.setFieldValue("permission", [...existingPermissions, permission]);
    }
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Designation</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
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
                        id={`edit-permission-${perm.permission}`}
                        name="permission"
                        value={perm.permission}
                        className="form-check-input"
                        onChange={() => handlePermissionChange(perm)}
                        onBlur={formik.handleBlur}
                        checked={formik.values.permission.some(
                          (p) => p.permission === perm.permission
                        )}
                      />
                      <label
                        htmlFor={`edit-permission-${perm.permission}`}
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDesignationModal;
