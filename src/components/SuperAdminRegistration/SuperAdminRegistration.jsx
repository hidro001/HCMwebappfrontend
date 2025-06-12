// import React, { useState } from 'react';
// import publicAxios from '../../service/publicAxios';
// import {availablePermission} from '../../service/availablePermissions'; 

// const SuperAdminRegistration = () => {
//   const [step, setStep] = useState(1); // 1: Secret Key, 2: Registration Form
//   const [secretKey, setSecretKey] = useState('');
//   const [secretKeyError, setSecretKeyError] = useState('');
  
//   // Available permissions from the provided list

//   const [formData, setFormData] = useState({
//     secret_key: '',
//     first_Name: '',
//     last_Name: '',
//     employee_Id: '',
//     department: '',
//     designation: '',
//     personal_Email_Id: '',
//     working_Email_Id: '',
//     password: '',
//     confirm_Password: '',
//     mobile_No: '',
//     permission: [],
//   });
  
//   const [formErrors, setFormErrors] = useState({});
//   const [submissionStatus, setSubmissionStatus] = useState({
//     loading: false,
//     success: '',
//     error: '',
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle permission changes
//   const handlePermissionChange = (permissionValue) => {
//     setFormData((prev) => {
//       const currentPermissions = prev.permission;
//       const isSelected = currentPermissions.includes(permissionValue);
      
//       if (isSelected) {
//         return {
//           ...prev,
//           permission: currentPermissions.filter(p => p !== permissionValue)
//         };
//       } else {
//         return {
//           ...prev,
//           permission: [...currentPermissions, permissionValue]
//         };
//       }
//     });
//   };

//   // Select all permissions
//   const handleSelectAllPermissions = () => {
//     const allPermissions = availablePermission.map(p => p.permission);
//     setFormData(prev => ({
//       ...prev,
//       permission: allPermissions
//     }));
//   };

//   // Clear all permissions
//   const handleClearAllPermissions = () => {
//     setFormData(prev => ({
//       ...prev,
//       permission: []
//     }));
//   };

//   // Step 1: Validate Secret Key
//   const handleSecretKeySubmit = (e) => {
//     e.preventDefault();
//     const predefinedSecretKey = 'razorinfotech123';

//     if (secretKey === predefinedSecretKey) {
//       setStep(2);
//       setSecretKeyError('');
//       setFormData((prev) => ({ ...prev, secret_key: secretKey }));
//     } else {
//       setSecretKeyError('Invalid secret key. Please try again.');
//     }
//   };

//   // Step 2: Handle Registration Form Submission
//   const handleRegistrationSubmit = async (e) => {
//     e.preventDefault();

//     // Reset previous errors and statuses
//     setFormErrors({});
//     setSubmissionStatus({ loading: true, success: '', error: '' });

//     // Required fields
//     const errors = {};
//     const requiredFields = [
//       'secret_key',
//       'first_Name',
//       'last_Name',
//       'employee_Id',
//       'department',
//       'designation',
//       'personal_Email_Id',
//       'working_Email_Id',
//       'password',
//       'confirm_Password',
//       'mobile_No',
//     ];

//     requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         errors[field] = 'This field is required';
//       }
//     });

//     // Password match
//     if (formData.password !== formData.confirm_Password) {
//       errors.password = 'Passwords do not match';
//       errors.confirm_Password = 'Passwords do not match';
//     }

//     // Check permissions
//     if (!formData.permission || formData.permission.length === 0) {
//       errors.permission = 'At least one permission must be selected';
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       setSubmissionStatus({ loading: false, success: '', error: '' });
//       return;
//     }

//     // Prepare data
//     const submissionData = {
//       secret_key: formData.secret_key,
//       first_Name: formData.first_Name,
//       last_Name: formData.last_Name,
//       employee_Id: formData.employee_Id,
//       department: formData.department,
//       designation: formData.designation,
//       personal_Email_Id: formData.personal_Email_Id,
//       working_Email_Id: formData.working_Email_Id,
//       password: formData.password,
//       confirm_Password: formData.confirm_Password,
//       mobile_No: formData.mobile_No,
//       permission: formData.permission,
//     };

