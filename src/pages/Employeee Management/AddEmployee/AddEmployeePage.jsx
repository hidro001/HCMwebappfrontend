import React from "react";
import { toast } from "react-hot-toast";

import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/index";

export default function AddEmployeePage() {
  const handleComplete = (finalResponse) => {
    // Runs after final form submission is successful
    toast.success("Employee Added Successfully!");
    console.log("Final createEmployee response =>", finalResponse);
    // Possibly navigate or reset
  };

  return (
    <div className="bg-bg-primary">
      <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
    </div>
  );
}
