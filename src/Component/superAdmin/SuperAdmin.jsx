// import { useState } from "react";

// const SuperAdmin = () => {
//   const [departments, setDepartments] = useState([]);
//   const [totalEmployees, setTotalEmployees] = useState(0);
//   const [totalVacancies, setTotalVacancies] = useState(0);

//   const roles = {
//     Admin: ["View Reports", "Edit Data", "Manage Employees"],
//     Manager: ["View Reports", "Manage Employees"],
//     Employee: ["View Profile", "Request Leave"],
//   };

//   const validateTotalEmployees = () => {
//     const currentTotal = departments.reduce(
//       (sum, dept) => sum + dept.totalEmployees,
//       0
//     );

//     if (currentTotal > totalEmployees) {
//       alert(
//         "Total employees in departments exceed total employees in the organization."
//       );
//       setTotalEmployees(currentTotal);
//     }
//     updateTotalVacancies();
//   };

//   const addDepartment = () => {
//     const departmentName = prompt("Enter department name:");
//     if (departmentName) {
//       const newDepartment = {
//         name: departmentName,
//         totalEmployees: 0,
//         designations: [],
//       };
//       setDepartments([...departments, newDepartment]);
//     }
//   };

//   const deleteDepartment = (index) => {
//     const updatedDepartments = departments.filter((_, i) => i !== index);
//     setDepartments(updatedDepartments);
//   };

//   const addDesignation = (departmentIndex) => {
//     const designationName = prompt("Enter designation name:");
//     const numberOfPositions =
//       parseInt(prompt("Enter number of positions:")) || 0;

//     const department = departments[departmentIndex];
//     const currentDeptTotal = department.designations.reduce(
//       (sum, desig) => sum + desig.positions,
//       0
//     );

//     if (currentDeptTotal + numberOfPositions > department.totalEmployees) {
//       alert(
//         "Total number of designations exceeds total employees in the department."
//       );
//       return;
//     }

//     if (designationName && numberOfPositions) {
//       const newDesignation = {
//         name: designationName,
//         positions: numberOfPositions,
//         filled: 0,
//         employees: [],
//       };
//       const updatedDepartments = [...departments];
//       updatedDepartments[departmentIndex].designations.push(newDesignation);
//       setDepartments(updatedDepartments);
//     }
//   };

//   const deleteDesignation = (departmentIndex, designationIndex) => {
//     const updatedDepartments = [...departments];
//     updatedDepartments[departmentIndex].designations.splice(
//       designationIndex,
//       1
//     );
//     setDepartments(updatedDepartments);
//   };

//   const updateDepartmentTotal = (departmentIndex, value) => {
//     const department = departments[departmentIndex];
//     const newTotalEmployees = parseInt(value) || 0;

//     const currentOrgTotal = departments.reduce((sum, dept, idx) => {
//       return sum + (idx === departmentIndex ? 0 : dept.totalEmployees);
//     }, 0);

//     const newTotal = currentOrgTotal + newTotalEmployees;

//     if (newTotal > totalEmployees) {
//       alert(
//         "Total employees in departments exceed total employees in the organization."
//       );
//       return;
//     }

//     const updatedDepartments = [...departments];
//     updatedDepartments[departmentIndex].totalEmployees = newTotalEmployees;
//     setDepartments(updatedDepartments);
//     updateTotalVacancies();
//   };

//   const addEmployee = (departmentIndex, designationIndex) => {
//     const employeeName = prompt("Enter employee name:");
//     const role = prompt("Enter role (Admin, Manager, Employee):");
//     if (!roles[role]) {
//       alert(
//         "Invalid role. Please enter a valid role (Admin, Manager, Employee)."
//       );
//       return;
//     }

//     if (employeeName) {
//       const designation =
//         departments[departmentIndex].designations[designationIndex];
//       if (designation.filled < designation.positions) {
//         const newEmployee = {
//           name: employeeName,
//           role: role,
//           permissions: [...roles[role]],
//         };
//         const updatedDepartments = [...departments];
//         updatedDepartments[departmentIndex].designations[
//           designationIndex
//         ].employees.push(newEmployee);
//         updatedDepartments[departmentIndex].designations[designationIndex]
//           .filled++;
//         setDepartments(updatedDepartments);
//       } else {
//         alert("No vacancies available in this designation.");
//       }
//     }
//   };

