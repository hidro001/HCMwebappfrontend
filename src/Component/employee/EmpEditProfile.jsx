// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// export default function EmpEditProfile() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const employee_Id = searchParams.get("employee_Id");

//   const [employeeData, setEmployeeData] = useState({
//     first_Name: "",
//     last_Name: "",
//     department: "",
//     designation: "",
//     user_Role: "",
//     employee_Id: "",
//     mobile_No: "",
//     personal_Email_Id: "",
//     working_Email_Id: "",
//     date_of_Joining: "",
//     address: "",
//     user_Avatar: "",
//     shift_Timing: "",
//     office_Address: "",
//     salary: "",
//     pan_No: "",
//     adhaar_Number: "",
//     bank_Holder_Name: "",
//     bank_Name: "",
//     bank_Account_No: "",
//     ifsc_Code: "",
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Validation states
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/user/employee/getprofilebyempid?employee_Id=${employee_Id}`
//         );
//         setEmployeeData(response.data.data);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Error fetching employee data");
//         setIsLoading(false);
//       }
//     };

//     fetchEmployeeData();
//   }, [employee_Id]);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const validateForm = () => {
//     const errors = {};

//     if (!employeeData.first_Name) errors.first_Name = "First name is required.";
//     if (!employeeData.last_Name) errors.last_Name = "Last name is required.";
//     if (!employeeData.mobile_No)
//       errors.mobile_No = "Mobile number is required.";
//     if (!employeeData.personal_Email_Id)
//       errors.personal_Email_Id = "Personal email is required.";
//     if (!employeeData.working_Email_Id)
//       errors.working_Email_Id = "Working email is required.";
//     if (!employeeData.date_of_Joining)
//       errors.date_of_Joining = "Date of joining is required.";
//     if (!employeeData.address) errors.address = "Address is required.";
//     if (!employeeData.salary || isNaN(employeeData.salary))
//       errors.salary = "Valid salary is required.";
//     if (!employeeData.shift_Timing)
//       errors.shift_Timing = "Shift timing is required.";
//     if (!employeeData.office_Address)
//       errors.office_Address = "Office address is required.";

//     setValidationErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleUpdateForm = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return error;

//     try {
//       const formData = new FormData();

//       // Append only scalar values and serialize objects/arrays
//       Object.keys(employeeData).forEach((key) => {
//         const value = employeeData[key];

//         if (Array.isArray(value) || typeof value === "object") {
//           // Serialize arrays and objects to JSON strings
//           formData.append(key, JSON.stringify(value));
//         } else if (value !== null && value !== undefined) {
//           // Append scalar values directly
//           formData.append(key, value);
//         }
//       });

//       // Append the user_Avatar file if selected
//       if (selectedFile) {
//         formData.append("user_Avatar", selectedFile);
//       }

//       const response = await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/user/employee/edit-profile?employee_Id=${employee_Id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setSuccess(response.data.message || "Profile updated successfully");
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Error updating employee profile"
//       );
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({
//       ...employeeData,
//       [name]: value,
//     });
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <>
//       <div className="main">
//         <div className="ems-content">
//           <div className="container-fluid hcm-rzr-userprofile-edit-container">
//             <h5>Employee Edit Profile Section</h5>

//             {success && (
//               <div className="alert alert-success hcm-rzr-userprofile-edit-success">
//                 {success}
//               </div>
//             )}

//             {error && (
//               <div className="alert alert-danger hcm-rzr-userprofile-edit-error">
//                 {error}
//               </div>
//             )}

//             <form
//               onSubmit={handleUpdateForm}
//               className="hcm-rzr-userprofile-edit-form"
//             >
//               {employeeData.user_Avatar && (
//                 <div className="form-group hcm-rzr-userprofile-edit-avatar">
//                   <label>Current Avatar</label>
//                   <div>
//                     <img
//                       src={employeeData.user_Avatar}
//                       alt="User Avatar"
//                       className="hcm-rzr-userprofile-edit-avatar-img"
//                       style={{ width: "100px", height: "100px" }}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="file">Upload New Avatar</label>
//                   <input
//                     type="file"
//                     id="file"
//                     name="file"
//                     className="form-control"
//                     onChange={handleFileChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="first_Name">First Name</label>
//                   <input
//                     type="text"
//                     id="first_Name"
//                     name="first_Name"
//                     className="form-control"
//                     value={employeeData.first_Name}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.first_Name && (
//                     <div className="text-danger">
//                       {validationErrors.first_Name}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="last_Name">Last Name</label>
//                   <input
//                     type="text"
//                     id="last_Name"
//                     name="last_Name"
//                     className="form-control"
//                     value={employeeData.last_Name}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.last_Name && (
//                     <div className="text-danger">
//                       {validationErrors.last_Name}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="mobile_No">Mobile No</label>
//                   <input
//                     type="text"
//                     id="mobile_No"
//                     name="mobile_No"
//                     className="form-control"
//                     value={employeeData.mobile_No}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.mobile_No && (
//                     <div className="text-danger">
//                       {validationErrors.mobile_No}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="personal_Email_Id">Personal Email</label>
//                   <input
//                     type="email"
//                     id="personal_Email_Id"
//                     name="personal_Email_Id"
//                     className="form-control"
//                     value={employeeData.personal_Email_Id}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.personal_Email_Id && (
//                     <div className="text-danger">
//                       {validationErrors.personal_Email_Id}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="working_Email_Id">Working Email</label>
//                   <input
//                     type="email"
//                     id="working_Email_Id"
//                     name="working_Email_Id"
//                     className="form-control"
//                     value={employeeData.working_Email_Id}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.working_Email_Id && (
//                     <div className="text-danger">
//                       {validationErrors.working_Email_Id}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="address">User Address</label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     className="form-control"
//                     value={employeeData.address}
//                     onChange={handleChange}
//                   />
//                   {validationErrors.address && (
//                     <div className="text-danger">
//                       {validationErrors.address}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="pan_No">PAN No</label>
//                   <input
//                     type="text"
//                     id="pan_No"
//                     name="pan_No"
//                     className="form-control"
//                     value={employeeData.pan_No}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="adhaar_Number">Adhaar Number</label>
//                   <input
//                     type="text"
//                     id="adhaar_Number"
//                     name="adhaar_Number"
//                     className="form-control"
//                     value={employeeData.adhaar_Number}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="bank_Holder_Name">Bank Holder Name</label>
//                   <input
//                     type="text"
//                     id="bank_Holder_Name"
//                     name="bank_Holder_Name"
//                     className="form-control"
//                     value={employeeData.bank_Holder_Name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="bank_Name">Bank Name</label>
//                   <input
//                     type="text"
//                     id="bank_Name"
//                     name="bank_Name"
//                     className="form-control"
//                     value={employeeData.bank_Name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="bank_Account_No">Bank Account No</label>
//                   <input
//                     type="text"
//                     id="bank_Account_No"
//                     name="bank_Account_No"
//                     className="form-control"
//                     value={employeeData.bank_Account_No}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="ifsc_Code">IFSC Code</label>
//                   <input
//                     type="text"
//                     id="ifsc_Code"
//                     name="ifsc_Code"
//                     className="form-control"
//                     value={employeeData.ifsc_Code}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <button type="submit" className="leva-btn mt-2">
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function EmpEditProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const employee_Id = searchParams.get("employee_Id");

  const [employeeData, setEmployeeData] = useState({
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
    address: "",
    user_Avatar: "",
    shift_Timing: "",
    office_Address: "",
    salary: "",
    pan_No: "",
    adhaar_Number: "",
    bank_Holder_Name: "",
    bank_Name: "",
    bank_Account_No: "",
    ifsc_Code: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Validation states
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.humanmaximizer.com/api/v1/user/employee/getprofilebyempid?employee_Id=${employee_Id}`
        );
        setEmployeeData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching employee data");
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employee_Id]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};

    // Name validation: Only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!employeeData.first_Name) {
      errors.first_Name = "First name is required.";
    } else if (!nameRegex.test(employeeData.first_Name)) {
      errors.first_Name = "First name must contain only letters and spaces.";
    }

    if (!employeeData.last_Name) {
      errors.last_Name = "Last name is required.";
    } else if (!nameRegex.test(employeeData.last_Name)) {
      errors.last_Name = "Last name must contain only letters and spaces.";
    }

    if (!employeeData.bank_Holder_Name) {
      errors.bank_Holder_Name = "Bank holder name is required.";
    } else if (!nameRegex.test(employeeData.bank_Holder_Name)) {
      errors.bank_Holder_Name = "Bank holder name must contain only letters and spaces.";
    }

    // Mobile number validation: Exactly 10 digits starting with 6-9
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!employeeData.mobile_No) {
      errors.mobile_No = "Mobile number is required.";
    } else if (!mobileRegex.test(employeeData.mobile_No)) {
      errors.mobile_No = "Enter a valid 10-digit mobile number starting with 6-9.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employeeData.personal_Email_Id) {
      errors.personal_Email_Id = "Personal email is required.";
    } else if (!emailRegex.test(employeeData.personal_Email_Id)) {
      errors.personal_Email_Id = "Enter a valid personal email.";
    }

    if (!employeeData.working_Email_Id) {
      errors.working_Email_Id = "Working email is required.";
    } else if (!emailRegex.test(employeeData.working_Email_Id)) {
      errors.working_Email_Id = "Enter a valid working email.";
    }

    // PAN number validation: 5 letters, 4 digits, 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!employeeData.pan_No) {
      errors.pan_No = "PAN number is required.";
    } else if (!panRegex.test(employeeData.pan_No)) {
      errors.pan_No = "Enter a valid PAN (e.g., ABCDE1234F).";
    }

    // Aadhar number validation: Exactly 12 digits
    const aadharRegex = /^\d{12}$/;
    if (!employeeData.adhaar_Number) {
      errors.adhaar_Number = "Aadhar number is required.";
    } else if (!aadharRegex.test(employeeData.adhaar_Number)) {
      errors.adhaar_Number = "Enter a valid 12-digit Aadhar number.";
    }

    // Bank Account Number validation: 9 to 18 digits
    const bankAccRegex = /^\d{9,18}$/;
    if (!employeeData.bank_Account_No) {
      errors.bank_Account_No = "Bank account number is required.";
    } else if (!bankAccRegex.test(employeeData.bank_Account_No)) {
      errors.bank_Account_No = "Enter a valid bank account number (9-18 digits).";
    }

    // IFSC Code validation: 4 letters, 0, then 6 digits or letters
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!employeeData.ifsc_Code) {
      errors.ifsc_Code = "IFSC code is required.";
    } else if (!ifscRegex.test(employeeData.ifsc_Code)) {
      errors.ifsc_Code = "Enter a valid IFSC code (e.g., ABCD0123456).";
    }

    // Salary validation: Must be a positive number
    if (!employeeData.salary) {
      errors.salary = "Salary is required.";
    } else if (isNaN(employeeData.salary) || Number(employeeData.salary) <= 0) {
      errors.salary = "Enter a valid positive salary.";
    }

    // Additional required fields validation
    if (!employeeData.date_of_Joining) {
      errors.date_of_Joining = "Date of joining is required.";
    }

    if (!employeeData.address) {
      errors.address = "Address is required.";
    }

    if (!employeeData.shift_Timing) {
      errors.shift_Timing = "Shift timing is required.";
    }

    if (!employeeData.office_Address) {
      errors.office_Address = "Office address is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();

      // Append only scalar values and serialize objects/arrays
      Object.keys(employeeData).forEach((key) => {
        const value = employeeData[key];

        if (Array.isArray(value) || typeof value === "object") {
          // Serialize arrays and objects to JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          // Append scalar values directly
          formData.append(key, value);
        }
      });

      // Append the user_Avatar file if selected
      if (selectedFile) {
        formData.append("user_Avatar", selectedFile);
      }

      const response = await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/user/employee/edit-profile?employee_Id=${employee_Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(response.data.message || "Profile updated successfully");
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(
        err.response?.data?.message || "Error updating employee profile"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="main">
        <div className="ems-content">
          <div className="container-fluid hcm-rzr-userprofile-edit-container">
            <h5>Employee Edit Profile Section</h5>

            {success && (
              <div className="alert alert-success hcm-rzr-userprofile-edit-success">
                {success}
              </div>
            )}

            {error && (
              <div className="alert alert-danger hcm-rzr-userprofile-edit-error">
                {error}
              </div>
            )}

            <form
              onSubmit={handleUpdateForm}
              className="hcm-rzr-userprofile-edit-form"
            >
              {employeeData.user_Avatar && (
                <div className="form-group hcm-rzr-userprofile-edit-avatar">
                  <label>Current Avatar</label>
                  <div>
                    <img
                      src={employeeData.user_Avatar}
                      alt="User Avatar"
                      className="hcm-rzr-userprofile-edit-avatar-img"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="file">Upload New Avatar</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="first_Name">First Name</label>
                  <input
                    type="text"
                    id="first_Name"
                    name="first_Name"
                    className="form-control"
                    value={employeeData.first_Name}
                    onChange={handleChange}
                  />
                  {validationErrors.first_Name && (
                    <div className="text-danger">
                      {validationErrors.first_Name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="last_Name">Last Name</label>
                  <input
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    className="form-control"
                    value={employeeData.last_Name}
                    onChange={handleChange}
                  />
                  {validationErrors.last_Name && (
                    <div className="text-danger">
                      {validationErrors.last_Name}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile_No">Mobile No</label>
                  <input
                    type="text"
                    id="mobile_No"
                    name="mobile_No"
                    className="form-control"
                    value={employeeData.mobile_No}
                    onChange={handleChange}
                  />
                  {validationErrors.mobile_No && (
                    <div className="text-danger">
                      {validationErrors.mobile_No}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="personal_Email_Id">Personal Email</label>
                  <input
                    type="email"
                    id="personal_Email_Id"
                    name="personal_Email_Id"
                    className="form-control"
                    value={employeeData.personal_Email_Id}
                    onChange={handleChange}
                  />
                  {validationErrors.personal_Email_Id && (
                    <div className="text-danger">
                      {validationErrors.personal_Email_Id}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="working_Email_Id">Working Email</label>
                  <input
                    type="email"
                    id="working_Email_Id"
                    name="working_Email_Id"
                    className="form-control"
                    value={employeeData.working_Email_Id}
                    onChange={handleChange}
                  />
                  {validationErrors.working_Email_Id && (
                    <div className="text-danger">
                      {validationErrors.working_Email_Id}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">User Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={employeeData.address}
                    onChange={handleChange}
                  />
                  {validationErrors.address && (
                    <div className="text-danger">
                      {validationErrors.address}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="pan_No">PAN No</label>
                  <input
                    type="text"
                    id="pan_No"
                    name="pan_No"
                    className="form-control"
                    value={employeeData.pan_No}
                    onChange={handleChange}
                  />
                  {validationErrors.pan_No && (
                    <div className="text-danger">{validationErrors.pan_No}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="adhaar_Number">Aadhar Number</label>
                  <input
                    type="text"
                    id="adhaar_Number"
                    name="adhaar_Number"
                    className="form-control"
                    value={employeeData.adhaar_Number}
                    onChange={handleChange}
                  />
                  {validationErrors.adhaar_Number && (
                    <div className="text-danger">
                      {validationErrors.adhaar_Number}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bank_Holder_Name">Bank Holder Name</label>
                  <input
                    type="text"
                    id="bank_Holder_Name"
                    name="bank_Holder_Name"
                    className="form-control"
                    value={employeeData.bank_Holder_Name}
                    onChange={handleChange}
                  />
                  {validationErrors.bank_Holder_Name && (
                    <div className="text-danger">
                      {validationErrors.bank_Holder_Name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="bank_Name">Bank Name</label>
                  <input
                    type="text"
                    id="bank_Name"
                    name="bank_Name"
                    className="form-control"
                    value={employeeData.bank_Name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bank_Account_No">Bank Account No</label>
                  <input
                    type="text"
                    id="bank_Account_No"
                    name="bank_Account_No"
                    className="form-control"
                    value={employeeData.bank_Account_No}
                    onChange={handleChange}
                  />
                  {validationErrors.bank_Account_No && (
                    <div className="text-danger">
                      {validationErrors.bank_Account_No}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ifsc_Code">IFSC Code</label>
                  <input
                    type="text"
                    id="ifsc_Code"
                    name="ifsc_Code"
                    className="form-control"
                    value={employeeData.ifsc_Code}
                    onChange={handleChange}
                  />
                  {validationErrors.ifsc_Code && (
                    <div className="text-danger">{validationErrors.ifsc_Code}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date_of_Joining">Date of Joining</label>
                  <input
                    type="date"
                    id="date_of_Joining"
                    name="date_of_Joining"
                    className="form-control"
                    value={employeeData.date_of_Joining}
                    onChange={handleChange}
                  />
                  {validationErrors.date_of_Joining && (
                    <div className="text-danger">
                      {validationErrors.date_of_Joining}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shift_Timing">Shift Timing</label>
                  <input
                    type="text"
                    id="shift_Timing"
                    name="shift_Timing"
                    className="form-control"
                    value={employeeData.shift_Timing}
                    onChange={handleChange}
                  />
                  {validationErrors.shift_Timing && (
                    <div className="text-danger">
                      {validationErrors.shift_Timing}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="office_Address">Office Address</label>
                  <input
                    type="text"
                    id="office_Address"
                    name="office_Address"
                    className="form-control"
                    value={employeeData.office_Address}
                    onChange={handleChange}
                  />
                  {validationErrors.office_Address && (
                    <div className="text-danger">
                      {validationErrors.office_Address}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    className="form-control"
                    value={employeeData.salary}
                    onChange={handleChange}
                  />
                  {validationErrors.salary && (
                    <div className="text-danger">{validationErrors.salary}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="leva-btn mt-2">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Styles (optional, can be moved to CSS file) */}
      <style jsx>{`
        .main {
          padding: 20px;
        }
        .hcm-rzr-userprofile-edit-container {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h5 {
          margin-bottom: 20px;
        }
        .alert {
          margin-bottom: 20px;
        }
        .hcm-rzr-userprofile-edit-avatar {
          text-align: center;
          margin-bottom: 20px;
        }
        .hcm-rzr-userprofile-edit-avatar-img {
          border-radius: 50%;
        }
        .form-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .form-group {
          flex: 1;
          min-width: 200px;
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-control {
          width: 100%;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .form-control:focus {
          border-color: #007bff;
          outline: none;
        }
        .text-danger {
          color: #dc3545;
          margin-top: 5px;
          font-size: 14px;
        }
        .leva-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .leva-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}
