import React from "react";
import { toast } from "react-hot-toast";
import EmployeeFormTabs from "../../../components/Employeee Management/add employee manager/EmployeeFormTabs";

export default function AddEmployeeManagerPage() {
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