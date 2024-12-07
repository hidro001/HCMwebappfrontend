import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DepartmentDetails = () => {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [designations, setDesignations] = useState([]);
  const [designationInput, setDesignationInput] = useState("");
  const [vacanciesInput, setVacanciesInput] = useState("");
  const [budgetInput, setBudgetInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    empId: "",
    name: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    setLoading(true);
    // Define static department data
    const staticDepartment = {
      id: 1,
      name: "HR",
      budget: "500K",
      vacancies: 5,
      numEmployees: 10,
    };
    setDepartment(staticDepartment);
    setLoading(false);
  }, []);

  const addDesignation = (e) => {
    e.preventDefault();
    setDesignations([
      ...designations,
      {
        designation: designationInput,
        vacancies: vacanciesInput,
        budget: budgetInput,
      },
    ]);
    setDesignationInput("");
    setVacanciesInput("");
    setBudgetInput("");
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log("Adding Employee: ", newEmployee);
    // Reset form
    setNewEmployee({ empId: "", name: "", designation: "", salary: "" });
    setShowModal(true);
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!department)
    return <div>No department available or data could not be loaded.</div>;

  // Define static employees data
  const employees = [
    {
      empId: 101,
      name: "John Doe",
      designation: "Manager",
      salary: "50K",
    },
    {
      empId: 102,
      name: "Jane Smith",
      designation: "Assistant",
      salary: "30K",
    },
    {
      empId: 103,
      name: "Emily Johnson",
      designation: "HR Specialist",
      salary: "40K",
    },
  ];

  return (
    <div className="main">
      <div className="ems-content">
        <div className="hm-rzr-dpt-dts">
          {/* Teams Table */}
          <div className="all-head d-flex align-items-center justify-content-between mb-4">
            <h4>Teams</h4>
          </div>
          <table className="hcm-dpt-details-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Team Leader</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding Employee */}
          {showModal && (
            <div className="hcm-dpt-details-modal">
              <div className="hcm-dpt-details-modal-content">
                <span
                  className="hcm-dpt-details-close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </span>
                <form
                  onSubmit={handleAddEmployee}
                  className="hcm-dpt-details-form"
                >
                  <input
                    type="text"
                    name="empId"
                    placeholder="Employee ID"
                    value={newEmployee.empId}
                    onChange={handleEmployeeChange}
                    className="hcm-dpt-details-input"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={handleEmployeeChange}
                    className="hcm-dpt-details-input"
                  />
                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={newEmployee.designation}
                    onChange={handleEmployeeChange}
                    className="hcm-dpt-details-input"
                  />
                  <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={newEmployee.salary}
                    onChange={handleEmployeeChange}
                    className="hcm-dpt-details-input"
                  />
                  <button type="submit" className="hcm-dpt-details-button">
                    Add Employee
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
