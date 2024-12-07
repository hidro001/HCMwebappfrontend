import { useState } from "react";
import { useFormik } from "formik";
import apiService from "../../services/Service";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEmployeeSuper() {
  const [currentTab, setCurrentTab] = useState("pills-home");

  const validate = (values) => {
    const errors = {};

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
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const formDataObj = new FormData();
      for (const key in values) {
        formDataObj.append(key, values[key]);
      }

      console.log("Form data being submitted:");
      formDataObj.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

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
            const response = await apiService.register(formDataObj);
            if (response.success) {
              toast.success("User registered successfully");
              resetForm();
              setCurrentTab("pills-home");
            } else {
              toast.error("Registration failed: " + response.message);
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
              setCurrentTab("pills-home");
            } else if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(
                "Registration failed: " + error.response.data.message
              );
              setCurrentTab("pills-home");
            } else {
              toast.error("Registration failed: " + error.message);
              setCurrentTab("pills-home");
            }
          }
        }
      });
    },
  });

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

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-5">

          <div className="all-employee">
            <form id="userForm" onSubmit={formik.handleSubmit} encType="multipart/form-data" className="hm-rzr-super-addemp">
              <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${currentTab === "pills-home" ? "active" : ""}`}
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
                    className={`nav-link ${currentTab === "pills-profile" ? "active" : ""}`}
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
                    className={`nav-link ${currentTab === "pills-contact" ? "active" : ""}`}
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
                {/* Employee Details Tab Content */}
                <div className={`tab-pane fade ${currentTab === "pills-home" ? "show active" : ""}`} id="pills-home" role="tabpanel">
                  <div className="row mt-4">
                    {/* Form fields go here */}
                  </div>
                </div>

                {/* Personal Details Tab Content */}
                <div className={`tab-pane fade ${currentTab === "pills-profile" ? "show active" : ""}`} id="pills-profile" role="tabpanel">
                  <div className="row">
                    {/* Form fields go here */}
                  </div>
                </div>

                {/* Bank Details Tab Content */}
                <div className={`tab-pane fade ${currentTab === "pills-contact" ? "show active" : ""}`} id="pills-contact" role="tabpanel">
                  <div className="row">
                    {/* Form fields go here */}
                  </div>
                </div>
              </div>

              <button type="button" className="submit upd-btn" onClick={handleNext}>
                Save & Add User
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width={22} height={22} viewBox="0 0 24 24">
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