//     try {
//       const response = await publicAxios.post('https://www.api.humanmaximizer.com/api/v1/user/registerSuperAdmin', submissionData);

//       if (response.data.success) {
//         setSubmissionStatus({ loading: false, success: response.data.message, error: '' });
//       } else {
//         setSubmissionStatus({ loading: false, success: '', error: response.data.message });
//       }
//     } catch (error) {
//       console.error('Error registering super admin:', error);
//       const errorMsg = 'An error occurred during registration.';
//       setSubmissionStatus({ loading: false, success: '', error: errorMsg });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {step === 1 && (
//           <div className="bg-white shadow-lg rounded-lg p-8">
//             <div onSubmit={handleSecretKeySubmit}>
//               <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Enter Secret Key</h2>
              
//               {secretKeyError && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
//                   {secretKeyError}
//                 </div>
//               )}
              
//               <div className="mb-6">
//                 <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700 mb-2">
//                   Secret Key
//                 </label>
//                 <input
//                   type="password"
//                   id="secretKey"
//                   placeholder="Enter secret key"
//                   value={secretKey}
//                   onChange={(e) => setSecretKey(e.target.value)}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
              
//               <button
//                 type="button"
//                 onClick={handleSecretKeySubmit}
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
//               >
//                 Proceed to Registration
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="bg-white shadow-lg rounded-lg p-8">
//             <div onSubmit={handleRegistrationSubmit}>
//               <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Super Admin Registration</h2>
              
//               {submissionStatus.error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
//                   {submissionStatus.error}
//                 </div>
//               )}
              
//               {submissionStatus.success && (
//                 <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
//                   {submissionStatus.success}
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Secret Key (readonly) */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="secret_key" className="block text-sm font-medium text-gray-700 mb-2">
//                     Secret Key
//                   </label>
//                   <input
//                     type="password"
//                     id="secret_key"
//                     name="secret_key"
//                     value={formData.secret_key}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                   />
//                   {formErrors.secret_key && <small className="text-red-600">{formErrors.secret_key}</small>}
//                 </div>

//                 {/* First Name */}
//                 <div>
//                   <label htmlFor="first_Name" className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="first_Name"
//                     name="first_Name"
//                     placeholder="Enter first name"
//                     value={formData.first_Name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.first_Name && <small className="text-red-600">{formErrors.first_Name}</small>}
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <label htmlFor="last_Name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="last_Name"
//                     name="last_Name"
//                     placeholder="Enter last name"
//                     value={formData.last_Name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.last_Name && <small className="text-red-600">{formErrors.last_Name}</small>}
//                 </div>

//                 {/* Employee ID */}
//                 <div>
//                   <label htmlFor="employee_Id" className="block text-sm font-medium text-gray-700 mb-2">
//                     Employee ID
//                   </label>
//                   <input
//                     type="text"
//                     id="employee_Id"
//                     name="employee_Id"
//                     placeholder="Enter employee ID"
//                     value={formData.employee_Id}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.employee_Id && <small className="text-red-600">{formErrors.employee_Id}</small>}
//                 </div>

//                 {/* Department */}
//                 <div>
//                   <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     id="department"
//                     name="department"
//                     placeholder="Enter department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.department && <small className="text-red-600">{formErrors.department}</small>}
//                 </div>

//                 {/* Designation */}
//                 <div>
//                   <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
//                     Designation
//                   </label>
//                   <input
//                     type="text"
//                     id="designation"
//                     name="designation"
//                     placeholder="Enter designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.designation && <small className="text-red-600">{formErrors.designation}</small>}
//                 </div>

//                 {/* Personal Email */}
//                 <div>
//                   <label htmlFor="personal_Email_Id" className="block text-sm font-medium text-gray-700 mb-2">
//                     Personal Email ID
//                   </label>
//                   <input
//                     type="email"
//                     id="personal_Email_Id"
//                     name="personal_Email_Id"
//                     placeholder="Enter personal email"
//                     value={formData.personal_Email_Id}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.personal_Email_Id && <small className="text-red-600">{formErrors.personal_Email_Id}</small>}
//                 </div>

