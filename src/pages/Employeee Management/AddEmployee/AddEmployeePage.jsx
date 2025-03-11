// import React from "react";
// import { toast } from "react-hot-toast";
// import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";

// export default function AddEmployeePage() {
//   const handleComplete = (finalResponse) => {
//     toast.success("Employee Added Successfully!");
//     console.log("Final createEmployee response =>", finalResponse);
//   };

//   return (
//     <div className="bg-bg-primary">
//       <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";
import useEmployeeStore from "../../../store/useEmployeeStore.js";

import * as XLSX from "xlsx";
import FileSaver from "file-saver";

/**
 * Convert 0-based index -> Excel column name. E.g. 0->'A', 25->'Z', 26->'AA'
 */
function toExcelColName(num) {
  let s = "";
  while (num >= 0) {
    s = String.fromCharCode((num % 26) + 65) + s;
    num = Math.floor(num / 26) - 1;
  }
  return s;
}

export default function AddEmployeePage() {
  const {
    departments,
    shiftTimings,
    employmentTypes,
    breakRecords,
    permissionRoles,
    designations,
    loadDepartments,
    loadShiftTimings,
    loadEmploymentTypes,
    loadBreakRecords,
    loadPermissionRoles,
    loadDesignations,
  } = useEmployeeStore();

  // Load your store data on mount
  useEffect(() => {
    loadDepartments();
    loadShiftTimings();
    loadEmploymentTypes();
    loadBreakRecords();
    loadPermissionRoles();
    loadDesignations();
  }, [
    loadDepartments,
    loadShiftTimings,
    loadEmploymentTypes,
    loadBreakRecords,
    loadPermissionRoles,
    loadDesignations,
  ]);

  // -------------------------------------------------------------------------
  // 1) Define ALL columns from your multi-step form in one array for Sheet1
  // -------------------------------------------------------------------------
  // For brevity, let's label them in a user-friendly manner.
  // The first row (headers) are the keys your code expects, or short labels.
  // These EXACT keys/labels are how you'll parse them on bulk upload side.
  const sheet1Columns = [
    "employee_Id",
    "first_Name",
    "last_Name",
    "gender",
    "mobile_No",
    "personal_Email_Id",
    "dob",
    "permanent_Address",
    "current_Address",
    "working_Email_Id",
    "date_of_Joining",
    "date_of_Conformation",
    "departmentAllocated", // dropdown
    "permission_role", // dropdown
    "assigned_to",
    "designation", // dropdown
    "work_Mode",
    "salary",
    "current_Base_Salary",
    "otp",
    "no_of_Paid_Leave",
    "employee_Type", // dropdown
    "office_address",
    "latitude",
    "longitude",
    "shift_Timing", // dropdown
    "break_Type", // dropdown
    "allowances_Provided",
    "overtime_allowed",
    "overtime_hours",
    "pan_No",
    "adhaar_Number",
    "bank_Holder_Name",
    "bank_Name",
    "bank_Account_No",
    "ifsc_Code",
    "pf_Details",
    "esi_Details",
    "marital_Status",
    "nationality",
    "passport_Number",
    "emergency_Contact_Person",
    "emergency_Contact_Number",
    "emergency_Contact_Blood_Group",
    "languages_Known",
    "gratuity_Details",
    "health_benefits",
    "medical_Insurance",
    "other_Benefits",
    "background_Verification_Status",
    "police_Verification",
    "trainingStatus",
    "complianceTrainingStatus",
    "legal_Certifications",
    "org_Specific_IDs",
    "date_of_Resignation",
    "reason_for_Leaving",
    "notice_Period_Served",
    "exit_Interview_Feedback",
    "full_Final_Settlement",
    "relieving_Certificate_Date",
    "linkedin_Profile_URL",
    "github_Portfolio_URL",
    "disability_Status",
    "total_Experience",
  ];

  // -------------------------------------------------------------------------
  // 2) Gather your dropdown-based fields from store data
  //    Convert to string arrays for the Lookups sheet
  // -------------------------------------------------------------------------
  const deptValues = departments.map((d) => d.label || d.value);
  const shiftValues = shiftTimings.map((s) => s.label || s.value);
  const empTypeValues = employmentTypes.map((e) => e.label || e.value);
  const breakTypeValues = breakRecords.map((b) => b.label || b.value);
  const roleValues = permissionRoles.map((pr) => pr.role_name || pr);
  const designValues = designations.map((des) => des.label || des.value);

  // If you have other dropdown fields like `marital_Status`, `gender` from an enum,
  // you can create arrays in code, e.g.:
  // const genderValues = ["Male", "Female", "Other"];
  // etc. But for now, we show the store-based ones.

  // We'll put each set in its own column in the "Lookups" sheet.
  // The user can fill the rest of fields as normal text.

  // 3) The main function that creates & downloads the Excel template
  const handleDownloadTemplate = () => {
    try {
      // 3A) Make a 2D array for the first sheet with one row of headers
      const sheet1Data = [sheet1Columns];
      const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

      // We assume up to 200 data rows
      const numberOfDataRows = 200;

      // 3B) Build the Lookups sheet
      // We'll do columns in this order:
      //   A => Departments
      //   B => Roles
      //   C => EmployeeTypes
      //   D => ShiftTimings
      //   E => BreakTypes
      //   F => Designations
      // This must match the columns we want to reference in the validations.

      const headerRowLookups = [
        "Departments",
        "Roles",
        "EmpTypes",
        "ShiftTimings",
        "BreakTypes",
        "Designations",
      ];
      // figure out the maximum length among these arrays
      const maxLen = Math.max(
        deptValues.length,
        roleValues.length,
        empTypeValues.length,
        shiftValues.length,
        breakTypeValues.length,
        designValues.length
      );
      const lookupsData = [];
      // first row
      lookupsData.push(headerRowLookups);
      // subsequent rows
      for (let i = 0; i < maxLen; i++) {
        lookupsData.push([
          deptValues[i] || "",
          roleValues[i] || "",
          empTypeValues[i] || "",
          shiftValues[i] || "",
          breakTypeValues[i] || "",
          designValues[i] || "",
        ]);
      }
      const ws2 = XLSX.utils.aoa_to_sheet(lookupsData);

      // 3C) Build data validations for each relevant column in sheet1
      const dvArray = [];

      function addValidationFor(colKey, lookupsColIndex) {
        // e.g. colKey = 'departmentAllocated',
        // lookupsColIndex= 0 => 'Departments' are in column A of Lookups
        const colIndex = sheet1Columns.indexOf(colKey);
        if (colIndex < 0) return; // not found
        const colLetter = toExcelColName(colIndex); // e.g. 2 -> 'C'
        const ref = `${colLetter}2:${colLetter}${1 + numberOfDataRows}`;

        // For the Lookups sheet, if lookupsColIndex=0 => 'A', 1 => 'B', etc.
        const lookupsLetter = toExcelColName(lookupsColIndex);
        // data starts row2..(1+maxLen)
        const formulaStart = 2;
        const formulaEnd = 1 + maxLen;
        const formulae = [
          `Lookups!$${lookupsLetter}$${formulaStart}:$${lookupsLetter}$${formulaEnd}`,
        ];

        dvArray.push({
          ref,
          type: "list",
          allowBlank: true,
          showDropDown: true,
          formulae,
        });
      }

      // Now define validations for each dropdown
      addValidationFor("departmentAllocated", 0);
      addValidationFor("permission_role", 1);
      addValidationFor("employee_Type", 2);
      addValidationFor("shift_Timing", 3);
      addValidationFor("break_Type", 4);
      addValidationFor("designation", 5);

      ws1["!dataValidation"] = dvArray;

      // 3D) Build workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws1, "EmployeeData");
      XLSX.utils.book_append_sheet(wb, ws2, "Lookups");

      // 3E) Generate the .xlsx file & download
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, "AllEmployeeFields_Template.xlsx");

      toast.success("Excel template downloaded!");
    } catch (err) {
      console.error("Error generating template:", err);
      toast.error("Failed to generate template.");
    }
  };

  // 4) Handling the file selection & 2-step upload
  const [excelFile, setExcelFile] = useState(null);

  const handleSelectExcelFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleBulkUpload = async () => {
    if (!excelFile) {
      toast.error("Please select an Excel file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("excelFile", excelFile);

      // Example fetch to your bulk upload endpoint
      const res = await fetch("/api/employees/bulk-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Bulk upload successful!");
      } else {
        toast.error(data.message || "Bulk upload failed.");
      }
      console.log("Bulk upload response =>", data);
    } catch (error) {
      console.error("Error in bulk upload:", error);
      toast.error("Bulk upload error occurred.");
    } finally {
      setExcelFile(null);
    }
  };

  // 5) Single-employee creation callback
  const handleComplete = (finalResponse) => {
    toast.success("Employee Added Successfully!");
    console.log("Final createEmployee response =>", finalResponse);
  };

  return (
    <div className="bg-bg-primary p-4">
      {/* Bulk actions row */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Download Excel template (with all fields & lookups) */}
        <button
          onClick={handleDownloadTemplate}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Get Excel Template
        </button>

        {/* Upload from Excel (select file, then start) */}
        <label
          htmlFor="excel-input"
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 cursor-pointer"
        >
          Upload from Excel
        </label>
        <input
          id="excel-input"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleSelectExcelFile}
          style={{ display: "none" }}
        />

        {excelFile && (
          <button
            onClick={handleBulkUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Bulk Upload
          </button>
        )}
      </div>

      {/* Single-employee creation form */}
      <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
    </div>
  );
}
