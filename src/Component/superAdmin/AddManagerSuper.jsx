import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Puff } from "react-loader-spinner";
import DocumentField from "./DocumentField";

export default function AddManagerSuper() {
  // State variables
  const [currentTab, setCurrentTab] = useState("pills-home");
  const [departments, setDepartments] = useState([]);
  const [shiftTimings, setShiftTimings] = useState([]);
  const [isLoadingShiftTimings, setIsLoadingShiftTimings] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEmploymentTypes, setIsLoadingEmploymentTypes] =
    useState(false);

  const [designations, setDesignations] = useState([]);
  const [isLoadingDesignations, setIsLoadingDesignations] = useState(false);
  const [addressOptions, setAddressOptions] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  useEffect(() => {
    fetchShiftTimings();
    fetchEmploymentTypes();
    fetchDepartments();
    fetchAllEmployees();
    fetchDesignations();
    fetchAddressData();
  }, []);

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
          value: shift.id,
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
          value: type.id,
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
        const deptOptions = response.data.data.map((dept) => ({
          label: dept.department,
          value: dept.department,
        }));
        setDepartments(deptOptions);
      } else {
        console.error("Failed to fetch departments:", response.data.message);
        setDepartments([]);
        toast.error("Failed to load departments.");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
      toast.error("An error occurred while loading departments.");
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/user/all-user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const employeeOptions = response.data.data.map((emp) => ({
          value: emp._id,
          label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
        }));
        setAllEmployees(employeeOptions);
      } else {
        toast.error(response.data.message || "Failed to fetch employees.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("An error occurred while fetching employees.");
    }
  };

  // Define available roles and permissions
  const userRoles = [{ label: "Employee", value: "employee" }];

  const availablePermission = [
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
    { name: "Set KPIs", permission: "setKPIs" },
  ];

  // Formik validation schema using Yup
  const validationSchema = Yup.object({
    first_Name: Yup.string().required("First Name is required"),
    last_Name: Yup.string().notRequired().default(""),
    department: Yup.string().notRequired().default(""),
    departmentAllocated: Yup.string().required("Department is required"), // Corrected spelling
    designation: Yup.string().required("Designation is required"),
    user_Role: Yup.string().required("User Role is required"),
    employee_Type: Yup.string().required("Employee Type is required"),
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
    // latitude: Yup.string()
    //   .typeError("Latitude must be a number")
    //   .required("Latitude is required"),
    // longitude: Yup.string()
    //   .typeError("Longitude must be a number")
    //   .required("Longitude is required"),
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),

    shift_Timing: Yup.string().required("Shift Timings are required"),
    office_Address: Yup.string().required("Temporary Address is required"),
    departmentAlocated: Yup.string().required("Department is required"),
    assigned_to: Yup.array()
      .of(Yup.string().required("Each manager must have a valid ID"))
      .min(1, "At least one manager must be assigned")
      .max(5, "You can assign up to 5 managers"), // Adjust max as needed
    permission: Yup.array()
      .min(1, "At least one permission must be selected")
      .required("Permissions are required"),
    address: Yup.string().notRequired().default(""),
    pan_No: Yup.string()
      .notRequired()
      .default("")
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "PAN number must be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
      ),
    adhaar_Number: Yup.string()
      .notRequired()
      .default("")
      .matches(/^\d{12}$/, "Aadhaar number must be a 12-digit number"),
    user_Avatar: Yup.mixed().notRequired(),
    bank_Holder_Name: Yup.string().notRequired().default(""),
    bank_Name: Yup.string().notRequired().default(""),
    bank_Account_No: Yup.string()
      .notRequired()
      .default("")
      .matches(
        /^[0-9]{9,18}$/,
        "Bank account number must be between 9 and 18 digits"
      ),
    ifsc_Code: Yup.string()
      .notRequired()
      .default("")
      .matches(
        /^[A-Z0-9]{11}$/,
        "IFSC Code must be 11 characters long, containing only letters and numbers"
      ),
    // **OTP Field Validation**
    otp: Yup.string()
      .oneOf(["yes", "no"], "Invalid OTP selection")
      .required("OTP selection is required"),
    // **Document Uploads Validation (Dynamic)**
    documents: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Document name is required"),
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

  // Initial form values
  const initialValues = {
    first_Name: "",
    last_Name: "",
    department: "",
    designation: "",
    employee_Type: "", // Holds the ID
    no_of_Paid_Leave: "",
    user_Role: "",
    employee_Id: "",
    mobile_No: "",
    personal_Email_Id: "",
    working_Email_Id: "",
    date_of_Joining: "",
    salary: "",
    latitude: "",
    longitude: "",
    shift_Timing: "", // Holds the ID
    office_Address: "",
    permission: [],
    departmentAllocated: "",
    otp: "no",
    dob: "",
    assigned_to: [],
    address: "",
    user_Avatar: null,
    pan_No: "",
    adhaar_Number: "",
    bank_Holder_Name: "",
    bank_Name: "",
    bank_Account_No: "",
    ifsc_Code: "",
    documents: [
      {
        name: "",
        file: null,
        preview: null,
      },
    ],
  };

  // Form submission handler (Updated)
  const handleSubmit = async (values, { resetForm }) => {
    const accessToken = localStorage.getItem("accessToken");
    const formDataObj = new FormData();

    // Append longitude and latitude

    if (values.latitude) {
      formDataObj.append("latitude", values.latitude);
    } else {
      console.error("Latitude is missing.");
    }
    if (values.longitude) {
      formDataObj.append("longitude", values.longitude);
    } else {
      console.error("Longitude is missing.");
    }

    // // Append other fields...
    // for (const key in values) {
    //   if (key !== "latitude" && key !== "longitude" && values[key]) {
    //     formDataObj.append(key, values[key]);
    //   }
    // }
    // console.log("Payload to Submit:", Object.fromEntries(formDataObj));

    // Find the selected employee type by ID to get the name
    const selectedEmploymentType = employmentTypes.find(
      (type) => type.value === values.employee_Type
    );

    if (selectedEmploymentType) {
      formDataObj.append("employee_Type", selectedEmploymentType.label);
    } else {
      toast.error("Selected Employee Type is invalid.");
      return; // Exit if the selection is invalid
    }
    // if (values.designation) {
    //   formDataObj.append("designation", values.designation);
    // }
    // console.log(values.designation);

    // Find the selected shift timing by ID to get startTime and endTime
    const selectedShiftTiming = shiftTimings.find(
      (shift) => shift.value === values.shift_Timing
    );

    if (selectedShiftTiming) {
      // Assuming you want to send startTime and endTime separately
      // Adjust the keys as per your backend requirements
      const timingParts = selectedShiftTiming.label.match(/\((.*?)\)/);
      if (timingParts && timingParts[1]) {
        const [startTime, endTime] = timingParts[1].split(" - ");
        formDataObj.append("shift_StartTime", startTime.trim());
        formDataObj.append("shift_EndTime", endTime.trim());
      } else {
        // Fallback if parsing fails
        formDataObj.append("shift_StartTime", selectedShiftTiming.label);
        formDataObj.append("shift_EndTime", "");
      }
    } else {
      toast.error("Selected Shift Timing is invalid.");
      return; // Exit if the selection is invalid
    }

    // Append all other form values except 'employee_Type', 'shift_Timing', 'documents', and 'permission'
    for (const key in values) {
      if (
        key !== "documents" &&
        key !== "permission" &&
        key !== "employee_Type" &&
        key !== "shift_Timing"
      ) {
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

    // Confirmation alert using SweetAlert2
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
          setIsSubmitting(true); // Start submission

          const response = await axios.post(
            `https://apiv2.humanmaximizer.com/api/v1/superadmin/register`, // Adjust the URL as needed
            formDataObj,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.success) {
            toast.success("User registered successfully");
            resetForm();
            setCurrentTab("pills-home");
            setSelectedManagers([]);
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
            toast.error("Registration failed: " + error.response.data.message);
          } else {
            toast.error("Registration failed: " + error.message);
          }
          setCurrentTab("pills-home");
        } finally {
          setIsSubmitting(false); // End submission
        }
      } else {
        setIsSubmitting(false); // End submission if cancelled
      }
    });
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

  // Function to navigate to the next tab
  const handleNext = (formik) => {
    const { values, resetForm } = formik; // Destructure necessary Formik methods

    // Navigate to the next tab
    if (currentTab === "pills-home") {
      setCurrentTab("pills-profile");
    } else if (currentTab === "pills-profile") {
      setCurrentTab("pills-contact");
    } else if (currentTab === "pills-contact") {
      // Submit the form on the last tab
      handleSubmit(values, { resetForm });
    }
  };

  // Allow tab navigation without validation
  const handleTabClick = (tab) => {
    setCurrentTab(tab); // Allow navigation without validation
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-5">
          <div className="all-employee">
            {isSubmitting && (
              <div className="loading-overlay">
                <Puff type="Puff" color="#00BFFF" height={100} width={100} />
              </div>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
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
                <Form id="userForm" encType="multipart/form-data">
                  {/* Autofill Button for Testing */}
                  {/* <button
                    type="button"
                    onClick={() => {
                      // Autofill test data
                      setFieldValue("first_Name", "John");
                      setFieldValue("last_Name", "Doe");
                      // setFieldValue("department", "HR");
                      setFieldValue("departmentAllocated", "IT"); // Corrected spelling
                      setFieldValue("designation", "Manager");
                      setFieldValue("user_Role", "manager");
                      setFieldValue("employee_Id", "EMP123");
                      setFieldValue("mobile_No", "9876543210");
                      setFieldValue("personal_Email_Id", "johndoe@example.com");
                      setFieldValue("working_Email_Id", "john.doe@company.com");
                      setFieldValue("date_of_Joining", "2022-01-01");
                      setFieldValue("salary", "50000");
                      setFieldValue("latitude", "37.7749");
                      setFieldValue("longitude", "-122.4194");
                      setFieldValue("shift_Timing", "673d8ce1b5bebb5b72a3e159"); // Example ID
                      setFieldValue(
                        "office_Address",
                        "123 Main St, San Francisco, CA"
                      );
                      setFieldValue("permission", [
                        "dashboardAdmin",
                        "manageEmployeesAdmin",
                      ]);
                      setFieldValue("departmentAlocated", "IT");
                      setFieldValue("assigned_to", [
                        "6703b3540191e3814d14ea40",
                      ]); // Set to valid ObjectId
                      setFieldValue("dob", "1990-05-15");
                      setFieldValue("address", "456 Elm St, San Francisco, CA");
                      setFieldValue("otp", "yes"); // **Setting OTP to 'yes' for test data**
                      setFieldValue("pan_No", "ABCDE1234F");
                      setFieldValue("adhaar_Number", "123456789012");
                      setFieldValue("bank_Holder_Name", "John Doe");
                      setFieldValue("bank_Name", "Bank of America");
                      setFieldValue("bank_Account_No", "123456789012");
                      setFieldValue("ifsc_Code", "BOFA0001234");
                      setFieldValue(
                        "employee_Type",
                        "673d8d1bb5bebb5b72a3e169"
                      ); // Example ID
                      setFieldValue("no_of_Paid_Leave", "12");

                      // Initialize documents
                      setFieldValue("documents", [
                        {
                          name: "Aadhar Card",
                          file: null,
                          preview: null,
                        },
                        {
                          name: "PAN Card",
                          file: null,
                          preview: null,
                        },
                        {
                          name: "Marksheet",
                          file: null,
                          preview: null,
                        },
                        // Add more documents as needed for testing
                      ]);

                      setSelectedManagers([]);
                    }}
                    className="btn btn-primary mb-3"
                    disabled={isSubmitting} // Disable while submitting
                  >
                    Autofill Test Data
                  </button> */}

                  {/* Tabs Navigation */}
                  <ul
                    className="nav nav-pills mb-4"
                    id="pills-tab"
                    role="tablist"
                  >
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

                  {/* Tabs Content */}
                  <div className="tab-content" id="pills-tabContent">
                    {/* Employee Details Tab */}
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
                              placeholder=" "
                              required
                              name="first_Name"
                              type="text"
                              className={`hm-razr-add-user-input ${
                                touched.first_Name && errors.first_Name
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.first_Name}
                            />
                            <label className="hm-razr-add-user-label">
                              First Name*
                            </label>
                          </div>
                          {touched.first_Name && errors.first_Name && (
                            <div className="hm-razr-add-user-error">
                              {errors.first_Name}
                            </div>
                          )}
                        </div>

                        {/* Last Name */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="hm-razr-add-user-input-group">
                            <input
                              name="last_Name"
                              type="text"
                              className={`hm-razr-add-user-input ${
                                touched.last_Name && errors.last_Name
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.last_Name}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Last Name
                            </label>
                          </div>
                          {touched.last_Name && errors.last_Name && (
                            <div className="hm-razr-add-user-error">
                              {errors.last_Name}
                            </div>
                          )}
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
                              console.log(
                                "Selected Designation:",
                                selectedOption
                              );
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
                                setFieldValue(
                                  "permission",
                                  selectedPermissions
                                );
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
                            <div className="text-danger">
                              {errors.designation}
                            </div>
                          )}
                        </div>

                        {/* Department Allocated */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">
                            Department Allocated*
                          </label>
                          <Select
                            name="departmentAllocated"
                            options={departments}
                            onChange={(selectedOption) =>
                              setFieldValue(
                                "departmentAllocated",
                                selectedOption ? selectedOption.value : ""
                              )
                            }
                            onBlur={handleBlur}
                            value={
                              departments.find(
                                (option) =>
                                  option.value === values.departmentAllocated
                              ) || null
                            }
                            isClearable
                            placeholder="Select Department"
                            classNamePrefix="react-select"
                          />
                          {touched.departmentAllocated &&
                            errors.departmentAllocated && (
                              <div className="hm-razr-add-user-error">
                                {errors.departmentAllocated}
                              </div>
                            )}
                        </div>

                        {/* Permissions */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="form-group">
                            <label>Permissions*</label>
                            <Select
                              name="permission"
                              options={availablePermission.map(
                                (permission) => ({
                                  value: permission.permission,
                                  label: permission.name,
                                })
                              )}
                              isMulti
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  "permission",
                                  selectedOptions
                                    ? selectedOptions.map(
                                        (option) => option.value
                                      )
                                    : []
                                )
                              }
                              onBlur={() => setFieldTouched("permission", true)}
                              value={availablePermission
                                .filter((permission) =>
                                  values.permission.includes(
                                    permission.permission
                                  )
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
                          <label className="mb-2 form-label">
                            OTP Required*
                          </label>
                          <select
                            name="otp"
                            className={`form-select ${
                              touched.otp && errors.otp ? "is-invalid" : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otp}
                          >
                            <option value="">
                              -- Select OTP Requirement --
                            </option>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                          {touched.otp && errors.otp && (
                            <div className="hm-razr-add-user-error">
                              {errors.otp}
                            </div>
                          )}
                        </div>

                        {/* Assign to Manager by Employee ID */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="form-group">
                            <label>Assign Managers*</label>
                            <Select
                              name="assigned_to"
                              options={allEmployees}
                              isMulti
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  "assigned_to",
                                  selectedOptions
                                    ? selectedOptions.map(
                                        (option) => option.value
                                      )
                                    : []
                                )
                              }
                              onBlur={() =>
                                setFieldTouched("assigned_to", true)
                              }
                              value={allEmployees.filter((emp) =>
                                values.assigned_to.includes(emp.value)
                              )}
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
                          <label className="mb-2 form-label">
                            Number of Paid Leaves*
                          </label>
                          <input
                            name="no_of_Paid_Leave"
                            type="number"
                            className={`form-control ${
                              touched.no_of_Paid_Leave &&
                              errors.no_of_Paid_Leave
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.no_of_Paid_Leave}
                            placeholder="Enter number of paid leaves"
                          />
                          {touched.no_of_Paid_Leave &&
                            errors.no_of_Paid_Leave && (
                              <div className="hm-razr-add-user-error">
                                {errors.no_of_Paid_Leave}
                              </div>
                            )}
                        </div>

                        {/* User Role Dropdown */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">User Role*</label>
                          <Select
                            name="user_Role"
                            options={userRoles}
                            onChange={(selectedOption) =>
                              setFieldValue(
                                "user_Role",
                                selectedOption ? selectedOption.value : ""
                              )
                            }
                            onBlur={handleBlur}
                            value={
                              userRoles.find(
                                (option) => option.value === values.user_Role
                              ) || null
                            }
                            isClearable
                            placeholder="Select User Role"
                          />
                          {touched.user_Role && errors.user_Role && (
                            <div className="hm-razr-add-user-error">
                              {errors.user_Role}
                            </div>
                          )}
                        </div>

                        {/* Employee Type Dropdown */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">
                            Employee Type*
                          </label>
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
                                (option) =>
                                  option.value === values.employee_Type
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
                          <div className="hm-razr-add-user-input-group">
                            <input
                              required
                              name="employee_Id"
                              type="text"
                              className={`hm-razr-add-user-input ${
                                touched.employee_Id && errors.employee_Id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.employee_Id}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Employee ID*
                            </label>
                          </div>
                          {touched.employee_Id && errors.employee_Id && (
                            <div className="hm-razr-add-user-error">
                              {errors.employee_Id}
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
                              className={`hm-razr-add-user-input ${
                                touched.mobile_No && errors.mobile_No
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.mobile_No}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Phone Number*
                            </label>
                          </div>
                          {touched.mobile_No && errors.mobile_No && (
                            <div className="hm-razr-add-user-error">
                              {errors.mobile_No}
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
                              className={`hm-razr-add-user-input ${
                                touched.personal_Email_Id &&
                                errors.personal_Email_Id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.personal_Email_Id}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Personal Email ID*
                            </label>
                          </div>
                          {touched.personal_Email_Id &&
                            errors.personal_Email_Id && (
                              <div className="hm-razr-add-user-error">
                                {errors.personal_Email_Id}
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
                              className={`hm-razr-add-user-input ${
                                touched.working_Email_Id &&
                                errors.working_Email_Id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.working_Email_Id}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Working Email ID*
                            </label>
                          </div>
                          {touched.working_Email_Id &&
                            errors.working_Email_Id && (
                              <div className="hm-razr-add-user-error">
                                {errors.working_Email_Id}
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
                              className={`hm-razr-add-user-input ${
                                touched.date_of_Joining &&
                                errors.date_of_Joining
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.date_of_Joining}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Date of Joining*
                            </label>
                          </div>
                          {touched.date_of_Joining &&
                            errors.date_of_Joining && (
                              <div className="hm-razr-add-user-error">
                                {errors.date_of_Joining}
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
                              className={`hm-razr-add-user-input ${
                                touched.dob && errors.dob ? "is-invalid" : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dob}
                              placeholder=" "
                            />
                            <label className="hm-razr-add-user-label">
                              Date of Birth*
                            </label>
                          </div>
                          {touched.dob && errors.dob && (
                            <div className="hm-razr-add-user-error">
                              {errors.dob}
                            </div>
                          )}
                        </div>

                        {/* Shift Timings */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">
                            Shift Timings*
                          </label>
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
                          <div className="hm-razr-add-user-input-group">
                            <input
                              placeholder=" "
                              required
                              name="salary"
                              type="number"
                              className={`hm-razr-add-user-input ${
                                touched.salary && errors.salary
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.salary}
                            />
                            <label className="hm-razr-add-user-label">
                              Salary*
                            </label>
                          </div>
                          {touched.salary && errors.salary && (
                            <div className="hm-razr-add-user-error">
                              {errors.salary}
                            </div>
                          )}
                        </div>

                        {/* Address Dropdown */}
                        <div className="form-group">
                          <label>Office Address*</label>
                          <Select
                            options={addressOptions}
                            isLoading={isLoadingAddresses}
                            onChange={(selectedOption) => {
                              setFieldValue("address", selectedOption.value);
                              setFieldValue(
                                "latitude",
                                selectedOption.latitude
                              );
                              setFieldValue(
                                "longitude",
                                selectedOption.longitude
                              );
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
                              touched.latitude && errors.latitude
                                ? "is-invalid"
                                : ""
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
                            <div className="text-danger">
                              {errors.longitude}
                            </div>
                          )}
                        </div>

                        {/* Temporary Address */}
                        <div className="col-lg-6 col-md-6 mb-4">
                          <div className="hm-razr-add-user-input-group">
                            <textarea
                              className={`hm-razr-add-user-input ${
                                touched.office_Address && errors.office_Address
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="office_Address"
                              name="office_Address"
                              placeholder=" "
                              rows={2}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.office_Address}
                            ></textarea>
                            <label className="hm-razr-add-user-label">
                              User Address*
                            </label>
                          </div>
                          {touched.office_Address && errors.office_Address && (
                            <div className="hm-razr-add-user-error">
                              {errors.office_Address}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Personal Details Tab */}
                    <div
                      className={`tab-pane fade ${
                        currentTab === "pills-profile" ? "show active" : ""
                      }`}
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="row">
                        {/* Profile Photo */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="profile-photo mb-3">
                            <img
                              src={
                                values.user_Avatar
                                  ? URL.createObjectURL(values.user_Avatar)
                                  : "https://ems11.s3.amazonaws.com/user-profile.jpg"
                              }
                              alt="User Profile Photo"
                              className="img-fluid rounded"
                            />
                          </div>
                          <h5>Upload Photo</h5>
                          <input
                            name="user_Avatar"
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            id="formFile"
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
                            <div className="hm-razr-add-user-error">
                              {errors.user_Avatar}
                            </div>
                          )}

                          {/* **Document Uploads** */}
                          <div className="col-12 mt-4">
                            <h3>Upload Documents</h3>
                            <FieldArray
                              name="documents"
                              render={(arrayHelpers) => (
                                <div>
                                  {values.documents &&
                                  values.documents.length > 0 ? (
                                    values.documents.map((doc, index) => (
                                      <DocumentField
                                        key={index}
                                        index={index}
                                        remove={arrayHelpers.remove}
                                        maxDocuments={
                                          values.documents.length >= 20
                                        }
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

                        {/* PAN and Adhaar */}
                        <div className="col-md-6 col-lg-4">
                          {/* PAN Number */}
                          <div className="mb-4">
                            <label className="mb-2 form-label">PAN</label>
                            <input
                              placeholder="PAN Number"
                              name="pan_No"
                              type="text"
                              className={`form-control ${
                                touched.pan_No && errors.pan_No
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pan_No}
                            />
                            {touched.pan_No && errors.pan_No && (
                              <div className="hm-razr-add-user-error">
                                {errors.pan_No}
                              </div>
                            )}
                          </div>

                          {/* Adhaar Number */}
                          <div className="mt-4 mb-2">
                            <label className="mb-2 form-label">
                              Adhaar Number
                            </label>
                            <input
                              placeholder="Adhaar Number"
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
                            />
                            {touched.adhaar_Number && errors.adhaar_Number && (
                              <div className="hm-razr-add-user-error">
                                {errors.adhaar_Number}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details Tab */}
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
                          <label className="mb-2 form-label">
                            Bank Holder Name
                          </label>
                          <input
                            placeholder="Holder Name"
                            name="bank_Holder_Name"
                            type="text"
                            className={`form-control ${
                              touched.bank_Holder_Name &&
                              errors.bank_Holder_Name
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bank_Holder_Name}
                          />
                          {touched.bank_Holder_Name &&
                            errors.bank_Holder_Name && (
                              <div className="hm-razr-add-user-error">
                                {errors.bank_Holder_Name}
                              </div>
                            )}
                        </div>

                        {/* Bank Name */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">Bank Name</label>
                          <input
                            placeholder="Enter Bank Name"
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
                          />
                          {touched.bank_Name && errors.bank_Name && (
                            <div className="hm-razr-add-user-error">
                              {errors.bank_Name}
                            </div>
                          )}
                        </div>

                        {/* Bank Account No. */}
                        <div className="col-md-6 col-lg-4 mb-4">
                          <label className="mb-2 form-label">
                            Bank Account No.
                          </label>
                          <input
                            placeholder="Enter Account Number"
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
                          />
                          {touched.bank_Account_No &&
                            errors.bank_Account_No && (
                              <div className="hm-razr-add-user-error">
                                {errors.bank_Account_No}
                              </div>
                            )}
                        </div>

                        {/* IFSC Code */}
                        <div className="col-md-6 col-lg-4 mt-4 mb-4">
                          <label className="mb-2 form-label">IFSC Code</label>
                          <input
                            placeholder="Enter IFSC Code"
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
                          />
                          {touched.ifsc_Code && errors.ifsc_Code && (
                            <div className="hm-razr-add-user-error">
                              {errors.ifsc_Code}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save & Add User Button */}
                  <button
                    type="button"
                    className="submit upd-btn"
                    onClick={() => handleNext({ values, resetForm })}
                    disabled={isSubmitting} // Disable while submitting
                  >
                    {isSubmitting ? "Saving..." : "Save & Add User"}
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Inline Styles (optional, adjust as needed) */}
      <style>
        {`
          /* Existing styles remain unchanged */

          .hm-razr-add-user-error {
            color: red;
            font-size: 12px;
            margin-top: 5px;
          }

          .hm-razr-add-user-input-group {
            position: relative;
            margin-bottom: 1.5rem;
          }

          .hm-razr-add-user-input {
            width: 100%;
            padding: 10px 10px 10px 5px;
            display: block;
            border: none;
            border-bottom: 1px solid #757575;
            background: transparent;
          }

          .hm-razr-add-user-input:focus {
            outline: none;
          }

          .hm-razr-add-user-label {
            color: #999;
            font-size: 16px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 5px;
            top: 10px;
            transition: 0.2s ease all;
          }

          .hm-razr-add-user-input:focus ~ .hm-razr-add-user-label,
          .hm-razr-add-user-input:not(:placeholder-shown)
            ~ .hm-razr-add-user-label {
            top: -20px;
            font-size: 12px;
            color: #5264ae;
          }

          /* Styling for Select component */
          .react-select__control {
            border-color: #ced4da;
            min-height: 38px;
          }

          .react-select__control--is-focused {
            border-color: #5264ae;
            box-shadow: 0 0 0 1px #5264ae;
          }

          .react-select__multi-value {
            background-color: #e2e6ea;
          }

          .react-select__multi-value__label {
            color: #333;
          }

          .react-select__multi-value__remove {
            color: #666;
            cursor: pointer;
          }

          .react-select__multi-value__remove:hover {
            background-color: #ccc;
            color: #000;
          }

          .dropzone {
            padding: 20px;
            border: 2px dashed #007bff;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            background-color: #fafafa;
          }

          .dropzone.is-invalid {
            border-color: red;
          }

          .preview img {
            max-width: 100%;
            height: auto;
          }

          .pdf-preview,
          .generic-file-preview {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .pdf-preview p,
          .generic-file-preview p {
            margin: 0;
            font-size: 14px;
            word-break: break-all;
          }

          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .profile-photo img {
            max-width: 100%;
            height: auto;
          }

          .employee-info-card {
            padding: 15px;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 15px;
            color: #333;
          }

          .employee-info-card h5 {
            margin-bottom: 10px;
            font-size: 16px;
            color: #007bff;
          }

          .employee-info-card p {
            margin: 0;
            font-size: 14px;
          }

          .submit.upd-btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          .submit.upd-btn:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
          }

          .document-field {
            margin-bottom: 20px;
          }

          .dropzone {
            transition: background-color 0.3s, border-color 0.3s;
          }

          .dropzone.is-invalid {
            border-color: #dc3545;
          }

          /* Preview Section */
          .preview {
            display: flex;
            align-items: center;
          }

          .preview img {
            object-fit: cover;
          }

          /* Remove Button */
          .btn-danger {
            display: flex;
            align-items: center;
          }

          /* Responsive Adjustments */
          @media (max-width: 576px) {
            .preview {
              flex-direction: column;
              align-items: flex-start;
            }

            .preview img,
            .preview svg {
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}