//   const updatePermissions = (
//     departmentIndex,
//     designationIndex,
//     employeeIndex,
//     action,
//     permission
//   ) => {
//     const updatedDepartments = [...departments];
//     const employee =
//       updatedDepartments[departmentIndex].designations[designationIndex]
//         .employees[employeeIndex];
//     if (action === "add" && !employee.permissions.includes(permission)) {
//       employee.permissions.push(permission);
//     } else if (action === "remove") {
//       const permissionIndex = employee.permissions.indexOf(permission);
//       if (permissionIndex !== -1) {
//         employee.permissions.splice(permissionIndex, 1);
//       }
//     }
//     setDepartments(updatedDepartments);
//   };

//   const updateTotalVacancies = () => {
//     const currentFilledPositions = departments.reduce((sum, dept) => {
//       return (
//         sum +
//         dept.designations.reduce(
//           (desigSum, desig) => desigSum + desig.filled,
//           0
//         )
//       );
//     }, 0);
//     setTotalVacancies(totalEmployees - currentFilledPositions);
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//           background-color: #f4f4f4;
//         }

//         #app {
//           max-width: 800px;
//           margin: 0 auto;
//           background: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }

//         h1 {
//           margin-top: 0;
//         }

//         #departments {
//           margin-top: 20px;
//         }

//         button {
//           margin-top: 10px;
//         }

//         ul {
//           list-style: none;
//           padding: 0;
//         }

//         li {
//           background: #f9f9f9;
//           margin: 5px 0;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//         }

//         input[type="number"] {
//           width: 50px;
//           padding: 5px;
//           margin: 5px 0;
//         }

//         form {
//           margin-top: 10px;
//         }

//         label {
//           display: block;
//           margin-top: 5px;
//         }

//         input[type="text"],
//         input[type="number"] {
//           width: calc(100% - 22px);
//           padding: 5px;
//         }
//       `}</style>
//       <div id="app">
//         <h1>Employee Management System</h1>
//         <div>
//           <label htmlFor="totalEmployees">Total Employees:</label>
//           <input
//             type="number"
//             id="totalEmployees"
//             value={totalEmployees}
//             onChange={(e) => {
//               setTotalEmployees(parseInt(e.target.value) || 0);
//               validateTotalEmployees();
//             }}
//           />
//         </div>
//         <div>
//           <label>Total Vacancies:</label>
//           <span id="totalVacancies">{totalVacancies}</span>
//         </div>
//         <div id="departments">
//           <h2>Departments</h2>
//           <button onClick={addDepartment}>Add Department</button>
//           <ul id="departmentList">
//             {departments.map((department, deptIndex) => (
//               <li key={deptIndex}>
//                 <strong>{department.name}</strong>
//                 <input
//                   type="number"
//                   value={department.totalEmployees}
//                   onChange={(e) =>
//                     updateDepartmentTotal(deptIndex, e.target.value)
//                   }
//                 />
//                 <span>
//                   Vacancies:
//                   {department.totalEmployees -
//                     department.designations.reduce(
//                       (sum, desig) => sum + desig.filled,
//                       0
//                     )}
//                 </span>
//                 <button onClick={() => deleteDepartment(deptIndex)}>
//                   Delete Department
//                 </button>
//                 <button onClick={() => addDesignation(deptIndex)}>
//                   Add Designation
//                 </button>
//                 <ul>
//                   {department.designations.map((designation, desigIndex) => (
//                     <li key={desigIndex}>
//                       {designation.name} - Positions: {designation.positions},
//                       Filled: {designation.filled}, Vacancies:
//                       {designation.positions - designation.filled}
//                       <button
//                         onClick={() => deleteDesignation(deptIndex, desigIndex)}
//                       >
//                         Delete Designation
//                       </button>
//                       <form
//                         onSubmit={(e) => {
//                           e.preventDefault();
//                           addEmployee(deptIndex, desigIndex);
//                         }}
//                       >
//                         <label htmlFor="employeeName">Add Employee:</label>
//                         <input type="text" id="employeeName" required />
//                         <button type="submit">Add</button>
//                       </form>
//                       <ul>
//                         {designation.employees.map((employee, empIndex) => (
//                           <li key={empIndex}>
//                             {employee.name} ({employee.role}) - Permissions:
//                             {employee.permissions.join(", ")}
//                             <button
//                               onClick={() =>
//                                 updatePermissions(
//                                   deptIndex,
//                                   desigIndex,
//                                   empIndex,
//                                   "add",
//                                   prompt("Enter permission to add:")
//                                 )
//                               }
//                             >
//                               +
//                             </button>
//                             <button
//                               onClick={() =>
//                                 updatePermissions(
//                                   deptIndex,
//                                   desigIndex,
//                                   empIndex,
//                                   "remove",
//                                   prompt("Enter permission to remove:")
//                                 )
//                               }
//                             >
//                               -
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SuperAdmin;

