

// import React from "react";
// import EmployeeFormTabs from "./EmployeeFormTabs";

// export default function AddEmployeePage() {
//   const handleComplete = (finalDataFromAllTabs) => {
//     console.log("Adding new employee with data:", finalDataFromAllTabs);
//   };

//   return (
//     <EmployeeFormTabs
//       formTitle="Add Employee"
//       defaultValues={{}}  // since there's no existing data
//       onComplete={handleComplete}
//     />
//   );
// }

// src/pages/AddEmployeePage.jsx
import React from "react";
import EmployeeFormTabs from "./EmployeeFormTabs";
import { toast } from "react-hot-toast";

export default function AddEmployeePage() {
  const handleComplete = (finalResponse) => {
    // This runs after final form submission is successful
    toast.success("Employee Added Successfully!");
    console.log("Final createEmployee response =>", finalResponse);
    // Possibly navigate or reset
  };

  return (
    <div className=" bg-bg-primary">
      <EmployeeFormTabs formTitle="Add Employee" onComplete={handleComplete} />
    </div>
  );
}

