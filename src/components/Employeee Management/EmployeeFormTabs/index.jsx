

// import React, { useState, useEffect } from "react";
// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import { AnimatePresence, motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// import useEmployeeStore from "../../../store/useEmployeeStore.js";
// import { createEmployee } from "../../../service/employeeService.js";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import TabButton from "../common/TabButton";
// import FullScreenLoader from "../../common/FullScreenLoader.jsx"; 

// import Step1EmployeeDetails from "./Step1EmployeeDetails";
// import Step2QualificationsExperience from "./Step2QualificationsExperience";
// import Step3PersonalDetails from "./Step3PersonalDetails";

// // Just an example for your letters only validation
// const lettersOnlyRegex = /^[A-Za-z\s]+$/;

// export default function EmployeeFormTabs({
//   formTitle = "Employee Form",
//   defaultValues = {},
//   onComplete = () => {},
// }) {
//   const {
//     // Various data & loading from Zustand store
//     loadingShiftTimings,
//     loadingEmploymentTypes,
//     loadingDepartments,
//     loadingAllEmployees,
//     loadingPermissionRoles,
//     loadingAddresses,
//     loadingDesignations,
//     loadShiftTimings,
//     loadEmploymentTypes,
//     loadDepartments,
//     loadAllEmployees,
//     loadPermissionRoles,
//     loadCompanyAddresses,
//     loadDesignations,
//   } = useEmployeeStore();

//   const [activeTab, setActiveTab] = useState(0);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false); // tracks API call state

//   useEffect(() => {
//     loadShiftTimings();
//     loadEmploymentTypes();
//     loadDepartments();
//     loadAllEmployees();
//     loadPermissionRoles();
//     loadCompanyAddresses();
//     loadDesignations();
//     // eslint-disable-next-line
//   }, []);

//   // Initialize form with default or existing values
//   const methods = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       first_Name: "",
//       last_Name: "",
//       gender: "",
//       mobile_No: "",
//       personal_Email_Id: "",
//       dob: "",
//       permanent_Address: "",
//       working_Email_Id: "",
//       date_of_Joining: "",
//       departmentAllocated: "",
//       permission_role: "",
//       permission: [],
//       assigned_to: [],
//       designation: "",
//       employee_Id: "",
//       officeLocation: "",
//       latitude: "",
//       longitude: "",
//       shift_Timing: "",
//       salary: "",
//       otp: "no",
//       no_of_Paid_Leave: 0,
//       employee_Type: "",
//       user_Avatar: null,
//       qualifications: [
//         {
//           qualificationName: "",
//           universityBoard: "",
//           totalMarks: "",
//           passingYear: "",
//           percentageCgpa: "",
//         },
//       ],
//       experiences: [
//         {
//           companyName: "",
//           designation: "",
//           totalExperience: "",
//           startDate: "",
//           endDate: "",
//         },
//       ],
//       pan_No: "",
//       adhaar_Number: "",
//       bank_Holder_Name: "",
//       bank_Name: "",
//       bank_Account_No: "",
//       confirmBankAccountNo: "",
//       ifsc_Code: "",
//       documents: [{ name: "", file: null }],
//       ...defaultValues, // in case you're updating an existing record
//     },
//   });

//   const { handleSubmit, getValues, control, reset } = methods;

//   // Qualifications
//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification,
//   } = useFieldArray({ control, name: "qualifications" });

//   // Experiences
//   const {
//     fields: experienceFields,
//     append: appendExperience,
//     remove: removeExperience,
//   } = useFieldArray({ control, name: "experiences" });

//   // Documents
//   const {
//     fields: documentFields,
//     append: appendDocument,
//     remove: removeDocument,
//   } = useFieldArray({ control, name: "documents" });

//   // Move to the next tab or open confirmation on final step
//   const onSubmitStep = () => {
//     if (activeTab < 2) {
//       setActiveTab((prev) => prev + 1);
//     } else {
//       setConfirmationOpen(true);
//     }
//   };

//   // Called when user clicks "Yes" in the confirmation dialog
//   const handleConfirmSubmit = async () => {
//     setConfirmationOpen(false);
//     setSubmitting(true); // Show loading overlay
//     try {
//       const formValues = getValues();
//       const formData = new FormData();