// import { useState } from "react";

// const SuperAdmin = () => {
//   const [initialEmployeeCount, setInitialEmployeeCount] = useState(0);
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [totalBudget, setTotalBudget] = useState(0);
//   const [remainingBudget, setRemainingBudget] = useState(0);
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   const handleEmployeeCountChange = (e) => {
//     const newCount = Number(e.target.value);
//     setInitialEmployeeCount(newCount);
//     setEmployeeCount(newCount);
//   };

//   const handleBudgetChange = (e) => {
//     const newBudget = Number(e.target.value);
//     setTotalBudget(newBudget);
//     setRemainingBudget(newBudget);
//   };

//   const handleAddDepartment = () => {
//     setDepartments((prevDepartments) => [
//       ...prevDepartments,
//       { name: "", employeeCount: 0, employees: [], budget: 0, vacancies: 0 },
//     ]);
//   };

//   const handleDepartmentNameChange = (index, name) => {
//     const updatedDepartments = [...departments];
//     updatedDepartments[index].name = name;
//     setDepartments(updatedDepartments);
//   };

//   const handleDepartmentBudgetChange = (index, budget) => {
//     const updatedDepartments = [...departments];
//     const budgetDiff = budget - updatedDepartments[index].budget;
//     if (remainingBudget >= budgetDiff) {
//       updatedDepartments[index].budget = budget;
//       setDepartments(updatedDepartments);
//       setRemainingBudget((prevBudget) => prevBudget - budgetDiff);
//     } else {
//       alert("Not enough budget available to allocate to this department.");
//     }
//   };

//   const handleDepartmentEmployeeCountChange = (index, count) => {
//     const updatedDepartments = [...departments];
//     const employeeDiff = count - updatedDepartments[index].employeeCount;
//     updatedDepartments[index].employeeCount = count;
//     setDepartments(updatedDepartments);
//     setEmployeeCount((prevCount) => prevCount - employeeDiff);
//   };

//   const handleAddEmployeeToDepartment = (index, vacancies) => {
//     const updatedDepartments = [...departments];
//     if (employeeCount >= vacancies) {
//       updatedDepartments[index].employees.push({ name: "", vacancies });
//       updatedDepartments[index].employeeCount += vacancies;
//       setDepartments(updatedDepartments);
//       setEmployeeCount((prevCount) => prevCount - vacancies);
//     }
//   };

//   const handleAddEmployee = (vacancies) => {
//     if (employeeCount >= vacancies) {
//       setEmployees([...employees, { name: "", vacancies }]);
//       setEmployeeCount((prevCount) => prevCount - vacancies);
//     }
//   };

//   const handleEmployeeNameChange = (employeeIndex, name) => {
//     const updatedEmployees = [...employees];
//     updatedEmployees[employeeIndex].name = name;
//     setEmployees(updatedEmployees);
//   };

//   const handleDepartmentEmployeeNameChange = (
//     departmentIndex,
//     employeeIndex,
//     name
//   ) => {
//     const updatedDepartments = [...departments];
//     updatedDepartments[departmentIndex].employees[employeeIndex].name = name;
//     setDepartments(updatedDepartments);
//   };

//   const occupiedPositions = initialEmployeeCount - employeeCount;
//   const vacantPositions = employeeCount;
//   const allocatedBudget = totalBudget - remainingBudget;

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <h1 className="row">
//             <div className="col-12 d-flex justify-content-center">
//               SUPER ADMIN
//             </div>
//           </h1>
//           <div className="row">
//             <div className="col-12">
//               <div className="form-group">
//                 <label htmlFor="employeeCount">
//                   Total Number of Employees:
//                 </label>
//                 <input
//                   type="number"
//                   id="employeeCount"
//                   className="form-control"
//                   value={initialEmployeeCount}
//                   onChange={handleEmployeeCountChange}
//                 />
//               </div>
//             </div>
//             <div className="col-12">
//               <div className="form-group">
//                 <label htmlFor="totalBudget">Total Company Budget:</label>
//                 <input
//                   type="number"
//                   id="totalBudget"
//                   className="form-control"
//                   value={totalBudget}
//                   onChange={handleBudgetChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-12">
//               <div className="form-group">
//                 <label>Remaining Employees to Assign:</label>
//                 <div>
//                   {occupiedPositions}/{initialEmployeeCount} (Occupied)
//                 </div>
//                 <div>{vacantPositions} Vacancies left</div>
//               </div>
//             </div>
//             <div className="col-12">
//               <div className="form-group">
//                 <label>Budget Allocation:</label>
//                 <div>
//                   {allocatedBudget}/{totalBudget} (Allocated)
//                 </div>
//                 <div>{remainingBudget} Budget left</div>
//               </div>
//             </div>
//           </div>

//           {/* Add Employee Button */}
//           <div className="row">
//             <div className="col-12">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() =>
//                   handleAddEmployee(
//                     Number(prompt("Enter number of vacancies:"))
//                   )
//                 }
//               >
//                 Add Designation
//               </button>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-12">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() =>
//                   handleAddEmployee(
//                     Number(prompt("Enter number of vacancies:"))
//                   )
//                 }
//               >
//                 Add Employee
//               </button>
//             </div>
//           </div>

//           {employees.map((employee, empIndex) => (
//             <div key={empIndex} className="form-group mt-2">
//               <label>Employee Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={employee.name}
//                 onChange={(e) =>
//                   handleEmployeeNameChange(empIndex, e.target.value)
//                 }
//               />
//             </div>
//           ))}

//           {employeeCount >= 0 && (
//             <>
//               <div className="row mt-3">
//                 <div className="col-12">
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleAddDepartment}
//                   >
//                     Add Department
//                   </button>
//                 </div>
//               </div>

