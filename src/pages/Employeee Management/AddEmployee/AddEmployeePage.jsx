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
import axios from "axios";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";
import useEmployeeStore from "../../../store/useEmployeeStore.js";

import * as XLSX from "xlsx";
import FileSaver from "file-saver";

/**
 * Utility function to convert 0-based column index -> Excel column name (A, B, ..., Z, AA, AB, etc.)
 */



function toExcelColName(num) {
  let s = "";
  while (num >= 0) {
    s = String.fromCharCode((num % 26) + 65) + s;
    num = Math.floor(num / 26) - 1;
  }
  return s;
}



/*
 * 
 * 
 *    AddEmployeePage Component
 *  - Loads dropdown data from Zustand (departments, shift timings, etc.)
 *  - Has a direct axios POST call for bulk uploading the Excel file (not using the store).
 * 
 * 
 */

export default function AddEmployeePage() {
  // 1) Grab store data & actions for loading dropdowns
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

  // 2) On mount, load the store-based dropdown data
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

  // 3) Excel columns (the first row in the final sheet)
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

  // 4) Build arrays for each store-based dropdown
  const deptValues = departments.map((d) => d.label || d.value);
  const shiftValues = shiftTimings.map((s) => s.label || s.value);
  const empTypeValues = employmentTypes.map((e) => e.label || e.value);
  const breakTypeValues = breakRecords.map((b) => b.label || b.value);
  const roleValues = permissionRoles.map((pr) => pr.role_name || pr);
  const designValues = designations.map((des) => des.label || des.value);

  /**
   * Helper: add data validation to a specific column in the main sheet
   * referencing a column in the Lookups sheet
   */
  function addValidationFor(
    colKey,
    lookupsColIndex,
    dvArray,
    maxLen,
    numberOfDataRows
  ) {
    const colIndex = sheet1Columns.indexOf(colKey);
    if (colIndex < 0) return;
    const colLetter = toExcelColName(colIndex);
    const ref = `${colLetter}2:${colLetter}${1 + numberOfDataRows}`; // e.g. 'C2:C201'

    const lookupsLetter = toExcelColName(lookupsColIndex);
    const formulaStart = 2;
    const formulaEnd = 1 + maxLen;
    const formulae = [
      `Lookups!$${lookupsLetter}$$${formulaStart}:$${lookupsLetter}$$${formulaEnd}`,
    ];

    dvArray.push({
      ref,
      type: "list",
      allowBlank: true,
      showDropDown: true,
      formulae,
    });
  }

  // 5) Download Excel Template with data validations
  const handleDownloadTemplate = () => {
    try {
      // Main sheet with first row as headers
      const sheet1Data = [sheet1Columns];
      const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
      const numberOfDataRows = 200; // user can fill up to row 200

      // Build Lookups sheet
      const headerRowLookups = [
        "Departments",
        "Roles",
        "EmpTypes",
        "ShiftTimings",
        "BreakTypes",
        "Designations",
      ];
      const maxLen = Math.max(
        deptValues.length,
        roleValues.length,
        empTypeValues.length,
        shiftValues.length,
        breakTypeValues.length,
        designValues.length
      );

      const lookupsData = [headerRowLookups];
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

      // data validations
      const dvArray = [];
      addValidationFor(
        "departmentAllocated",
        0,
        dvArray,
        maxLen,
        numberOfDataRows
      );
      addValidationFor("permission_role", 1, dvArray, maxLen, numberOfDataRows);
      addValidationFor("employee_Type", 2, dvArray, maxLen, numberOfDataRows);
      addValidationFor("shift_Timing", 3, dvArray, maxLen, numberOfDataRows);
      addValidationFor("break_Type", 4, dvArray, maxLen, numberOfDataRows);
      addValidationFor("designation", 5, dvArray, maxLen, numberOfDataRows);

      ws1["!dataValidation"] = dvArray;

      // Build workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws1, "EmployeeData");
      XLSX.utils.book_append_sheet(wb, ws2, "Lookups");

      // Download
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

  // 6) Directly call an endpoint for bulk uploading
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
      // Build FormData with the selected Excel file
      const formData = new FormData();
      formData.append("excelFile", excelFile);

      // Retrieve the token (assuming stored in localStorage).
      // Adjust according to your actual token management strategy.
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/bulk/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include Bearer token
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Bulk upload successful!");
      } else {
        toast.error(response.data.message || "Bulk upload failed.");
      }
      console.log("Bulk upload response =>", response.data);
    } catch (error) {
      console.error("Error in bulk upload:", error);
      toast.error("Bulk upload error occurred.");
    } finally {
      setExcelFile(null);
    }
  };

  // 7) Single-employee creation callback
  const handleComplete = (finalResponse) => {
    toast.success("Employee Added Successfully!");
    console.log("Final createEmployee response =>", finalResponse);
  };

  return (
    <div className="bg-bg-primary p-4">
      {/* Tools for Bulk Upload */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Download Template */}
        <button
          onClick={handleDownloadTemplate}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Get Excel Template
        </button>

        {/* Upload from Excel: step A: choose file */}
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

        {/* step B: click to start bulk upload */}
        {excelFile && (
          <button
            onClick={handleBulkUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Bulk Upload
          </button>
        )}
      </div>

      {/* Single-Employee creation UI */}
      <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
    </div>
  );
}
