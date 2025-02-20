import React from "react";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/EmployeeFormTabs/EmployeeFormTabs";

export default function AddEmployeePage() {
  const handleComplete = (finalResponse) => {
    toast.success("Employee Added Successfully!");
    console.log("Final createEmployee response =>", finalResponse);
  };

  return (
    <div className="bg-bg-primary">
      <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
    </div>
  );
}