//               {departments.map((department, index) => (
//                 <div key={index} className="row mt-3">
//                   <div className="col-4">
//                     <div className="form-group">
//                       <label>Department Name:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={department.name}
//                         onChange={(e) =>
//                           handleDepartmentNameChange(index, e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-4">
//                     <div className="form-group">
//                       <label>Number of Employees in Department:</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={department.employeeCount}
//                         onChange={(e) =>
//                           handleDepartmentEmployeeCountChange(
//                             index,
//                             Number(e.target.value)
//                           )
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-4">
//                     <div className="form-group">
//                       <label>Department Budget:</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={department.budget}
//                         onChange={(e) =>
//                           handleDepartmentBudgetChange(
//                             index,
//                             Number(e.target.value)
//                           )
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <button
//                       className="btn btn-secondary mt-2"
//                       onClick={() =>
//                         handleAddEmployeeToDepartment(
//                           index,
//                           Number(
//                             prompt(
//                               "Enter number of vacancies for the designation:"
//                             )
//                           )
//                         )
//                       }
//                     >
//                       Add Designation for Department
//                     </button>
//                     <button
//                       className="btn btn-secondary mt-2"
//                       onClick={() =>
//                         handleAddEmployeeToDepartment(
//                           index,
//                           Number(
//                             prompt(
//                               "Enter number of vacancies for the designation:"
//                             )
//                           )
//                         )
//                       }
//                     >
//                       Add Employee to department
//                     </button>

//                     {department.employees.map((employee, empIndex) => (
//                       <div key={empIndex} className="form-group mt-2">
//                         <label>Employee Name:</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={employee.name}
//                           onChange={(e) =>
//                             handleDepartmentEmployeeNameChange(
//                               index,
//                               empIndex,
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdmin;

import { useState } from "react";

