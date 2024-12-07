import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import apiService from "../../services/Service";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to convert file to base64 string
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function AddEmployeesHR() {
  const [currentTab, setCurrentTab] = useState("pills-home");
  const userDepartment = useSelector((state) => state.auth.department); // Assuming department is also stored in Redux

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

    if (!values.office_Address) {
      errors.office_Address = "Office Address is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      department: userDepartment || "", // Pre-fill with manager's department
      designation: "",
      user_Role: "employee", // Default and restrict to employee
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
      // Convert user_Avatar to base64 string if it exists
      if (values.user_Avatar) {
        values.user_Avatar = await convertToBase64(values.user_Avatar);
      }

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
            const response = await apiService.addUserForManager(formDataObj);
            if (response.success) {
              toast.success("User registered successfully"); // Show success message
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
                <li className="nav-item me-5" role="presentation">
                  <button
                    className={`nav-link ${currentTab === "pills-home" ? "active" : ""
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
                <li className="nav-item me-5" role="presentation">
                  <button
                    className={`nav-link ${currentTab === "pills-profile" ? "active" : ""
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
                    className={`nav-link ${currentTab === "pills-contact" ? "active" : ""
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
                  className={`tab-pane fade ${currentTab === "pills-home" ? "show active" : ""
                    }`}
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row mt-4">
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">First Name*</label>
                      <input
                        placeholder="Enter First Name"
                        required
                        name="first_Name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.first_Name}
                      />
                      {formik.errors.first_Name &&
                        formik.touched.first_Name && (
                          <div className="error">
                            {formik.errors.first_Name}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Last Name</label>
                      <input
                        placeholder="Enter Last Name"
                        name="last_Name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.last_Name}
                      />
                      {formik.errors.last_Name && formik.touched.last_Name && (
                        <div className="error">{formik.errors.last_Name}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Department</label>
                      <input
                        name="department"
                        type="text"
                        className="form-control"
                        value={formik.values.department}
                        readOnly
                      />
                      {formik.errors.department &&
                        formik.touched.department && (
                          <div className="error">
                            {formik.errors.department}
                          </div>
                        )}
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <label className="mb-2 form-label">Designation</label>
                      <input
                        name="designation"
                        className="form-control"
                        placeholder="Designation"
                        onChange={formik.handleChange}
                        value={formik.values.designation}
                      />
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">User Role*</label>
                      <input
                        name="user_Role"
                        type="text"
                        className="form-control"
                        value={formik.values.user_Role}
                        readOnly
                      />
                      {formik.errors.user_Role && formik.touched.user_Role && (
                        <div className="error">{formik.errors.user_Role}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Employee ID*</label>
                      <input
                        placeholder="Enter Employee ID"
                        required
                        name="employee_Id"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.employee_Id}
                      />
                      {formik.errors.employee_Id &&
                        formik.touched.employee_Id && (
                          <div className="error">
                            {formik.errors.employee_Id}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Phone Number*</label>
                      <input
                        placeholder="Phone number"
                        required
                        name="mobile_No"
                        type="string"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.mobile_No}
                      />
                      {formik.errors.mobile_No && formik.touched.mobile_No && (
                        <div className="error">{formik.errors.mobile_No}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">
                        Personal Email ID*
                      </label>
                      <input
                        placeholder="Email ID..."
                        required
                        name="personal_Email_Id"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.personal_Email_Id}
                      />
                      {formik.errors.personal_Email_Id &&
                        formik.touched.personal_Email_Id && (
                          <div className="error">
                            {formik.errors.personal_Email_Id}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">
                        Working Email ID*
                      </label>
                      <input
                        placeholder="Working email id..."
                        required
                        name="working_Email_Id"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.working_Email_Id}
                      />
                      {formik.errors.working_Email_Id &&
                        formik.touched.working_Email_Id && (
                          <div className="error">
                            {formik.errors.working_Email_Id}
                          </div>
                        )}
                    </div>
                    <div className="mb-4 col-lg-4">
                      <label className="mb-2 form-label">
                        Date of Joining*
                      </label>
                      <input
                        name="date_of_Joining"
                        required
                        type="date"
                        className="form-control"
                        min={new Date().toISOString().split("T")[0]} // Disables previous dates
                        max={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 1)
                          )
                            .toISOString()
                            .split("T")[0]
                        } // Limits dates to 1 month ahead
                        onChange={formik.handleChange}
                        value={formik.values.date_of_Joining}
                      />
                      {formik.errors.date_of_Joining &&
                        formik.touched.date_of_Joining && (
                          <div className="error">
                            {formik.errors.date_of_Joining}
                          </div>
                        )}
                    </div>

                    <div className="mb-4 col-lg-4">
                      <label className="mb-2 form-label">Password*</label>
                      <input
                        name="password"
                        required
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <div className="error">{formik.errors.password}</div>
                      )}
                    </div>
                    <div className="mb-4 col-lg-4">
                      <label className="mb-2 form-label">
                        Confirm Password*
                      </label>
                      <input
                        name="confirm_Password"
                        required
                        placeholder="Confirm Password"
                        type="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.confirm_Password}
                      />
                      {formik.errors.confirm_Password &&
                        formik.touched.confirm_Password && (
                          <div className="error">
                            {formik.errors.confirm_Password}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-12 mb-4">
                      <label className="mb-2 form-label">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        rows={2}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                      />
                      {formik.errors.address && formik.touched.address && (
                        <div className="error">{formik.errors.address}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Salary*</label>
                      <input
                        placeholder="Enter Salary"
                        required
                        name="salary"
                        type="number"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.salary}
                      />
                      {formik.errors.salary && formik.touched.salary && (
                        <div className="error">{formik.errors.salary}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Latitude*</label>
                      <input
                        placeholder="Enter Latitude"
                        required
                        name="latitude"
                        type="number"
                        step="0.000001"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.latitude}
                      />
                      {formik.errors.latitude && formik.touched.latitude && (
                        <div className="error">{formik.errors.latitude}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Longitude*</label>
                      <input
                        placeholder="Enter Longitude"
                        required
                        name="longitude"
                        type="number"
                        step="0.000001"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.longitude}
                      />
                      {formik.errors.longitude && formik.touched.longitude && (
                        <div className="error">{formik.errors.longitude}</div>
                      )}
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="mb-2 form-label">Shift Timings*</label>
                      <select
                        name="shift_Timing"
                        required
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.shift_Timing}
                      >
                        <option value="">--Choose Shift Timings--</option>
                        <option>10 AM - 7 PM</option>
                        <option>9 AM - 6 PM</option>
                        <option>8 AM - 5 PM</option>
                      </select>
                      {formik.errors.shift_Timing &&
                        formik.touched.shift_Timing && (
                          <div className="error">
                            {formik.errors.shift_Timing}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-12 mb-4">
                      <label className="mb-2 form-label">Office Address*</label>
                      <textarea
                        className="form-control"
                        id="office_Address"
                        name="office_Address"
                        placeholder="Enter office address"
                        rows={2}
                        required
                        onChange={formik.handleChange}
                        value={formik.values.office_Address}
                      />
                      {formik.errors.office_Address &&
                        formik.touched.office_Address && (
                          <div className="error">
                            {formik.errors.office_Address}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${currentTab === "pills-profile" ? "show active" : ""
                    }`}
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row">
                    {/* <div className="col-lg-4">
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
                          formik.setFieldValue(
                            "user_Avatar",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      {formik.errors.user_Avatar &&
                        formik.touched.user_Avatar && (
                          <div className="error">
                            {formik.errors.user_Avatar}
                          </div>
                        )}
                    </div> */}
                    <div className="col-lg-4">
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
                    {/* <div className="col-lg-4">
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
                  className={`tab-pane fade ${currentTab === "pills-contact" ? "show active" : ""
                    }`}
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div className="row">
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
                    <div className="col-lg-4 mt-4">
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
