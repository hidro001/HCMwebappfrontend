// src/components/EditEmployeePage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import DocumentField from "../superAdmin/DocumentField"; // Ensure this component exists
import { Puff } from "react-loader-spinner";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported
import Button from "react-bootstrap/Button";

const EditEmployeePage = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const navigate = useNavigate(); // For navigation after submission
  const [employeeData, setEmployeeData] = useState(null); // Store fetched employee data
  console.log(employeeData);
  const [departments, setDepartments] = useState([]); // List of departments
  const [availablePermission, setAvailablePermission] = useState([]); // List of permissions
  const [userRoles, setUserRoles] = useState([]); // List of user roles
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [allEmployees, setAllEmployees] = useState([]); // List of all employees for assigning managers
  const [addressOptions, setAddressOptions] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [isLoadingDesignations, setIsLoadingDesignations] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [isLoadingEmploymentTypes, setIsLoadingEmploymentTypes] =
    useState(false);
  const [shiftTimings, setShiftTimings] = useState([]);
  const [isLoadingShiftTimings, setIsLoadingShiftTimings] = useState(false);

  useEffect(() => {
    fetchAddressData();
    fetchDesignations();
    fetchEmploymentTypes();
    fetchShiftTimings();
  }, []);

  // Fetch designations from API
  const fetchDesignations = async () => {
    setIsLoadingDesignations(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/designations/get", // Replace with the actual API URL
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const options = response.data.data.map((designation) => ({
          label: designation.designation_name, // Display name in the dropdown
          value: designation.designation_name, // Unique identifier for the selection
          permissions: designation.permission || [], // Attach permissions for later use
        }));

        setDesignations(options);
      } else {
        toast.error("Failed to fetch designations.");
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
      toast.error("An error occurred while fetching designations.");
    } finally {
      setIsLoadingDesignations(false);
    }
  };

  // Fetch Address Data from API
  const fetchAddressData = async () => {
    setIsLoadingAddresses(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo", // Replace with your actual API endpoint
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Fetched company info:", response.data.data);

      if (response.data.success && response.data.data.length > 0) {
        // Assuming the API returns a single company info object
        const companyInfo = response.data.data[0];

        if (companyInfo.addresses && Array.isArray(companyInfo.addresses)) {
          const formattedAddresses = companyInfo.addresses.map((address) => ({
            value: address.address,
            label: address.address,
            latitude: address.latitude,
            longitude: address.longitude,
          }));
          setAddressOptions(formattedAddresses);
        } else {
          console.error("No addresses available in the company data.");
          toast.error("No addresses found in the company data.");
          setAddressOptions([]);
        }
      } else {
        toast.error(
          "Failed to fetch address data. No company information found."
        );
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
      toast.error("An error occurred while fetching address data.");
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  // Fetch necessary data on component mount
  useEffect(() => {
    fetchEmployeeData();
    fetchDepartments();
    fetchPermissions();
    fetchUserRoles();
    fetchAllEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch the employee data to edit
  const fetchEmployeeData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const employee = response.data.data;

        // Ensure assigned_to is mapped to an array of manager IDs
        employee.assigned_to =
          employee.assigned_to?.map((manager) => manager._id) || [];
        setEmployeeData(employee);
      } else {
        toast.error(response.data.message || "Failed to fetch employee data.");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("An error occurred while fetching employee data.");
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/departments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setDepartments(response.data.data || []);
      } else {
        toast.error(response.data.message || "Failed to fetch departments.");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("An error occurred while fetching departments.");
    }
  };

  // Fetch functions
  const fetchShiftTimings = async () => {
    setIsLoadingShiftTimings(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        const shifts = response.data.data.map((shift) => ({
          label: `${shift.name} (${shift.startTime} - ${shift.endTime})`,
          value: `${shift.name} (${shift.startTime} - ${shift.endTime})`,
        }));
        setShiftTimings(shifts);
      } else {
        console.error("Failed to fetch shift timings:", response.data.message);
        setShiftTimings([]);
        toast.error("Failed to load shift timings.");
      }
    } catch (error) {
      console.error("Error fetching shift timings:", error);
      setShiftTimings([]);
      toast.error("An error occurred while loading shift timings.");
    } finally {
      setIsLoadingShiftTimings(false);
    }
  };

  // Fetch permissions
  const fetchPermissions = () => {
    const permissions = [
      { name: "Super Admin Dashboard", permission: "SuperDashboard" },
      { name: "Manager Dashboard", permission: "managerDashboard" },
      { name: "Employee Dashboard", permission: "employeeDashboard" },
      { name: "View Policies", permission: "viewPolicies" },
      { name: "Update Policies", permission: "PolicySystem" },
      { name: "Post Orientation", permission: "postInduction" },
      { name: "View Orientation", permission: "viewInduction" },
      { name: "Super Admin Add Employee", permission: "addEmployeeAdmin" },
      { name: "Manager Add Employee", permission: "addEmployeeManager" },
      {
        name: "Super Admin Update Employee",
        permission: "updateEmployeeAdmin",
      },
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
      {
        name: "Add Department ",
        permission: "superAdminDepartmentDesignation",
      },
      { name: "Company Overview", permission: "CompanySettings" },
      { name: "Apply Leave Employee", permission: "applyLeaves" },
      { name: "Apply Leave Manager", permission: "acceptandrejectleave" },
      { name: "Employee Leave History", permission: "viewLeaves" },
      { name: "Attendance View", permission: "viewAttendance" },
      { name: "All Employes", permission: "updateEmployeeSuperAdmin" },
      { name: "Rate Subordinate", permission: "rateSubordinate" },
      {
        name: "View Subordinate Ratings",
        permission: "viewSubordinateRatings",
      },
      { name: "All Employes Rating", permission: "viewAllEmployeeRatings" },
      { name: "Post Top Performer", permission: "postTopPerformer" },
      { name: "View Top Performers Employes", permission: "viewTopPerformers" },
      { name: "Company Info", permission: "companyInfo" },
      { name: "Add Designation", permission: "addDesignation" },
      { name: "Set KPIs", permission: "setKPIs" },
    ];
    setAvailablePermission(permissions);
  };

  // Fetch user roles
  const fetchUserRoles = () => {
    const roles = [{ label: "Employee", value: "employee" }];
    setUserRoles(roles);
  };

  const fetchEmploymentTypes = async () => {
    setIsLoadingEmploymentTypes(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        const types = response.data.data.map((type) => ({
          label: type.name,
          value: type.name,
        }));
        setEmploymentTypes(types);
      } else {
        console.error(
          "Failed to fetch employment types:",
          response.data.message
        );
        setEmploymentTypes([]);
        toast.error("Failed to load employment types.");
      }
    } catch (error) {
      console.error("Error fetching employment types:", error);
      setEmploymentTypes([]);
      toast.error("An error occurred while loading employment types.");
    } finally {
      setIsLoadingEmploymentTypes(false);
    }
  };

  // Custom styles for react-select (optional)
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 0 1px #5264ae" : provided.boxShadow,
      "&:hover": {
        borderColor: "#5264ae",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e2e6ea",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#333",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#666",
      cursor: "pointer",
    }),
    multiValueRemoveHover: (provided) => ({
      ...provided,
      backgroundColor: "#ccc",
      color: "#000",
    }),
  };

  // Fetch all employees for assigning managers
  const fetchAllEmployees = async () => {
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
        // Remove the employee with the matching _id from the response data
        const filteredEmployees = response.data.data.filter(
          (employee) => employee._id !== id
        );

        setAllEmployees(filteredEmployees || []);
      } else {
        toast.error(response.data.message || "Failed to fetch employees.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("An error occurred while fetching employees.");
    }
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    first_Name: Yup.string().required("First Name is required"),
    last_Name: Yup.string().notRequired().default(""),
    designation: Yup.string().notRequired(),
    user_Role: Yup.string().required("User Role is required"),
    employee_Type: Yup.string().notRequired(),
    no_of_Paid_Leave: Yup.number()
      .typeError("Number of Paid Leaves must be a number")
      .min(0, "Number of Paid Leaves cannot be negative")
      .required("Number of Paid Leaves is required"),
    employee_Id: Yup.string().required("Employee ID is required"),
    mobile_No: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
      .required("Phone Number is required"),
    personal_Email_Id: Yup.string()
      .email("Invalid email address")
      .required("Personal Email ID is required"),
    working_Email_Id: Yup.string()
      .email("Invalid email address")
      .required("Working Email ID is required"),
    date_of_Joining: Yup.date().required("Date of Joining is required"),
    dob: Yup.date().required("Date of Birth is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("Salary is required"),
    latitude: Yup.string().typeError("Latitude must be a number").notRequired(),
    longitude: Yup.string()
      .typeError("Longitude must be a number")
      .notRequired(),
    shift_Timing: Yup.string().required("Shift Timings are required"),
    office_Address: Yup.string().notRequired(),
    departmentAlocated: Yup.string().required("Department is required"),
    assigned_to: Yup.array().of(Yup.string().notRequired()),
    permission: Yup.array()
      .min(1, "At least one permission must be selected")
      .required("Permissions are required"),
    address: Yup.string().notRequired().default(""),
    pan_No: Yup.string().notRequired().default(""),
    adhaar_Number: Yup.string().notRequired().default(""),
    user_Avatar: Yup.mixed().notRequired(),
    bank_Holder_Name: Yup.string().notRequired().default(""),
    bank_Name: Yup.string().notRequired().default(""),
    bank_Account_No: Yup.string().notRequired().default(""),
    ifsc_Code: Yup.string().notRequired().default(""),
    otp: Yup.string()
      .oneOf(["yes", "no"], "Invalid OTP selection")
      .required("OTP selection is required"),
    documents: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().notRequired(),
          file: Yup.mixed()
            .notRequired()
            .test("fileSize", "File too large (Max 5MB)", (value) => {
              if (!value) return true;
              return value.size <= 5 * 1024 * 1024;
            })
            .test("fileType", "Unsupported File Format", (value) => {
              if (!value) return true;
              return ["image/jpeg", "image/png", "application/pdf"].includes(
                value.type
              );
            }),
          preview: Yup.mixed().nullable(),
        })
      )
      .max(20, "Maximum of 20 documents allowed"),
  });

  const initialValues = {
    first_Name: employeeData?.first_Name || "",
    last_Name: employeeData?.last_Name || "",
    designation: employeeData?.designation || "",
    user_Role: employeeData?.user_Role || "",
    employee_Type: employeeData?.employee_Type || "",
    no_of_Paid_Leave: employeeData?.no_of_Paid_Leave || "",
    employee_Id: employeeData?.employee_Id || "",
    mobile_No: employeeData?.mobile_No || "",
    personal_Email_Id: employeeData?.personal_Email_Id || "",
    working_Email_Id: employeeData?.working_Email_Id || "",
    date_of_Joining: employeeData?.date_of_Joining
      ? employeeData.date_of_Joining.substring(0, 10)
      : "",
    dob: employeeData?.dob ? employeeData.dob.substring(0, 10) : "",
    salary: employeeData?.salary || "",
    latitude: employeeData?.latitude || "",
    longitude: employeeData?.longitude || "",
    shift_Timing: employeeData?.shift_Timing || "",
    office_Address: employeeData?.user_Address || "",
    departmentAlocated: employeeData?.department || "",
    otp: employeeData?.otp || "no",
    address: employeeData?.office_address || "",
    pan_No: employeeData?.pan_No || "",
    adhaar_Number: employeeData?.adhaar_Number || "",
    bank_Holder_Name: employeeData?.bank_Holder_Name || "",
    bank_Name: employeeData?.bank_Name || "",
    bank_Account_No: employeeData?.bank_Account_No || "",
    ifsc_Code: employeeData?.ifsc_Code || "",
    assigned_to: employeeData?.assigned_to || [],
    permission: employeeData?.permission || [],
    user_Avatar: employeeData?.user_Avatar || "", // Placeholder for a new avatar upload
    documents:
      employeeData?.documents?.length > 0
        ? employeeData.documents.map((doc) => ({
            name: doc.name || "",
            file: null, // Placeholder for new file upload
            preview: "update your document here", // Placeholder for file preview
          }))
        : [
            {
              name: "",
              file: null,
              preview: null,
            },
          ],
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const accessToken = localStorage.getItem("accessToken");
    const formDataObj = new FormData();

    // Append all form values except 'documents' and 'permission'
    for (const key in values) {
      if (key !== "documents" && key !== "permission") {
        if (values[key] !== null && values[key] !== "") {
          if (Array.isArray(values[key])) {
            values[key].forEach((val, index) => {
              formDataObj.append(`${key}[${index}]`, val);
            });
          } else {
            formDataObj.append(key, values[key]);
          }
        }
      }
    }

    // Append permissions as array elements
    values.permission.forEach((permission, index) => {
      formDataObj.append(`permission[${index}]`, permission);
    });

    // Append documents
    values.documents.forEach((doc, index) => {
      if (doc.name && doc.file) {
        formDataObj.append(`documents[${index}][name]`, doc.name);
        formDataObj.append(`documents[${index}][file]`, doc.file);
      }
    });

    // Append user_Avatar if a new file is uploaded
    if (values.user_Avatar) {
      formDataObj.append("user_Avatar", values.user_Avatar);
    }

    // API endpoint and method
    const apiUrl = `https://apiv2.humanmaximizer.com/api/v1/superadmin/employees/${id}`;
    const method = "put";

    // Confirmation alert using SweetAlert2
    Swal.fire({
      title: "Are you sure you want to update this user?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsSubmitting(true); // Start submission

          const response = await axios({
            method: method,
            url: apiUrl,
            data: formDataObj,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success("User updated successfully");
            // handleClose(); // Close the page or navigate back
            // refreshEmployees(); // Refresh the employee list
            navigate("/dashboard/update-employee"); // Navigate back to the employee list
            resetForm();
          } else {
            toast.error(
              "Operation failed: " + (response.data.message || "Unknown error")
            );
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
            toast.error("Operation failed: " + error.response.data.message);
          } else {
            toast.error("Operation failed: " + error.message);
          }
        } finally {
          setIsSubmitting(false); // End submission
        }
      }
    });
  };

  // Render loading state if employeeData is not yet fetched
  if (!employeeData) {
    return (
      <div className="text-center my-5">
        <Puff type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container  rzr-empdetails-edit">
          <h3>Edit Employee Details</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true} // Allow form to update when employeeData changes
            validateOnChange={false} // Disable validation on change
            validateOnBlur={true} // Enable validation on blur
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched,
              resetForm,
            }) => (
              <Form encType="multipart/form-data">
                {/* Edit Mode Indicator */}
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                  <span>
                    Editing Employee: {values.first_Name} {values.last_Name}{" "}
                    (ID: {values.employee_Id})
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      navigate("/dashboard/update-employee"); // Navigate back without saving
                      toast.info("Edit cancelled.");
                    }}
                  >
                    Cancel Edit
                  </Button>
                </div>

                {/* Employee Details Section */}
                <div className="row">
                  {/* First Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>First Name*</label>
                      <input
                        placeholder="First Name"
                        name="first_Name"
                        type="text"
                        className={`form-control ${
                          touched.first_Name && errors.first_Name
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_Name}
                      />
                      {touched.first_Name && errors.first_Name && (
                        <div className="invalid-feedback">
                          {errors.first_Name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        placeholder="Last Name"
                        name="last_Name"
                        type="text"
                        className={`form-control ${
                          touched.last_Name && errors.last_Name
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_Name}
                      />
                      {touched.last_Name && errors.last_Name && (
                        <div className="invalid-feedback">
                          {errors.last_Name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Designation Dropdown */}
                  <div className="mb-3">
                    {/* Designation Dropdown */}
                    <label className="form-label">Designation*</label>
                    <Select
                      name="designation"
                      options={designations}
                      isLoading={isLoadingDesignations}
                      onChange={(selectedOption) => {
                        setFieldValue(
                          "designation",
                          selectedOption ? selectedOption.value : ""
                        );
                        console.log("Selected Designation:", selectedOption);
                        console.log(
                          "Formik Designation Value:",
                          selectedOption ? selectedOption.value : ""
                        );

                        // Update permissions based on the selected designation
                        if (selectedOption?.permissions) {
                          const selectedPermissions =
                            selectedOption.permissions.map(
                              (perm) => perm.permission
                            );
                          setFieldValue("permission", selectedPermissions);
                        } else {
                          setFieldValue("permission", []);
                        }
                      }}
                      onBlur={handleBlur}
                      value={
                        designations.find(
                          (option) => option.value === values.designation
                        ) || null
                      }
                      placeholder="Select Designation"
                      isClearable
                      classNamePrefix="react-select"
                    />

                    {touched.designation && errors.designation && (
                      <div className="text-danger">{errors.designation}</div>
                    )}
                  </div>

                  {/* Department Allocated */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Department Allocated*</label>
                      <Select
                        name="departmentAlocated"
                        options={departments.map((dept) => ({
                          value: dept.department,
                          label: dept.department,
                        }))}
                        onChange={(selectedOption) =>
                          setFieldValue(
                            "departmentAlocated",
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        onBlur={handleBlur}
                        value={
                          departments
                            .map((dept) => ({
                              value: dept.department,
                              label: dept.department,
                            }))
                            .find(
                              (option) =>
                                option.value === values.departmentAlocated
                            ) || null
                        }
                        isClearable
                        placeholder="Select Department"
                        classNamePrefix="react-select"
                      />
                      {touched.departmentAlocated &&
                        errors.departmentAlocated && (
                          <div className="text-danger mt-1">
                            {errors.departmentAlocated}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Permissions*</label>
                      <Select
                        name="permission"
                        options={availablePermission.map((permission) => ({
                          value: permission.permission,
                          label: permission.name,
                        }))}
                        isMulti
                        onChange={(selectedOptions) =>
                          setFieldValue(
                            "permission",
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          )
                        }
                        onBlur={() => setFieldTouched("permission", true)}
                        value={availablePermission
                          .filter((permission) =>
                            values.permission.includes(permission.permission)
                          )
                          .map((permission) => ({
                            value: permission.permission,
                            label: permission.name,
                          }))}
                        classNamePrefix="react-select"
                        placeholder="Select Permissions"
                      />
                      {touched.permission && errors.permission && (
                        <div className="text-danger mt-1">
                          {errors.permission}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OTP Required Dropdown */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>OTP Required*</label>
                      <select
                        name="otp"
                        className={`form-control ${
                          touched.otp && errors.otp ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp}
                      >
                        <option value="">-- Select OTP Requirement --</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                      {touched.otp && errors.otp && (
                        <div className="invalid-feedback">{errors.otp}</div>
                      )}
                    </div>
                  </div>

                  {/* Assign Managers */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Assign Managers*</label>
                      <Select
                        name="assigned_to"
                        options={allEmployees.map((emp) => ({
                          value: emp._id,
                          label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
                        }))}
                        isMulti
                        onChange={(selectedOptions) =>
                          setFieldValue(
                            "assigned_to",
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          )
                        }
                        onBlur={() => setFieldTouched("assigned_to", true)}
                        value={allEmployees
                          .filter((emp) => values.assigned_to.includes(emp._id))
                          .map((emp) => ({
                            value: emp._id,
                            label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
                          }))}
                        classNamePrefix="react-select"
                        placeholder="Select Managers"
                      />
                      {touched.assigned_to && errors.assigned_to && (
                        <div className="text-danger mt-1">
                          {errors.assigned_to}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Number of Paid Leaves */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Number of Paid Leaves*</label>
                      <input
                        name="no_of_Paid_Leave"
                        type="number"
                        className={`form-control ${
                          touched.no_of_Paid_Leave && errors.no_of_Paid_Leave
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.no_of_Paid_Leave}
                        placeholder="Enter number of paid leaves"
                      />
                      {touched.no_of_Paid_Leave && errors.no_of_Paid_Leave && (
                        <div className="invalid-feedback">
                          {errors.no_of_Paid_Leave}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Role Dropdown */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>User Role*</label>
                      <Select
                        name="user_Role"
                        options={userRoles}
                        isDisabled={values.user_Role === "super-admin"} // Prevent changing to super-admin
                        onChange={(selectedOption) =>
                          setFieldValue(
                            "user_Role",
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        onBlur={handleBlur}
                        value={
                          userRoles.find(
                            (role) => role.value === values.user_Role
                          ) || null
                        }
                        isClearable
                        placeholder="Select User Role"
                        classNamePrefix="react-select"
                      />
                      {touched.user_Role && errors.user_Role && (
                        <div className="text-danger mt-1">
                          {errors.user_Role}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Employee Type Dropdown */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="mb-2 form-label">Employee Type*</label>
                    <Select
                      name="employee_Type"
                      options={employmentTypes}
                      isLoading={isLoadingEmploymentTypes}
                      onChange={(selectedOption) =>
                        setFieldValue(
                          "employee_Type",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      onBlur={handleBlur}
                      value={
                        employmentTypes.find(
                          (option) => option.value === values.employee_Type
                        ) || null
                      }
                      isClearable
                      placeholder="Select Employee Type"
                      classNamePrefix="react-select"
                      styles={customSelectStyles}
                    />
                    {touched.employee_Type && errors.employee_Type && (
                      <div className="hm-razr-add-user-error">
                        {errors.employee_Type}
                      </div>
                    )}
                  </div>

                  {/* Employee ID */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Employee ID*</label>
                      <input
                        name="employee_Id"
                        type="text"
                        className={`form-control ${
                          touched.employee_Id && errors.employee_Id
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.employee_Id}
                        placeholder="Employee ID"
                        disabled // Disable editing Employee ID in edit mode
                      />
                      {touched.employee_Id && errors.employee_Id && (
                        <div className="invalid-feedback">
                          {errors.employee_Id}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Phone Number*</label>
                      <input
                        name="mobile_No"
                        type="text"
                        className={`form-control ${
                          touched.mobile_No && errors.mobile_No
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile_No}
                        placeholder="Enter Phone Number"
                      />
                      {touched.mobile_No && errors.mobile_No && (
                        <div className="invalid-feedback">
                          {errors.mobile_No}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Email ID */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Personal Email ID*</label>
                      <input
                        name="personal_Email_Id"
                        type="email"
                        className={`form-control ${
                          touched.personal_Email_Id && errors.personal_Email_Id
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.personal_Email_Id}
                        placeholder="Enter Personal Email ID"
                      />
                      {touched.personal_Email_Id &&
                        errors.personal_Email_Id && (
                          <div className="invalid-feedback">
                            {errors.personal_Email_Id}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Working Email ID */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Working Email ID*</label>
                      <input
                        name="working_Email_Id"
                        type="email"
                        className={`form-control ${
                          touched.working_Email_Id && errors.working_Email_Id
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.working_Email_Id}
                        placeholder="Enter Working Email ID"
                      />
                      {touched.working_Email_Id && errors.working_Email_Id && (
                        <div className="invalid-feedback">
                          {errors.working_Email_Id}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date of Joining */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Date of Joining*</label>
                      <input
                        name="date_of_Joining"
                        type="date"
                        className={`form-control ${
                          touched.date_of_Joining && errors.date_of_Joining
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date_of_Joining}
                      />
                      {touched.date_of_Joining && errors.date_of_Joining && (
                        <div className="invalid-feedback">
                          {errors.date_of_Joining}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Date of Birth*</label>
                      <input
                        name="dob"
                        type="date"
                        className={`form-control ${
                          touched.dob && errors.dob ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dob}
                      />
                      {touched.dob && errors.dob && (
                        <div className="invalid-feedback">{errors.dob}</div>
                      )}
                    </div>
                  </div>

                  {/* Shift Timings */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <label className="mb-2 form-label">Shift Timings*</label>
                    <Select
                      name="shift_Timing"
                      options={shiftTimings}
                      isLoading={isLoadingShiftTimings}
                      onChange={(selectedOption) =>
                        setFieldValue(
                          "shift_Timing",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      onBlur={handleBlur}
                      value={
                        shiftTimings.find(
                          (option) => option.value === values.shift_Timing
                        ) || null
                      }
                      isClearable
                      placeholder="Select Shift Timings"
                      classNamePrefix="react-select"
                      styles={customSelectStyles}
                    />
                    {touched.shift_Timing && errors.shift_Timing && (
                      <div className="hm-razr-add-user-error">
                        {errors.shift_Timing}
                      </div>
                    )}
                  </div>

                  {/* Salary */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Salary*</label>
                      <input
                        name="salary"
                        type="number"
                        className={`form-control ${
                          touched.salary && errors.salary ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.salary}
                        placeholder="Enter Salary"
                      />
                      {touched.salary && errors.salary && (
                        <div className="invalid-feedback">{errors.salary}</div>
                      )}
                    </div>
                  </div>

                  {/* Address Dropdown */}
                  <div className="form-group">
                    <label>Address*</label>
                    <Select
                      options={addressOptions}
                      isLoading={isLoadingAddresses}
                      onChange={(selectedOption) => {
                        setFieldValue("address", selectedOption.value);
                        setFieldValue("latitude", selectedOption.latitude);
                        setFieldValue("longitude", selectedOption.longitude);
                      }}
                      value={
                        addressOptions.find(
                          (option) => option.value === values.address
                        ) || null
                      }
                      placeholder="Select Address"
                      classNamePrefix="react-select"
                    />
                    {touched.address && errors.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </div>

                  {/* Latitude */}
                  <div className="form-group">
                    <label>Latitude*</label>
                    <input
                      type="text"
                      name="latitude"
                      className={`form-control ${
                        touched.latitude && errors.latitude ? "is-invalid" : ""
                      }`}
                      value={values.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                    />
                    {touched.latitude && errors.latitude && (
                      <div className="text-danger">{errors.latitude}</div>
                    )}
                  </div>

                  {/* Longitude */}
                  <div className="form-group">
                    <label>Longitude*</label>
                    <input
                      type="text"
                      name="longitude"
                      className={`form-control ${
                        touched.longitude && errors.longitude
                          ? "is-invalid"
                          : ""
                      }`}
                      value={values.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                    />
                    {touched.longitude && errors.longitude && (
                      <div className="text-danger">{errors.longitude}</div>
                    )}
                  </div>

                  {/* Temporary Address */}
                  <div className="col-md-6 col-lg-6 mb-4">
                    <div className="form-group">
                      <label>User Address*</label>
                      <textarea
                        name="office_Address"
                        className={`form-control ${
                          touched.office_Address && errors.office_Address
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.office_Address}
                        placeholder="Enter Temporary Address"
                        rows={3}
                      ></textarea>
                      {touched.office_Address && errors.office_Address && (
                        <div className="invalid-feedback">
                          {errors.office_Address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Details Section */}
                <div className="row">
                  {/* Profile Photo */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Upload Photo</label>
                      <div className="mb-3">
                        {values.user_Avatar ? (
                          typeof values.user_Avatar === "object" ? (
                            <img
                              src={URL.createObjectURL(values.user_Avatar)}
                              alt="User Avatar"
                              className="img-thumbnail"
                              style={{ maxWidth: "200px" }}
                            />
                          ) : (
                            <img
                              src={values.user_Avatar}
                              alt="User Avatar"
                              className="img-thumbnail"
                              style={{ maxWidth: "200px" }}
                            />
                          )
                        ) : (
                          <img
                            src="https://ems11.s3.amazonaws.com/user-profile.jpg"
                            alt="Default Avatar"
                            className="img-thumbnail"
                            style={{ maxWidth: "200px" }}
                          />
                        )}
                      </div>
                      <input
                        name="user_Avatar"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        className={`form-control ${
                          touched.user_Avatar && errors.user_Avatar
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("user_Avatar", file);
                        }}
                      />
                      {touched.user_Avatar && errors.user_Avatar && (
                        <div className="invalid-feedback">
                          {errors.user_Avatar}
                        </div>
                      )}
                    </div>

                    {/* Document Uploads */}
                    <div className="form-group mt-4">
                      <label>Upload Documents</label>
                      <FieldArray
                        name="documents"
                        render={(arrayHelpers) => (
                          <div>
                            {values.documents && values.documents.length > 0 ? (
                              values.documents.map((doc, index) => (
                                <DocumentField
                                  key={index}
                                  index={index}
                                  remove={arrayHelpers.remove}
                                  maxDocuments={values.documents.length >= 20}
                                />
                              ))
                            ) : (
                              <p>No documents. Please add one.</p>
                            )}
                            {values.documents.length < 20 && (
                              <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={() =>
                                  arrayHelpers.push({
                                    name: "",
                                    file: null,
                                    preview: null,
                                  })
                                }
                              >
                                Add More Documents
                              </button>
                            )}
                            {values.documents.length >= 20 && (
                              <p className="text-danger mt-2">
                                Maximum of 20 documents allowed.
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* PAN and Aadhaar */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>PAN</label>
                      <input
                        name="pan_No"
                        type="text"
                        className={`form-control ${
                          touched.pan_No && errors.pan_No ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pan_No}
                        placeholder="Enter PAN Number"
                      />
                      {touched.pan_No && errors.pan_No && (
                        <div className="invalid-feedback">{errors.pan_No}</div>
                      )}
                    </div>

                    <div className="form-group mt-4">
                      <label>Aadhaar Number</label>
                      <input
                        name="adhaar_Number"
                        type="text"
                        className={`form-control ${
                          touched.adhaar_Number && errors.adhaar_Number
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.adhaar_Number}
                        placeholder="Enter Aadhaar Number"
                      />
                      {touched.adhaar_Number && errors.adhaar_Number && (
                        <div className="invalid-feedback">
                          {errors.adhaar_Number}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bank Details Section */}
                <div className="row">
                  {/* Bank Holder Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Bank Holder Name</label>
                      <input
                        name="bank_Holder_Name"
                        type="text"
                        className={`form-control ${
                          touched.bank_Holder_Name && errors.bank_Holder_Name
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bank_Holder_Name}
                        placeholder="Enter Bank Holder Name"
                      />
                      {touched.bank_Holder_Name && errors.bank_Holder_Name && (
                        <div className="invalid-feedback">
                          {errors.bank_Holder_Name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input
                        name="bank_Name"
                        type="text"
                        className={`form-control ${
                          touched.bank_Name && errors.bank_Name
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bank_Name}
                        placeholder="Enter Bank Name"
                      />
                      {touched.bank_Name && errors.bank_Name && (
                        <div className="invalid-feedback">
                          {errors.bank_Name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bank Account No. */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>Bank Account No.</label>
                      <input
                        name="bank_Account_No"
                        type="text"
                        className={`form-control ${
                          touched.bank_Account_No && errors.bank_Account_No
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bank_Account_No}
                        placeholder="Enter Bank Account Number"
                      />
                      {touched.bank_Account_No && errors.bank_Account_No && (
                        <div className="invalid-feedback">
                          {errors.bank_Account_No}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input
                        name="ifsc_Code"
                        type="text"
                        className={`form-control ${
                          touched.ifsc_Code && errors.ifsc_Code
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ifsc_Code}
                        placeholder="Enter IFSC Code"
                      />
                      {touched.ifsc_Code && errors.ifsc_Code && (
                        <div className="invalid-feedback">
                          {errors.ifsc_Code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Puff type="Puff" color="#fff" height={20} width={20} />
                      &nbsp; Updating...
                    </>
                  ) : (
                    "Update Employee"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePage;
