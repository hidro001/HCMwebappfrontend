// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useEmployeeStore from "../../../store/useEmployeeStore.js.js";
// import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs.jsx";
// import { toast } from "react-hot-toast";

// export default function UpdateEmployeePage() {
//   const { id: employeeId } = useParams();
//   const { loadEmployeeById, selectedEmployee, loadingSelectedEmployee } =
//     useEmployeeStore();
//   const [defaultValues, setDefaultValues] = useState(null);

//   useEffect(() => {
//     loadEmployeeById(employeeId);
//   }, [employeeId, loadEmployeeById]);

//   useEffect(() => {
//     if (selectedEmployee) {
//       const mappedValues = mapEmployeeToFormDefaults(selectedEmployee);
//       setDefaultValues(mappedValues);
//     }
//   }, [selectedEmployee]);

//   const handleComplete = (finalResponse) => {
//     toast.success("Employee updated successfully!");
//   };

//   if (loadingSelectedEmployee) {
//     return <div>Loading existing employee...</div>;
//   }
//   if (!defaultValues) {
//     return <div>No employee data to update</div>;
//   }

//   return (
//     <div className="bg-bg-primary">
//       <EmployeeFormTabs
//         formTitle="Update Employee"
//         defaultValues={defaultValues}
//         onComplete={handleComplete}
//         employeeId={employeeId}
//       />
//     </div>
//   );
// }

// function mapEmployeeToFormDefaults(employeeData) {
//   return {
//     first_Name: employeeData.first_Name || "",
//     last_Name: employeeData.last_Name || "",
//     designation: employeeData.designation || "",
//     employee_Type: employeeData.employee_Type || "",
//     no_of_Paid_Leave: employeeData.no_of_Paid_Leave || 0,
//     employee_Id: employeeData.employee_Id || "",
//     mobile_No: employeeData.mobile_No || "",
//     personal_Email_Id: employeeData.personal_Email_Id || "",
//     working_Email_Id: employeeData.working_Email_Id || "",
//     gender: employeeData.gender || "",
//     date_of_Joining: employeeData.date_of_Joining
//       ? employeeData.date_of_Joining.substring(0, 10)
//       : "",
//     dob: employeeData.dob ? employeeData.dob.substring(0, 10) : "",
//     salary: employeeData.salary || "",
//     latitude: employeeData.latitude || "",
//     longitude: employeeData.longitude || "",
//     shift_Timing: employeeData.shift_Timing || "",
//     permanent_Address: employeeData.user_Address || "",
//     officeLocation: employeeData.office_address || "",
//     otp: employeeData.otp || "no",
//     pan_No: employeeData.pan_No || "",
//     adhaar_Number: employeeData.adhaar_Number || "",
//     bank_Holder_Name: employeeData.bank_Holder_Name || "",
//     bank_Name: employeeData.bank_Name || "",
//     bank_Account_No: employeeData.bank_Account_No || "",
//     ifsc_Code: employeeData.ifsc_Code || "",
//     assigned_to: employeeData.assigned_to?.map((mgr) => mgr._id) || [],
//     permission_role: employeeData.permission_role || "",
//     permission: employeeData.permission || [],
//     user_Avatar: employeeData.user_Avatar || null,
//     documents:
//       employeeData.documents && employeeData.documents.length > 0
//         ? employeeData.documents.map((doc) => ({
//             name: doc.name || "",
//             file: null,
//           }))
//         : [{ name: "", file: null }],
//     qualifications:
//       Array.isArray(employeeData.qualifications) &&
//       employeeData.qualifications.length > 0
//         ? employeeData.qualifications.map((qual) => ({
//             qualificationName: qual.qualificationName || "",
//             universityBoard: qual.universityBoard || "",
//             specialization: qual.specialization || "",
//             certifications: qual.certifications || "",
//             totalMarks: qual.totalMarks || "",
//             passingYear: qual.year || "",
//             percentageCgpa: qual.percentageCgpa || "",
//           }))
//         : [
//             {
//               qualificationName: "",
//               universityBoard: "",
//               specialization: "",
//               certifications: "",
//               totalMarks: "",
//               passingYear: "",
//               percentageCgpa: "",
//             },
//           ],
//     experiences:
//       Array.isArray(employeeData.experiences) &&
//       employeeData.experiences.length > 0
//         ? employeeData.experiences.map((exp) => ({
//             companyName: exp.companyName || "",
//             designation: exp.designation || "",
//             grade_Band_Level: exp.grade_Band_Level || "",
//             previous_Positions: exp.previous_Positions || "",
//             totalExperience: exp.totalExperience || "",
//             startDate: exp.startDate?.substring(0, 10) || "",
//             endDate: exp.endDate?.substring(0, 10) || "",
//           }))
//         : [
//             {
//               companyName: "",
//               designation: "",
//               grade_Band_Level: "",
//               previous_Positions: "",
//               totalExperience: "",
//               startDate: "",
//               endDate: "",
//             },
//           ],
//     // Additional Info fields:
//     marital_Status: employeeData.marital_Status || "",
//     nationality: employeeData.nationality || "",
//     passport_Number: employeeData.passport_Number || "",
//     emergency_Contact_Person: employeeData.emergency_Contact_Person || "",
//     emergency_Contact_Number: employeeData.emergency_Contact_Number || "",
//     emergency_Contact_Blood_Group:
//       employeeData.emergency_Contact_Blood_Group || "",
//     languages_Known: employeeData.languages_Known || [],
//     current_Base_Salary: employeeData.current_Base_Salary || "",
//     pf_Details: employeeData.pf_Details || "",
//     esi_Details: employeeData.esi_Details || "",
//     gratuity_Details: employeeData.gratuity_Details || "",
//     medical_Insurance: employeeData.medical_Insurance || "",
//     other_Benefits: employeeData.other_Benefits || "",
//     overtime_allowed: employeeData.overtime_allowed || "",
//     background_Verification_Status:
//       employeeData.background_Verification_Status || "",
//     police_Verification: employeeData.police_Verification || "",
//     legal_Certifications: employeeData.legal_Certifications || "",
//     org_Specific_IDs: employeeData.org_Specific_IDs || "",
//     date_of_Resignation: employeeData.date_of_Resignation
//       ? employeeData.date_of_Resignation.substring(0, 10)
//       : "",
//     reason_for_Leaving: employeeData.reason_for_Leaving || "",
//     notice_Period_Served: employeeData.notice_Period_Served || "",
//     exit_Interview_Feedback: employeeData.exit_Interview_Feedback || "",
//     full_Final_Settlement: employeeData.full_Final_Settlement || "",
//     relieving_Certificate_Date: employeeData.relieving_Certificate_Date
//       ? employeeData.relieving_Certificate_Date.substring(0, 10)
//       : "",
//     // New fields for networking and sensitivity:
//     linkedin_Profile_URL: employeeData.linkedin_Profile_URL || "",
//     github_Portfolio_URL: employeeData.github_Portfolio_URL || "",
//     disability_Status: employeeData.disability_Status || "",
//   };
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmployeeStore from "../../../store/useEmployeeStore.js";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";

export default function UpdateEmployeePage() {
  const { id: employeeId } = useParams();
  const { loadEmployeeById, selectedEmployee, loadingSelectedEmployee } = useEmployeeStore();
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    loadEmployeeById(employeeId);
  }, [employeeId, loadEmployeeById]);

  useEffect(() => {
    if (selectedEmployee) {
      const mappedValues = mapEmployeeToFormDefaults(selectedEmployee);
      setDefaultValues(mappedValues);
    }
  }, [selectedEmployee]);

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
  return {
    first_Name: employeeData.first_Name || "",
    last_Name: employeeData.last_Name || "",
    designation: employeeData.designation || "",
    employee_Type: employeeData.employee_Type || "",
    no_of_Paid_Leave: employeeData.no_of_Paid_Leave || 0,
    employee_Id: employeeData.employee_Id || "",
    mobile_No: employeeData.mobile_No || "",
    personal_Email_Id: employeeData.personal_Email_Id || "",
    working_Email_Id: employeeData.working_Email_Id || "",
    gender: employeeData.gender || "",
    date_of_Joining: employeeData.date_of_Joining ? employeeData.date_of_Joining.substring(0, 10) : "",
    dob: employeeData.dob ? employeeData.dob.substring(0, 10) : "",
    salary: employeeData.salary || "",
    latitude: employeeData.latitude || "",
    longitude: employeeData.longitude || "",
    shift_Timing: employeeData.shift_Timing || "",
    // Notice: The frontend field permanent_Address maps to backend's user_Address
    permanent_Address: employeeData.user_Address || "",
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
            name: doc.name || "",
            file: null,
          }))
        : [{ name: "", file: null }],
    qualifications: Array.isArray(employeeData.qualifications) && employeeData.qualifications.length > 0
      ? employeeData.qualifications.map((qual) => ({
          qualificationName: qual.qualificationName || "",
          universityBoard: qual.universityBoard || "",
          specialization: qual.specialization || "",
          certifications: qual.certifications || "",
          totalMarks: qual.totalMarks || "",
          passingYear: qual.year || "",
          percentageCgpa: qual.percentageCgpa || "",
        }))
      : [{
          qualificationName: "",
          universityBoard: "",
          specialization: "",
          certifications: "",
          totalMarks: "",
          passingYear: "",
          percentageCgpa: "",
        }],
    experiences: Array.isArray(employeeData.experiences) && employeeData.experiences.length > 0
      ? employeeData.experiences.map((exp) => ({
          companyName: exp.companyName || "",
          designation: exp.designation || "",
          grade_Band_Level: exp.grade_Band_Level || "",
          previous_Positions: exp.previous_Positions || "",
          totalExperience: exp.totalExperience || "",
          startDate: exp.startDate ? exp.startDate.substring(0, 10) : "",
          endDate: exp.endDate ? exp.endDate.substring(0, 10) : "",
        }))
      : [{
          companyName: "",
          designation: "",
          grade_Band_Level: "",
          previous_Positions: "",
          totalExperience: "",
          startDate: "",
          endDate: "",
        }],
    // Additional fields
    marital_Status: employeeData.marital_Status || "",
    nationality: employeeData.nationality || "",
    passport_Number: employeeData.passport_Number || "",
    emergency_Contact_Person: employeeData.emergency_Contact_Person || "",
    emergency_Contact_Number: employeeData.emergency_Contact_Number || "",
    emergency_Contact_Blood_Group: employeeData.emergency_Contact_Blood_Group || "",
    languages_Known: employeeData.languages_Known || [],
    current_Base_Salary: employeeData.current_Base_Salary || "",
    pf_Details: employeeData.pf_Details || "",
    esi_Details: employeeData.esi_Details || "",
    gratuity_Details: employeeData.gratuity_Details || "",
    medical_Insurance: employeeData.medical_Insurance || "",
    other_Benefits: employeeData.other_Benefits || "",
    overtime_allowed: employeeData.overtime_allowed || "",
    background_Verification_Status: employeeData.background_Verification_Status || "",
    police_Verification: employeeData.police_Verification || "",
    legal_Certifications: employeeData.legal_Certifications || "",
    org_Specific_IDs: employeeData.org_Specific_IDs || "",
    date_of_Resignation: employeeData.date_of_Resignation ? employeeData.date_of_Resignation.substring(0, 10) : "",
    reason_for_Leaving: employeeData.reason_for_Leaving || "",
    notice_Period_Served: employeeData.notice_Period_Served || "",
    exit_Interview_Feedback: employeeData.exit_Interview_Feedback || "",
    full_Final_Settlement: employeeData.full_Final_Settlement || "",
    relieving_Certificate_Date: employeeData.relieving_Certificate_Date ? employeeData.relieving_Certificate_Date.substring(0, 10) : "",
    linkedin_Profile_URL: employeeData.linkedin_Profile_URL || "",
    github_Portfolio_URL: employeeData.github_Portfolio_URL || "",
    disability_Status: employeeData.disability_Status || "",
  };
}

