import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmployeeStore from "../../../store/useEmployeeStore";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";

export default function UpdateEmployeePage() {
  const { id: employeeId } = useParams();
  const {
    loadEmployeeById,
    selectedEmployee,
    loadingSelectedEmployee,
    resetSelectedEmployee,
  } = useEmployeeStore();
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    // Reset before fetching to prevent stale data
    setDefaultValues(null);
    loadEmployeeById(employeeId);

    return () => {
      resetSelectedEmployee(); // clean up to prevent stale data
    };
  }, [employeeId, loadEmployeeById]);

  useEffect(() => {
    loadEmployeeById(employeeId);
  }, [employeeId, loadEmployeeById]);

  useEffect(() => {
    if (selectedEmployee && selectedEmployee._id === employeeId) {
      const mappedValues = mapEmployeeToFormDefaults(selectedEmployee);
      setDefaultValues(mappedValues);
    }
  }, [selectedEmployee, employeeId]); // include employeeId dependency

  const handleComplete = (finalResponse) => {
    toast.success("Employee updated successfully!");
  };

  if (loadingSelectedEmployee) {
    return <div>Loading existing employee...</div>;
  }
  if (!defaultValues) {
    return <div>No employee data to update</div>;
  }

  return (
    <div className="bg-bg-primary">
      <EmployeeFormTabs
        formTitle="Update Employee"
        defaultValues={defaultValues}
        onComplete={handleComplete}
        employeeId={employeeId}
      />
    </div>
  );
}

