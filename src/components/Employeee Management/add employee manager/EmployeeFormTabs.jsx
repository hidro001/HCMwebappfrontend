import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useEmployeeStore from "../../../store/useEmployeeStore.js";
import { createEmployee, updateEmployee } from "../../../service/employeeService.js";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import TabButton from "../common/TabButton";
import FullScreenLoader from "../../common/FullScreenLoader.jsx";

import Step1EmployeeDetails from "./Step1EmployeeDetails";
import Step2QualificationsExperience from "./Step2QualificationsExperience";
import Step3PersonalDetails from "./Step3PersonalDetails";
import Step4AdditionalInfo from "./Step4AdditionalInfo"; 

export default function EmployeeFormTabs({
  formTitle = "Employee Form",
  defaultValues = {},
  onComplete = () => {},
  employeeId,
}) {
  const {
    loadShiftTimings,
    loadEmploymentTypes,
    loadDepartments,
    loadAllEmployees,
    loadPermissionRoles,
    loadCompanyAddresses,
    loadDesignations,
    loadLeaveTypes,
    loadBreakRecords, 
  } = useEmployeeStore();

  const [activeTab, setActiveTab] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadShiftTimings();
    loadEmploymentTypes();
    loadDepartments();
    loadAllEmployees();
    loadPermissionRoles();
    loadCompanyAddresses();
    loadDesignations();
    loadLeaveTypes()
    loadBreakRecords(); 
  }, []);

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
      current_Address: "",
      working_Email_Id: "",
      date_of_Joining: "",
      date_of_Conformation: "",
      departmentAllocated: "",
      permission_role: "",
      permission: [],
      assigned_to: [],
      designation: "",
      work_Mode: "",
      employee_Id: "",
      officeLocation: "",
      latitude: "",
      longitude: "",
      shift_Timing: "",
      break_Type: "",
      salary: "",
      otp: "no",
      assigned_leaves: [],
      employee_Type: "",
      user_Avatar: null,
      qualifications: [
        {
          qualificationName: "",
          universityBoard: "",
          specialization: "",
          certifications: "",
          totalMarks: "",
          passingYear: "",
          percentageCgpa: "",
        },
      ],
      experiences: [
        {
          companyName: "",
          designation: "",
          grade_Band_Level: "",
          previous_Positions: "",
          startDate: "",
          endDate: "",
        },
      ],
      total_Experience: "",
      pan_No: "",
      adhaar_Number: "",
      bank_Holder_Name: "",
      bank_Name: "",
      bank_Account_No: "",
      confirmBankAccountNo: "",
      ifsc_Code: "",
      documents: [{ name: "", file: null }],
      // Additional Info fields:
      marital_Status: "",
      nationality: "",
      passport_Number: "",
      emergency_Contact_Person: "",
      emergency_Contact_Number: "",
      emergency_Contact_Blood_Group: "",
      languages_Known: [],
      allowances_Provided: [],
      current_Base_Salary: "",
      pf_Details: "",
      esi_Details: "",
      gratuity_Details: "",
      medical_Insurance: "",
      health_benefits: "",
      other_Benefits: "",
      overtime_allowed: "",
      overtime_hours: "",
      background_Verification_Status: "",
      police_Verification: "",
      trainingStatus: "",
      complianceTrainingStatus: "",
      legal_Certifications: "",
      org_Specific_IDs: "",
      date_of_Resignation: "",
      reason_for_Leaving: "",
      notice_Period_Served: "",
      exit_Interview_Feedback: "",
      full_Final_Settlement: "",
      relieving_Certificate_Date: "",
      linkedin_Profile_URL: "",
      github_Portfolio_URL: "",
      disability_Status: "",
      // Spread defaultValues if provided (for update)
      ...defaultValues,
    },
  });

  const { handleSubmit, getValues, control, reset } = methods;

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

  const onSubmitStep = () => {
    if (activeTab < 3) {
      setActiveTab((prev) => prev + 1);
    } else {
      setConfirmationOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);
    setSubmitting(true);
    try {
      const formValues = getValues();
      console.log("🔍 Form values before processing:", formValues);
      
      const formData = new FormData();
      
      // These keys will be handled separately:
      const omitKeys = [
        "permission",
        "assigned_to", 
        "assigned_leaves", 
        "qualifications",
        "experiences",
        "documents",
        "confirmBankAccountNo",
        "user_Avatar",
        "languages_Known",
        "allowances_Provided"
      ];

      // Handle regular fields
      Object.keys(formValues).forEach((key) => {
        if (omitKeys.includes(key)) return;

        if (key === "officeLocation") {
          if (formValues[key]) {
            formData.append("office_address", formValues[key]);
          }
        } else if (key === "permanent_Address") {
          if (formValues[key]) {
            formData.append("user_Address", formValues[key]);
          }
        } else if (key === "break_Type") {
          if (formValues[key] && typeof formValues[key] === "object") {
            formData.append("break_Type", JSON.stringify(formValues[key]));
          } else {
            formData.append("break_Type", formValues[key] || "");
          }
        } else {
          if (formValues[key] !== null && formValues[key] !== "") {
            formData.append(key, formValues[key]);
          }
        }
      });

      // ✅ Handle assigned_leaves array properly
      if (formValues.assigned_leaves && Array.isArray(formValues.assigned_leaves)) {
        console.log("📋 Processing assigned_leaves:", formValues.assigned_leaves);
        formValues.assigned_leaves.forEach((leaveId, index) => {
          if (leaveId) {
            formData.append(`assigned_leaves[${index}]`, leaveId);
          }
        });
      }

      // ✅ Handle other arrays properly
      if (formValues.permission && Array.isArray(formValues.permission)) {
        formValues.permission.forEach((perm, i) =>
          formData.append(`permission[${i}]`, perm)
        );
      }

      if (formValues.assigned_to && Array.isArray(formValues.assigned_to)) {
        formValues.assigned_to.forEach((mgr, i) =>
          formData.append(`assigned_to[${i}]`, mgr)
        );
      }

      // ✅ Handle languages_Known as array
      if (formValues.languages_Known && Array.isArray(formValues.languages_Known)) {
        formValues.languages_Known.forEach((lang, index) => {
          formData.append(`languages_Known[${index}]`, lang);
        });
      }

      // ✅ Handle allowances_Provided as array  
      if (formValues.allowances_Provided && Array.isArray(formValues.allowances_Provided)) {
        formValues.allowances_Provided.forEach((allowance, index) => {
          formData.append(`allowances_Provided[${index}]`, allowance);
        });
      }

      // Append avatar file:
      if (formValues.user_Avatar) {
        formData.append("user_Avatar", formValues.user_Avatar);
      }

      // Append documents:
      formValues.documents.forEach((doc, index) => {
        if (doc.name) {
          formData.append(`documents[${index}][name]`, doc.name);
        }
        if (doc.file) {
          formData.append(`documents[${index}][file]`, doc.file);
        }
      });

      // Append qualifications:
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
          `qualifications[${index}][certifications]`,
          qual.certifications || ""
        );
        formData.append(
          `qualifications[${index}][specialization]`,
          qual.specialization || ""
        );
        formData.append(
          `qualifications[${index}][totalMarks]`,
          qual.totalMarks || ""
        );
        formData.append(
          `qualifications[${index}][year]`,
          qual.passingYear || ""
        );
        formData.append(
          `qualifications[${index}][percentageCgpa]`,
          qual.percentageCgpa || ""
        );
      });

      // Append experiences:
      formValues.experiences.forEach((exp, index) => {
        formData.append(
          `experiences[${index}][companyName]`,
          exp.companyName || ""
        );
        formData.append(
          `experiences[${index}][designation]`,
          exp.designation || ""
        );
        formData.append(
          `experiences[${index}][grade_Band_Level]`,
          exp.grade_Band_Level || ""
        );
        formData.append(
          `experiences[${index}][previous_Positions]`,
          exp.previous_Positions || ""
        );
        formData.append(
          `experiences[${index}][startDate]`,
          exp.startDate || ""
        );
        formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
      });

      // ✅ Debug: Log FormData contents
      console.log("📦 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      let response;
      if (employeeId) {
        response = await updateEmployee(employeeId, formData);
      } else {
        response = await createEmployee(formData);
      }
      
      if (response.success) {
        toast.success(
          employeeId
            ? "Employee updated successfully!"
            : "Employee created successfully!"
        );
        onComplete(response);
        reset();
      } else {
        toast.error(
          (employeeId ? "Update" : "Creation") +
            " failed: " +
            (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
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
          (employeeId ? "Update" : "Registration") + " failed: " + error.message
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false);
  };

  return (
    <FormProvider {...methods}>
      {submitting && <FullScreenLoader />}
      <div className="employee-form bg-bg-primary">
        <div className="bg-bg-secondary rounded-md shadow p-2">
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
            <TabButton
              label="Additional Info"
              isActive={activeTab === 3}
              onClick={() => setActiveTab(3)}
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
              {activeTab === 3 && (
                <motion.div
                  key="tab-additional"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Step4AdditionalInfo
                    onSubmitStep={onSubmitStep}
                    submitting={submitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
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