//       // Exclude fields that won't be sent to the backend
//       const omitKeys = [
//         "permission",
//         "assigned_to",
//         "qualifications",
//         "experiences",
//         "documents",
//         "confirmBankAccountNo",
//         "user_Avatar",
//       ];

//       // Append all "normal" fields
//       Object.keys(formValues).forEach((key) => {
//         if (!omitKeys.includes(key)) {
//           const val = formValues[key];
//           if (val !== null && val !== "") {
//             formData.append(key, val);
//           }
//         }
//       });

//       // Append arrays & files
//       formValues.permission.forEach((perm, index) => {
//         formData.append(`permission[${index}]`, perm);
//       });
//       formValues.assigned_to.forEach((mgr, index) => {
//         formData.append(`assigned_to[${index}]`, mgr);
//       });

//       if (formValues.user_Avatar) {
//         formData.append("user_Avatar", formValues.user_Avatar);
//       }

//       formValues.documents.forEach((doc, index) => {
//         if (doc.name) formData.append(`documents[${index}][name]`, doc.name);
//         if (doc.file) formData.append(`documents[${index}][file]`, doc.file);
//       });

//       formValues.qualifications.forEach((qual, index) => {
//         formData.append(
//           `qualifications[${index}][qualificationName]`,
//           qual.qualificationName || ""
//         );
//         formData.append(
//           `qualifications[${index}][universityBoard]`,
//           qual.universityBoard || ""
//         );
//         formData.append(
//           `qualifications[${index}][totalMarks]`,
//           qual.totalMarks || ""
//         );
//         formData.append(
//           `qualifications[${index}][year]`,
//           qual.passingYear || ""
//         );
//         formData.append(
//           `qualifications[${index}][percentageCgpa]`,
//           qual.percentageCgpa || ""
//         );
//       });

//       formValues.experiences.forEach((exp, index) => {
//         formData.append(
//           `experiences[${index}][companyName]`,
//           exp.companyName || ""
//         );
//         formData.append(
//           `experiences[${index}][designation]`,
//           exp.designation || ""
//         );
//         formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
//         formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
//         formData.append(
//           `experiences[${index}][totalExperience]`,
//           exp.totalExperience || ""
//         );
//       });

//       // Make your API call
//       const response = await createEmployee(formData);

//       if (response.success) {
//         toast.success("User registered successfully!");
//         onComplete(response);

//         // Reset the form ONLY if success
//         reset(); // clears all fields
//       } else {
//         toast.error("Registration failed: " + response.message);
//         // If failed, do NOT reset so user can correct
//       }
//     } catch (error) {
//       if (error.response?.data?.details) {
//         error.response.data.details.forEach((detail) => {
//           toast.error(detail.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error("Registration failed: " + error.response.data.message);
//       } else {
//         toast.error("Registration failed: " + error.message);
//       }
//       // Do not reset in case of error
//     } finally {
//       setSubmitting(false); // Hide loading overlay
//     }
//   };

//   const handleCancelSubmit = () => {
//     setConfirmationOpen(false);
//   };

//   return (
//     <FormProvider {...methods}>
//       {/* If submitting, show a full-screen overlay */}
//       {submitting && <FullScreenLoader />}

//       <div className="employee-form bg-bg-primary text-text-primary py-2">
//         <div className="">
//           <div className="bg-bg-secondary rounded-md shadow p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

//             {/* Tabs */}
//             <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//               <TabButton
//                 label="Employee Details"
//                 isActive={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               />
//               <TabButton
//                 label="Qualifications & Experience"
//                 isActive={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               />
//               <TabButton
//                 label="Personal Details"
//                 isActive={activeTab === 2}
//                 onClick={() => setActiveTab(2)}
//               />
//             </div>

//             <div className="mt-4">
//               <AnimatePresence mode="wait">
//                 {activeTab === 0 && (
//                   <motion.div
//                     key="tab-employee"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step1EmployeeDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 1 && (
//                   <motion.div
//                     key="tab-qualifications"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step2QualificationsExperience
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       qualificationFields={qualificationFields}
//                       removeQualification={removeQualification}
//                       appendQualification={appendQualification}
//                       experienceFields={experienceFields}
//                       removeExperience={removeExperience}
//                       appendExperience={appendExperience}
//                     />
//                   </motion.div>
//                 )}