function mapEmployeeToFormDefaults(employeeData) {
  // Step A: Prepare a parsed array
  let parsedAllowances = [];

  // If the backend sends something like "da,conveyance,medical" directly:
  if (typeof employeeData.allowances_Provided === "string") {
    parsedAllowances = employeeData.allowances_Provided.split(",");
  }
  // OR if the backend sends ["da,conveyance,medical"] as an array of length 1
  else if (
    Array.isArray(employeeData.allowances_Provided) &&
    employeeData.allowances_Provided.length > 0 &&
    typeof employeeData.allowances_Provided[0] === "string"
  ) {
    parsedAllowances = employeeData.allowances_Provided[0].split(",");
  }
  // If the backend is already sending an array like ["da","conveyance","medical"], then:
  else if (Array.isArray(employeeData.allowances_Provided)) {
    parsedAllowances = employeeData.allowances_Provided;
  }

  // Step A: parse the languages_Known
  let parsedLanguages = [];

  // If backend sends an array with a single comma-separated string
  // e.g. ["Spanish,Mandarin,Hindi"]
  if (
    Array.isArray(employeeData.languages_Known) &&
    employeeData.languages_Known.length > 0 &&
    typeof employeeData.languages_Known[0] === "string"
  ) {
    parsedLanguages = employeeData.languages_Known[0].split(",");
  }
  // Or if backend sends a plain string e.g. "Spanish,Mandarin,Hindi"
  else if (typeof employeeData.languages_Known === "string") {
    parsedLanguages = employeeData.languages_Known.split(",");
  }
  // Or if it's already an array like ["Spanish","Mandarin","Hindi"]
  else if (Array.isArray(employeeData.languages_Known)) {
    parsedLanguages = employeeData.languages_Known;
  }

  return {
    first_Name: employeeData.first_Name || "",
    last_Name: employeeData.last_Name || "",
    designation: employeeData.designation || "",
    employee_Type: employeeData.employee_Type || "",
    departmentAllocated: employeeData.department || "",
    employee_Id: employeeData.employee_Id || "",
    mobile_No: employeeData.mobile_No || "",
    personal_Email_Id: employeeData.personal_Email_Id || "",
    working_Email_Id: employeeData.working_Email_Id || "",
    gender: employeeData.gender || "",
    date_of_Joining: employeeData.date_of_Joining
      ? employeeData.date_of_Joining.substring(0, 10)
      : "",
    date_of_Conformation: employeeData.date_of_Conformation
      ? employeeData.date_of_Conformation.substring(0, 10)
      : "",
    dob: employeeData.dob ? employeeData.dob.substring(0, 10) : "",
    salary: employeeData.salary || "",
    latitude: employeeData.latitude || "",
    longitude: employeeData.longitude || "",
    shift_Timing: employeeData.shift_Timing || "",
    shift_Timing_Array: employeeData.shift_Timing_Array || "",
    break_Type: employeeData.break_Type || "",
    // Notice: The frontend field permanent_Address maps to backend's user_Address
    permanent_Address: employeeData.user_Address || "",
    current_Address: employeeData.current_Address || "",
    // And officeLocation maps to backend field office_address:
    officeLocation: employeeData.office_address || "",
    otp: employeeData.otp || "no",
    pan_No: employeeData.pan_No || "",
    adhaar_Number: employeeData.adhaar_Number || "",
    bank_Holder_Name: employeeData.bank_Holder_Name || "",
    bank_Name: employeeData.bank_Name || "",
    bank_Account_No: employeeData.bank_Account_No || "",
    ifsc_Code: employeeData.ifsc_Code || "",
    assigned_to: employeeData.assigned_to?.map((mgr) => mgr._id) || [],
    permission_role: employeeData.permission_role || "",
    permission: employeeData.permission || [],
    user_Avatar: employeeData.user_Avatar || null,
    documents:
      employeeData.documents && employeeData.documents.length > 0
        ? employeeData.documents.map((doc) => ({
            _id: doc._id || "",
            name: doc.name || "",
            file: doc.url || "",
          }))
        : [{ name: "", file: null }],
    qualifications:
      Array.isArray(employeeData.qualifications) &&
      employeeData.qualifications.length > 0
        ? employeeData.qualifications.map((qual) => ({
            qualificationName: qual.qualificationName || "",
            universityBoard: qual.universityBoard || "",
            specialization: qual.specialization || "",
            certifications: qual.certifications || "",
            totalMarks: qual.totalMarks || "",
            passingYear: qual.year || "",
            percentageCgpa: qual.percentageCgpa || "",
          }))
        : [
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
    experiences:
      Array.isArray(employeeData.experiences) &&
      employeeData.experiences.length > 0
        ? employeeData.experiences.map((exp) => ({
            companyName: exp.companyName || "",
            designation: exp.designation || "",
            grade_Band_Level: exp.grade_Band_Level || "",
            previous_Positions: exp.previous_Positions || "",
            startDate: exp.startDate ? exp.startDate.substring(0, 10) : "",
            endDate: exp.endDate ? exp.endDate.substring(0, 10) : "",
          }))
        : [
            {
              companyName: "",
              designation: "",
              grade_Band_Level: "",
              previous_Positions: "",
              startDate: "",
              endDate: "",
            },
          ],
    // Additional fields
    total_Experience: employeeData.total_Experience || "",
    marital_Status: employeeData.marital_Status || "",
    nationality: employeeData.nationality || "",
    passport_Number: employeeData.passport_Number || "",
    emergency_Contact_Person: employeeData.emergency_Contact_Person || "",
    emergency_Contact_Number: employeeData.emergency_Contact_Number || "",
    emergency_Contact_Blood_Group:
      employeeData.emergency_Contact_Blood_Group || "",
    // languages_Known: employeeData.languages_Known || [],
    languages_Known: parsedLanguages,
    // allowances_Provided: employeeData.allowances_Provided || "",
    allowances_Provided: parsedAllowances,
    current_Base_Salary: employeeData.current_Base_Salary || "",
    pf_Details: employeeData.pf_Details || "",
    work_Mode: employeeData.work_Mode || "",
    esi_Details: employeeData.esi_Details || "",
    gratuity_Details: employeeData.gratuity_Details || "",
    medical_Insurance: employeeData.medical_Insurance || "",
    health_benefits: employeeData.health_benefits || "",
    other_Benefits: employeeData.other_Benefits || "",
    overtime_allowed: employeeData.overtime_allowed || "",
    overtime_hours: employeeData.overtime_hours || "",
    background_Verification_Status:
      employeeData.background_Verification_Status || "",
    police_Verification: employeeData.police_Verification || "",
    trainingStatus: employeeData.trainingStatus || "",
    complianceTrainingStatus: employeeData.complianceTrainingStatus || "",
    legal_Certifications: employeeData.legal_Certifications || "",
    org_Specific_IDs: employeeData.org_Specific_IDs || "",
    date_of_Resignation: employeeData.date_of_Resignation
      ? employeeData.date_of_Resignation.substring(0, 10)
      : "",
    reason_for_Leaving: employeeData.reason_for_Leaving || "",
    notice_Period_Served: employeeData.notice_Period_Served || "",
    exit_Interview_Feedback: employeeData.exit_Interview_Feedback || "",
    full_Final_Settlement: employeeData.full_Final_Settlement || "",
    relieving_Certificate_Date: employeeData.relieving_Certificate_Date
      ? employeeData.relieving_Certificate_Date.substring(0, 10)
      : "",
    linkedin_Profile_URL: employeeData.linkedin_Profile_URL || "",
    github_Portfolio_URL: employeeData.github_Portfolio_URL || "",
    disability_Status: employeeData.disability_Status || "",
  };
}