//                 {/* Working Email */}
//                 <div>
//                   <label htmlFor="working_Email_Id" className="block text-sm font-medium text-gray-700 mb-2">
//                     Working Email ID
//                   </label>
//                   <input
//                     type="email"
//                     id="working_Email_Id"
//                     name="working_Email_Id"
//                     placeholder="Enter working email"
//                     value={formData.working_Email_Id}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.working_Email_Id && <small className="text-red-600">{formErrors.working_Email_Id}</small>}
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Enter password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.password && <small className="text-red-600">{formErrors.password}</small>}
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label htmlFor="confirm_Password" className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     id="confirm_Password"
//                     name="confirm_Password"
//                     placeholder="Confirm password"
//                     value={formData.confirm_Password}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.confirm_Password && <small className="text-red-600">{formErrors.confirm_Password}</small>}
//                 </div>

//                 {/* Mobile Number */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="mobile_No" className="block text-sm font-medium text-gray-700 mb-2">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="text"
//                     id="mobile_No"
//                     name="mobile_No"
//                     placeholder="Enter mobile number"
//                     value={formData.mobile_No}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {formErrors.mobile_No && <small className="text-red-600">{formErrors.mobile_No}</small>}
//                 </div>

//                 {/* Permissions */}
//                 <div className="md:col-span-2">
//                   <div className="flex items-center justify-between mb-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Permissions ({formData.permission.length} selected)
//                     </label>
//                     <div className="space-x-2">
//                       <button
//                         type="button"
//                         onClick={handleSelectAllPermissions}
//                         className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 transition duration-200"
//                       >
//                         Select All
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleClearAllPermissions}
//                         className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition duration-200"
//                       >
//                         Clear All
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {availablePermission.map((perm) => (
//                         <label key={perm.permission} className="flex items-start space-x-3 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.permission.includes(perm.permission)}
//                             onChange={() => handlePermissionChange(perm.permission)}
//                             className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <span className="text-sm text-gray-700 leading-5">{perm.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   {formErrors.permission && <small className="text-red-600">{formErrors.permission}</small>}
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <button
//                   type="button"
//                   onClick={handleRegistrationSubmit}
//                   disabled={submissionStatus.loading}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {submissionStatus.loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Registering...
//                     </>
//                   ) : (
//                     'Register Super Admin'
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuperAdminRegistration;


import React, { useState } from 'react';
import publicAxios from '../../service/publicAxios';
import {availablePermission} from '../../service/availablePermissions'; 

const SuperAdminRegistration = () => {
  const [step, setStep] = useState(1); // 1: Secret Key, 2: Registration Form
  const [secretKey, setSecretKey] = useState('');
  const [secretKeyError, setSecretKeyError] = useState('');
  
  const [formData, setFormData] = useState({
    secret_key: '',
    first_Name: '',
    last_Name: '',
    employee_Id: '',
    department: '',
    designation: '',
    personal_Email_Id: '',
    working_Email_Id: '',
    password: '',
    confirm_Password: '',
    mobile_No: '',
    permission: [],
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: '',
    error: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle permission changes
  const handlePermissionChange = (permissionValue) => {
    setFormData((prev) => {
      const currentPermissions = prev.permission;
      const isSelected = currentPermissions.includes(permissionValue);
      
      if (isSelected) {
        return {
          ...prev,
          permission: currentPermissions.filter(p => p !== permissionValue)
        };
      } else {
        return {
          ...prev,
          permission: [...currentPermissions, permissionValue]
        };
      }
    });
  };

  // Select all permissions
  const handleSelectAllPermissions = () => {
    const allPermissions = availablePermission.map(p => p.permission);
    setFormData(prev => ({
      ...prev,
      permission: allPermissions
    }));
  };

  // Clear all permissions
  const handleClearAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permission: []
    }));
  };

  // Step 1: Validate Secret Key
  const handleSecretKeySubmit = (e) => {
    e.preventDefault();
    const predefinedSecretKey = import.meta.env.VITE_SECRET_KEY || 'razorinfotech123';

    if (secretKey === predefinedSecretKey) {
      setStep(2);
      setSecretKeyError('');
      setFormData((prev) => ({ ...prev, secret_key: secretKey }));
    } else {
      setSecretKeyError('Invalid secret key. Please try again.');
    }
  };

  // Step 2: Handle Registration Form Submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors and statuses
    setFormErrors({});
    setSubmissionStatus({ loading: true, success: '', error: '' });

    // Required fields
    const errors = {};
    const requiredFields = [
      'secret_key',
      'first_Name',
      'last_Name',
      'employee_Id',
      'department',
      'designation',
      'personal_Email_Id',
      'working_Email_Id',
      'password',
      'confirm_Password',
      'mobile_No',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    // Password match
    if (formData.password !== formData.confirm_Password) {
      errors.password = 'Passwords do not match';
      errors.confirm_Password = 'Passwords do not match';
    }

    // Check permissions
    if (!formData.permission || formData.permission.length === 0) {
      errors.permission = 'At least one permission must be selected';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmissionStatus({ loading: false, success: '', error: '' });
      return;
    }

    // Prepare data
    const submissionData = {
      secret_key: formData.secret_key,
      first_Name: formData.first_Name,
      last_Name: formData.last_Name,
      employee_Id: formData.employee_Id,
      department: formData.department,
      designation: formData.designation,
      personal_Email_Id: formData.personal_Email_Id,
      working_Email_Id: formData.working_Email_Id,
      password: formData.password,
      confirm_Password: formData.confirm_Password,
      mobile_No: formData.mobile_No,
      permission: formData.permission,
    };

    try {
      const response = await publicAxios.post('/auth/register-super-admin', submissionData);

      if (response.data.success) {
        setSubmissionStatus({ loading: false, success: response.data.message, error: '' });
      } else {
        setSubmissionStatus({ loading: false, success: '', error: response.data.message });
      }
    } catch (error) {
      console.error('Error registering super admin:', error);
      const errorMsg = 'An error occurred during registration.';
      setSubmissionStatus({ loading: false, success: '', error: errorMsg });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 1 && (
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold text-white dark:text-white mb-6 text-center">Enter Secret Key</h2>
              
              {secretKeyError && (
                <div className="bg-red-900/50 dark:bg-red-900/50 border border-red-600 dark:border-red-600 text-red-300 dark:text-red-300 px-4 py-3 rounded-md mb-4">
                  {secretKeyError}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="secretKey" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                  Secret Key
                </label>
                <input
                  type="password"
                  id="secretKey"
                  placeholder="Enter secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                />
              </div>
              
              <button
                type="button"
                onClick={handleSecretKeySubmit}
                className="w-full bg-blue-600 dark:bg-blue-600 text-white dark:text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-800 transition duration-200"
              >
                Proceed to Registration
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold text-white dark:text-white mb-6 text-center">Super Admin Registration</h2>
              
              {submissionStatus.error && (
                <div className="bg-red-900/50 dark:bg-red-900/50 border border-red-600 dark:border-red-600 text-red-300 dark:text-red-300 px-4 py-3 rounded-md mb-4">
                  {submissionStatus.error}
                </div>
              )}
              
              {submissionStatus.success && (
                <div className="bg-green-900/50 dark:bg-green-900/50 border border-green-600 dark:border-green-600 text-green-300 dark:text-green-300 px-4 py-3 rounded-md mb-4">
                  {submissionStatus.success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Secret Key (readonly) */}
                <div className="md:col-span-2">
                  <label htmlFor="secret_key" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    id="secret_key"
                    name="secret_key"
                    value={formData.secret_key}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-600 dark:bg-gray-600 text-gray-300 dark:text-gray-300 cursor-not-allowed"
                  />
                  {formErrors.secret_key && <small className="text-red-400 dark:text-red-400">{formErrors.secret_key}</small>}
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="first_Name" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_Name"
                    name="first_Name"
                    placeholder="Enter first name"
                    value={formData.first_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.first_Name && <small className="text-red-400 dark:text-red-400">{formErrors.first_Name}</small>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last_Name" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    placeholder="Enter last name"
                    value={formData.last_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.last_Name && <small className="text-red-400 dark:text-red-400">{formErrors.last_Name}</small>}
                </div>

                {/* Employee ID */}
                <div>
                  <label htmlFor="employee_Id" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="employee_Id"
                    name="employee_Id"
                    placeholder="Enter employee ID"
                    value={formData.employee_Id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.employee_Id && <small className="text-red-400 dark:text-red-400">{formErrors.employee_Id}</small>}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {/* {formErrors.department && <small className="text-red-400 dark:text-red-400">{formErrors.department}</small>} */}
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    placeholder="Enter designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.designation && <small className="text-red-400 dark:text-red-400">{formErrors.designation}</small>}
                </div>

                {/* Personal Email */}
                <div>
                  <label htmlFor="personal_Email_Id" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Personal Email ID
                  </label>
                  <input
                    type="email"
                    id="personal_Email_Id"
                    name="personal_Email_Id"
                    placeholder="Enter personal email"
                    value={formData.personal_Email_Id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.personal_Email_Id && <small className="text-red-400 dark:text-red-400">{formErrors.personal_Email_Id}</small>}
                </div>

                {/* Working Email */}
                <div>
                  <label htmlFor="working_Email_Id" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Working Email ID
                  </label>
                  <input
                    type="email"
                    id="working_Email_Id"
                    name="working_Email_Id"
                    placeholder="Enter working email"
                    value={formData.working_Email_Id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.working_Email_Id && <small className="text-red-400 dark:text-red-400">{formErrors.working_Email_Id}</small>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.password && <small className="text-red-400 dark:text-red-400">{formErrors.password}</small>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm_Password" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_Password"
                    name="confirm_Password"
                    placeholder="Confirm password"
                    value={formData.confirm_Password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.confirm_Password && <small className="text-red-400 dark:text-red-400">{formErrors.confirm_Password}</small>}
                </div>

                {/* Mobile Number */}
                <div className="md:col-span-2">
                  <label htmlFor="mobile_No" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile_No"
                    name="mobile_No"
                    placeholder="Enter mobile number"
                    value={formData.mobile_No}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 dark:border-gray-600 rounded-md shadow-sm bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                  />
                  {formErrors.mobile_No && <small className="text-red-400 dark:text-red-400">{formErrors.mobile_No}</small>}
                </div>

                {/* Permissions */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300">
                      Permissions ({formData.permission.length} selected)
                    </label>
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={handleSelectAllPermissions}
                        className="text-sm bg-blue-800/50 dark:bg-blue-800/50 text-blue-300 dark:text-blue-300 px-3 py-1 rounded-md hover:bg-blue-700/50 dark:hover:bg-blue-700/50 border border-blue-600 dark:border-blue-600 transition duration-200"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={handleClearAllPermissions}
                        className="text-sm bg-gray-700 dark:bg-gray-700 text-gray-300 dark:text-gray-300 px-3 py-1 rounded-md hover:bg-gray-600 dark:hover:bg-gray-600 border border-gray-600 dark:border-gray-600 transition duration-200"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto border border-gray-600 dark:border-gray-600 rounded-md p-4 bg-gray-750 dark:bg-gray-750">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availablePermission.map((perm) => (
                        <label key={perm.permission} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.permission.includes(perm.permission)}
                            onChange={() => handlePermissionChange(perm.permission)}
                            className="mt-1 h-4 w-4 text-blue-600 dark:text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-500 border-gray-500 dark:border-gray-500 rounded bg-gray-700 dark:bg-gray-700"
                          />
                          <span className="text-sm text-gray-300 dark:text-gray-300 leading-5">{perm.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formErrors.permission && <small className="text-red-400 dark:text-red-400">{formErrors.permission}</small>}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleRegistrationSubmit}
                  disabled={submissionStatus.loading}
                  className="w-full bg-blue-600 dark:bg-blue-600 text-white dark:text-white py-3 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submissionStatus.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Register Super Admin'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminRegistration;