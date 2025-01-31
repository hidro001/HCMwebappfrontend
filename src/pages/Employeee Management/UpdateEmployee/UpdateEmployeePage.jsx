// import React from "react";
// import EmployeeFormTabs from "../../components/EmployeeFormTabs";
// import { toast } from "react-hot-toast";

// // Suppose your "existingEmployeeData" is fetched from an API or passed via props.
// // This is just an example.

// export default function UpdateEmployeePage({ existingEmployeeData }) {
//   const handleComplete = (finalResponse) => {
//     toast.success("Employee Updated Successfully!");
//     console.log("Final update response =>", finalResponse);
//     // Possibly navigate or reset
//   };

//   return (
//     <div className="bg-bg-primary">
//       <EmployeeFormTabs
//         formTitle="Update Employee"
//         defaultValues={existingEmployeeData}
//         onComplete={handleComplete}
//       />
//     </div>
//   );
// }

// src/pages/UpdateEmployeePage/index.jsx
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmployeeStore from "../../../store/useEmployeeStore.js.js";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/index";
import { toast } from "react-hot-toast";

export default function UpdateEmployeePage() {
  const { id: employeeId } = useParams(); // or pass as prop
  const { loadEmployeeById, selectedEmployee, loadingSelectedEmployee } =
    useEmployeeStore();
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    // fetch the employee data
    loadEmployeeById(employeeId);
  }, [employeeId, loadEmployeeById]);

  useEffect(() => {
    if (selectedEmployee) {
      // Convert the fetched data into the same shape your form expects
      const mappedValues = mapEmployeeToFormDefaults(selectedEmployee);
      setDefaultValues(mappedValues);
    }
  }, [selectedEmployee]);

  const handleComplete = (finalResponse) => {
    toast.success("Employee updated successfully!");
    // Possibly navigate or do something else
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
        defaultValues={defaultValues} // prefill the form
        onComplete={handleComplete}
        employeeId={employeeId} // let the form know we are editing
      />
    </div>
  );
}

/**
 * Convert the old employeeData shape into your new form's expected shape.
 * This is basically replicating your old `initialValues` logic
 */
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
    date_of_Joining: employeeData.date_of_Joining
      ? employeeData.date_of_Joining.substring(0, 10)
      : "",
    dob: employeeData.dob ? employeeData.dob.substring(0, 10) : "",
    salary: employeeData.salary || "",
    latitude: employeeData.latitude || "",
    longitude: employeeData.longitude || "",
    shift_Timing: employeeData.shift_Timing || "",
    permanent_Address: employeeData.permanent_Address || "",
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
            file: null, // We'll let them re-upload if needed
          }))
        : [{ name: "", file: null }],

    qualifications:
      Array.isArray(employeeData.qualifications) &&
      employeeData.qualifications.length > 0
        ? employeeData.qualifications.map((qual) => ({
            qualificationName: qual.qualificationName || "",
            universityBoard: qual.universityBoard || "",
            totalMarks: qual.totalMarks || "",
            passingYear: qual.year || "",
            percentageCgpa: qual.percentageCgpa || "",
          }))
        : [
            {
              qualificationName: "",
              universityBoard: "",
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
            totalExperience: exp.totalExperience || "",
            startDate: exp.startDate?.substring(0, 10) || "",
            endDate: exp.endDate?.substring(0, 10) || "",
          }))
        : [
            {
              companyName: "",
              designation: "",
              totalExperience: "",
              startDate: "",
              endDate: "",
            },
          ],
  };
}