//                 {activeTab === 2 && (
//                   <motion.div
//                     key="tab-personal"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   >
//                     <Step3PersonalDetails
//                       onSubmitStep={onSubmitStep}
//                       submitting={submitting}
//                       documentFields={documentFields}
//                       removeDocument={removeDocument}
//                       appendDocument={appendDocument}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog for final submit */}
//       <ConfirmationDialog
//         open={confirmationOpen}
//         title="Are you sure?"
//         message="Do you want to add/update this user?"
//         confirmText="Yes"
//         cancelText="No, cancel!"
//         onConfirm={handleConfirmSubmit}
//         onCancel={handleCancelSubmit}
//       />
//     </FormProvider>
//   );
// }

import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";

import useEmployeeStore from "../../../store/useEmployeeStore.js";
import {
  createEmployee,
  updateEmployee, // (IMPORTANT) Add this import so we can call updateEmployee
} from "../../../service/employeeService.js";

import ConfirmationDialog from "../../common/ConfirmationDialog";
import TabButton from "../common/TabButton";
import FullScreenLoader from "../../common/FullScreenLoader.jsx";

import Step1EmployeeDetails from "./Step1EmployeeDetails";
import Step2QualificationsExperience from "./Step2QualificationsExperience";
import Step3PersonalDetails from "./Step3PersonalDetails";

const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function EmployeeFormTabs({
  formTitle = "Employee Form",
  defaultValues = {},
  onComplete = () => {},
  employeeId, // (IMPORTANT) Receive employeeId as a prop for update
}) {
  const {
    loadShiftTimings,
    loadEmploymentTypes,
    loadDepartments,
    loadAllEmployees,
    loadPermissionRoles,
    loadCompanyAddresses,
    loadDesignations,

    loadingShiftTimings,
    loadingEmploymentTypes,
    loadingDepartments,
    loadingAllEmployees,
    loadingPermissionRoles,
    loadingAddresses,
    loadingDesignations,
  } = useEmployeeStore();

  const [activeTab, setActiveTab] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false); // For showing loader

  useEffect(() => {
    loadShiftTimings();
    loadEmploymentTypes();
    loadDepartments();
    loadAllEmployees();
    loadPermissionRoles();
    loadCompanyAddresses();
    loadDesignations();
    // eslint-disable-next-line
  }, []);

  // React Hook Form setup
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      first_Name: "",
      last_Name: "",
      gender: "",
      mobile_No: "",
      personal_Email_Id: "",
      dob: "",
      permanent_Address: "",
      working_Email_Id: "",
      date_of_Joining: "",
      departmentAllocated: "",
      permission_role: "",
      permission: [],
      assigned_to: [],
      designation: "",
      employee_Id: "",
      officeLocation: "",
      latitude: "",
      longitude: "",
      shift_Timing: "",
      salary: "",
      otp: "no",
      no_of_Paid_Leave: 0,
      employee_Type: "",
      user_Avatar: null,
      qualifications: [
        {
          qualificationName: "",
          universityBoard: "",
          totalMarks: "",
          passingYear: "",
          percentageCgpa: "",
        },
      ],
      experiences: [
        {
          companyName: "",
          designation: "",
          totalExperience: "",
          startDate: "",
          endDate: "",
        },
      ],
      pan_No: "",
      adhaar_Number: "",
      bank_Holder_Name: "",
      bank_Name: "",
      bank_Account_No: "",
      confirmBankAccountNo: "",
      ifsc_Code: "",
      documents: [{ name: "", file: null }],
      ...defaultValues, // Merge in any existing employee data for update
    },
  });

  const { handleSubmit, getValues, control, reset } = methods;

  // Setup FieldArrays
  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({ control, name: "qualifications" });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({ control, name: "documents" });

  // Step to next tab or confirm final
  const onSubmitStep = () => {
    if (activeTab < 2) {
      setActiveTab((prev) => prev + 1);
    } else {
      setConfirmationOpen(true);
    }
  };

  // (IMPORTANT) The final submit logic: decide create vs. update
  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);
    setSubmitting(true); // Show loading overlay

    try {
      const formValues = getValues();
      const formData = new FormData();

      // Omit certain keys from direct appending
      const omitKeys = [
        "permission",
        "assigned_to",
        "qualifications",
        "experiences",
        "documents",
        "confirmBankAccountNo",
        "user_Avatar",
      ];

      // Append normal fields
      Object.keys(formValues).forEach((key) => {
        if (!omitKeys.includes(key)) {
          const val = formValues[key];
          if (val !== null && val !== "") {
            formData.append(key, val);
          }
        }
      });

      // Arrays & Files
      formValues.permission.forEach((perm, i) =>
        formData.append(`permission[${i}]`, perm)
      );
      formValues.assigned_to.forEach((mgr, i) =>
        formData.append(`assigned_to[${i}]`, mgr)
      );

      if (formValues.user_Avatar) {
        formData.append("user_Avatar", formValues.user_Avatar);
      }

      formValues.documents.forEach((doc, index) => {
        if (doc.name) {
          formData.append(`documents[${index}][name]`, doc.name);
        }
        if (doc.file) {
          formData.append(`documents[${index}][file]`, doc.file);
        }
      });

      formValues.qualifications.forEach((qual, index) => {
        formData.append(
          `qualifications[${index}][qualificationName]`,
          qual.qualificationName || ""
        );
        formData.append(
          `qualifications[${index}][universityBoard]`,
          qual.universityBoard || ""
        );
        formData.append(
          `qualifications[${index}][totalMarks]`,
          qual.totalMarks || ""
        );
        formData.append(`qualifications[${index}][year]`, qual.passingYear || "");
        formData.append(
          `qualifications[${index}][percentageCgpa]`,
          qual.percentageCgpa || ""
        );
      });

      formValues.experiences.forEach((exp, index) => {
        formData.append(
          `experiences[${index}][companyName]`,
          exp.companyName || ""
        );
        formData.append(
          `experiences[${index}][designation]`,
          exp.designation || ""
        );
        formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
        formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
        formData.append(
          `experiences[${index}][totalExperience]`,
          exp.totalExperience || ""
        );
      });

      // Actual API call:
      let response;
      if (employeeId) {
        // (IMPORTANT) call updateEmployee if we have an employeeId
        response = await updateEmployee(employeeId, formData);
      } else {
        // otherwise, create a new employee
        response = await createEmployee(formData);
      }

      // Check response
      if (response.success) {
        toast.success(
          employeeId
            ? "Employee updated successfully!"
            : "Employee created successfully!"
        );
        onComplete(response);

        // Optionally reset the form ONLY on success
        reset();
      } else {
        toast.error(
          (employeeId ? "Update" : "Creation") +
            " failed: " +
            (response.message || "Unknown error")
        );
      }
    } catch (error) {
      if (error.response?.data?.details) {
        error.response.data.details.forEach((detail) => {
          toast.error(detail.message);
        });
      } else if (error.response?.data?.message) {
        toast.error(
          (employeeId ? "Update" : "Registration") +
            " failed: " +
            error.response.data.message
        );
      } else {
        toast.error(
          (employeeId ? "Update" : "Registration") +
            " failed: " +
            error.message
        );
      }
    } finally {
      setSubmitting(false); // Hide loader
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false);
  };

  return (
    <FormProvider {...methods}>
      {submitting && <FullScreenLoader />}

      <div className="employee-form bg-bg-primary text-text-primary py-2">
        <div className="bg-bg-secondary rounded-md shadow p-6">
          <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
            <TabButton
              label="Employee Details"
              isActive={activeTab === 0}
              onClick={() => setActiveTab(0)}
            />
            <TabButton
              label="Qualifications & Experience"
              isActive={activeTab === 1}
              onClick={() => setActiveTab(1)}
            />
            <TabButton
              label="Personal Details"
              isActive={activeTab === 2}
              onClick={() => setActiveTab(2)}
            />
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="tab-employee"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Step1EmployeeDetails
                    onSubmitStep={onSubmitStep}
                    submitting={submitting}
                  />
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="tab-qualifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Step2QualificationsExperience
                    onSubmitStep={onSubmitStep}
                    submitting={submitting}
                    qualificationFields={qualificationFields}
                    removeQualification={removeQualification}
                    appendQualification={appendQualification}
                    experienceFields={experienceFields}
                    removeExperience={removeExperience}
                    appendExperience={appendExperience}
                  />
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="tab-personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Step3PersonalDetails
                    onSubmitStep={onSubmitStep}
                    submitting={submitting}
                    documentFields={documentFields}
                    removeDocument={removeDocument}
                    appendDocument={appendDocument}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        title="Are you sure?"
        message="Do you want to add or update this user?"
        confirmText="Yes"
        cancelText="No, cancel!"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </FormProvider>
  );
}