const SuperAdmin = () => {
  const [initialEmployeeCount, setInitialEmployeeCount] = useState(200);
  const [employeeCount, setEmployeeCount] = useState(20);
  const [totalBudget, setTotalBudget] = useState(500);
  const [allocatedBudget, setAllocatedBudget] = useState(200);
  const [departments, setDepartments] = useState([
    {
      name: "Engineering",
      vacancies: 15,
      budget: 1000000,
      employees: [
        {
          firstName: "John",
          lastName: "Doe",
          designation: "Software Engineer",
          salary: "120000",
        },
      ],
    },
    { name: "Product", vacancies: 5, budget: 600000, employees: [] },
  ]);

  const [designations, setDesignations] = useState([
    { name: "Software Engineer", vacancies: 10, filled: 3 },
    { name: "Product Manager", vacancies: 5, filled: 2 },
  ]);
  const [employees, setEmployees] = useState([
    {
      first_Name: "Alice",
      last_Name: "Smith",
      employee_Id: "EMP001",
      designation: "Software Engineer",
      salary: "95000",
    },
    {
      first_Name: "Bob",
      last_Name: "Brown",
      employee_Id: "EMP002",
      designation: "Product Manager",
      salary: "105000",
    },
  ]);

  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    vacancies: 0,
    budget: 0,
  });

  const [showAddEmployeePopup, setShowAddEmployeePopup] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    first_Name: "",
    last_Name: "",
    department: "",
    designation: "",
    user_Role: "",
    employee_Id: "",
    mobile_No: "",
    personal_Email_Id: "",
    working_Email_Id: "",
    date_of_Joining: "",
    password: "",
    confirm_Password: "",
    address: "",
    user_Avatar: null,
    pan_No: "",
    adhaar_Number: "",
    other_Document: null,
    bank_Holder_Name: "",
    bank_Name: "",
    bank_Account_No: "",
    ifsc_Code: "",
    salary: "",
    latitude: "",
    longitude: "",
    shift_Timing: "",
    office_Address: "",
  });

  const handleAddDepartment = () => {
    setShowAddDepartmentForm(true);
  };

  const handleSaveDepartment = () => {
    setDepartments([
      ...departments,
      { ...newDepartment, designations: [], employees: [] },
    ]);
    setShowAddDepartmentForm(false);
    setNewDepartment({ name: "", vacancies: 0, budget: 0 });
  };

  const handleDepartmentFieldChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (deptIndex) => {
    const designationName = prompt(
      "Select a designation:",
      departments[deptIndex].designations.map((d) => d.name).join(", ")
    );
    const foundDesignation = departments[deptIndex].designations.find(
      (d) => d.name === designationName
    );
    if (
      foundDesignation &&
      foundDesignation.vacancies > foundDesignation.filled
    ) {
      let newDepartments = [...departments];
      newDepartments[deptIndex].employees.push({
        firstName: "",
        lastName: "",
        designation: designationName,
      });
      newDepartments[deptIndex].designations = newDepartments[
        deptIndex
      ].designations.map((d) =>
        d.name === designationName ? { ...d, filled: d.filled + 1 } : d
      );
      setDepartments(newDepartments);
    } else {
      alert("Invalid designation or not enough vacancies.");
    }
  };

  const handleAddEmployeePopup = () => {
    setShowAddEmployeePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddEmployeePopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEmployee = (e) => {
    e.preventDefault();
    // Add validation and logic for adding the employee to the employees array
    console.log(newEmployee); // Or any other logic to process the employee data
    setShowAddEmployeePopup(false);
  };

  const handleEmployeeCountChange = (e) => {
    const newCount = Number(e.target.value);
    setInitialEmployeeCount(newCount);
    setEmployeeCount(newCount);
  };

  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value);
    setTotalBudget(newBudget);
  };

  const handleAddDesignation = () => {
    const designation = prompt("Enter designation name:");
    const vacancies = Number(
      prompt("Enter number of vacancies for the designation:")
    );
    setDesignations((prevDesignations) => [
      ...prevDesignations,
      { name: designation, vacancies, filled: 0 },
    ]);
  };

  const handleAddEmployeeOutofDepartment = () => {
    const designationName = prompt(
      "Select a designation:",
      designations.map((d) => d.name).join(", ")
    );
    const foundDesignation = designations.find(
      (d) => d.name === designationName
    );
    if (
      foundDesignation &&
      foundDesignation.vacancies > foundDesignation.filled
    ) {
      setEmployees([...employees, { name: "", designation: designationName }]);
      setDesignations(
        designations.map((d) =>
          d.name === designationName ? { ...d, filled: d.filled + 1 } : d
        )
      );
      setEmployeeCount((prev) => prev + 1);
    } else {
      alert("Invalid designation or not enough vacancies.");
    }
  };

  const remainingEmployees = initialEmployeeCount - employees.length;
  const remainingBudget = totalBudget - allocatedBudget;

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <h1 className="row">
            <div className="col-12 d-flex justify-content-center">
              SUPER ADMIN
            </div>
          </h1>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Total Number of Employees:</label>
                <div>{initialEmployeeCount}</div>
                <div>
                  {remainingEmployees} remaining out of {initialEmployeeCount}
                </div>
                <button
                  onClick={() =>
                    setInitialEmployeeCount(
                      prompt("Enter new total number of employees:")
                    )
                  }
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>Total Company Budget:</label>
                <div>{totalBudget}</div>
                <div>
                  ${remainingBudget} remaining out of ${totalBudget}
                </div>
                <button
                  onClick={() =>
                    setTotalBudget(prompt("Enter new total budget:"))
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Add Department */}
          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary" onClick={handleAddDepartment}>
                Add Department
              </button>
            </div>
          </div>
          {showAddDepartmentForm && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Department Name"
                value={newDepartment.name}
                onChange={handleDepartmentFieldChange}
              />
              <input
                name="vacancies"
                placeholder="Total Vacancies"
                onChange={handleDepartmentFieldChange}
              />
              <input
                name="budget"
                placeholder="Department Budget"
                onChange={handleDepartmentFieldChange}
              />
              <button onClick={handleSaveDepartment}>Save Department</button>
            </div>
          )}
          {/* Add Designation */}
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-secondary"
                onClick={handleAddDesignation}
              >
                Add Designation Out of Department
              </button>
            </div>
          </div>

          {/* Add Employee Out of Department */}
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-secondary"
                onClick={handleAddEmployeePopup}
              >
                Add Employee Out of Department
              </button>
            </div>
          </div>

          {/* Custom Popup for Adding New Employee */}
          {showAddEmployeePopup && (
            <div
              className={`modal ${showAddEmployeePopup ? "show-modal" : ""}`}
            >
              <div className="modal-content">
                <span className="close" onClick={handleClosePopup}>
                  &times;
                </span>
                <form onSubmit={handleSubmitEmployee}>
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="first_Name"
                    value={newEmployee.first_Name}
                    onChange={handleChange}
                  />
                  {/* Include other fields as above */}
                  <label>Designation:</label>
                  <select
                    name="designation"
                    value={newEmployee.designation}
                    onChange={handleChange}
                  >
                    {designations.map((designation, index) => (
                      <option key={index} value={designation.name}>
                        {designation.name}
                      </option>
                    ))}
                  </select>
                  <div>PERMISSIONS</div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          )}

          {/* Display Designations */}
          <h3>Designations Out of Department</h3>
          <table>
            <thead>
              <tr>
                <th>Designation Name</th>
                <th>Vacancies</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((designation, index) => (
                <tr key={index}>
                  <td>{designation.name}</td>
                  <td>{designation.vacancies}</td>
                  <td>
                    {designation.filled === designation.vacancies
                      ? "Filled"
                      : `Remaining: ${
                          designation.vacancies - designation.filled
                        }`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Employees Out of Department</h3>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Employee ID</th>
                <th>Designation</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{`${employee.first_Name} ${employee.last_Name}`}</td>
                  <td>{employee.employee_Id}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {departments.map((department, index) => (
            <div key={index}>
              <h2>{department.name}</h2>
              <button onClick={() => handleAddDesignation(index)}>
                Add Designation
              </button>
              <button onClick={() => handleAddEmployee(index)}>
                Add Employee
              </button>
            </div>
          ))}
          {/* Department Table */}
          <h2>Departments</h2>
          <table>
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Number of Employees</th>
                <th>Number of Vacancies</th>
                <th>Budget Allocated</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.name}</td>
                  <td>{dept.employees.length}</td>
                  <td>{dept.vacancies}</td>
                  <td>${dept.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx="true">{`
        body,
        .ems-content {
          font-family: "Arial", sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        h1,
        h2,
        h3 {
          color: #333;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          margin-right: 10px;
        }

        .btn-primary {
          background-color: #007bff;
        }

        .btn-secondary {
          background-color: #6c757d;
        }

        .btn:hover {
          opacity: 0.8;
        }

        input[type="text"],
        select {
          padding: 8px;
          margin: 5px 0;
          display: block;
          width: 100%;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th,
        td {
          text-align: left;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f8f9fa;
        }

        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 50%;
          position: relative;
        }

        .close {
          color: #aaaaaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .show-modal {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default SuperAdmin;
