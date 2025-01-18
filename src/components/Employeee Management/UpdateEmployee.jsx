import React from "react";
import EmployeeFormTabs from "./EmployeeFormTabs";

export default function UpdateEmployeePage({ existingEmployeeData }) {
  const handleComplete = (updatedData) => {
    console.log("Updating employee with data:", updatedData);
    // call your update API here, e.g.:
    // await api.updateEmployee(existingEmployeeData.id, updatedData);
  };

  return (
    <EmployeeFormTabs
      formTitle="Update Employee"
      defaultValues={existingEmployeeData}
      onComplete={handleComplete}
    />
  );
}
