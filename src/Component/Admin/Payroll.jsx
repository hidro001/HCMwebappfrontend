import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Modal from "react-modal"; // Ensure this is installed via npm
import Swal from "sweetalert2"; // Ensure this is installed via npm
import "sweetalert2/dist/sweetalert2.min.css";

// Import the RequestManagement component
import RequestManagement from "./RequestManagement"; // Adjust the path as needed

Modal.setAppElement("#root"); // Set the root element for accessibility

const Payroll = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [payrollData, setPayrollData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [totalPayout, setTotalPayout] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState(null);
  const monthsContainerRef = useRef(null);

  const [editForm, setEditForm] = useState({
    deduction: "",
    leaves: "",
    finalSalary: "",
    // Add other fields as needed
  });
  const [isProcessingPayroll, setIsProcessingPayroll] = useState(false);

  // New state variables for Request Management modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchPayrollData(month, year);
    fetchAllocatedDepartments();
  }, [month, year]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchTeams(selectedDepartment);
    } else {
      setTeams([]);
      setSelectedTeam("");
    }
  }, [selectedDepartment]);

  useEffect(() => {
    calculateTotalPayout();
  }, [payrollData, selectedDepartment, selectedTeam]);

  const fetchPayrollData = async (selectedMonth, selectedYear) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // Show processing message if processing payroll
      if (isProcessingPayroll) {
        Swal.fire({
          title: "Processing Payroll",
          text: "Please wait while the payroll is being processed.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/admin/payroll/getpayroll/?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setPayrollData(response.data.data || []);
      if (isProcessingPayroll) {
        Swal.close(); // Close the processing message
        setIsProcessingPayroll(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payroll processed successfully.",
        });
      }
    } catch (error) {
      console.error("Failed to fetch payroll data.", error);
      if (isProcessingPayroll) {
        Swal.close();
        setIsProcessingPayroll(false);
      }
    }
  };

  const fetchAllocatedDepartments = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/departmentAlocated/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const validDepartments = response.data.departmentAlocated.filter(
        (dept) => !dept.includes("[") && !dept.includes("]")
      );
      setDepartments(validDepartments);
    } catch (error) {
      console.error("Failed to fetch departments.", error);
    }
  };

  const fetchTeams = async (department) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/admin/team/team-list/?department=${department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setTeams(response.data.team || []);
    } catch (error) {
      console.error("Failed to fetch teams.", error);
    }
  };

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedTeam("");
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredPayrollData = payrollData.filter((employee) => {
    const departmentMatch = selectedDepartment
      ? employee.department === selectedDepartment
      : true;
    const teamMatch = selectedTeam ? employee.teamName === selectedTeam : true;
    return departmentMatch && teamMatch;
  });

  // Calculate total payout for the selected month
  const calculateTotalPayout = () => {
    const total = filteredPayrollData.reduce((sum, employee) => {
      const salary =
        typeof employee.finalSalary === "string"
          ? parseFloat(
              employee.finalSalary.replace("₹", "").replace(/,/g, "")
            ) || 0
          : parseFloat(employee.finalSalary) || 0;

      // Include reimbursement and advance amounts
      const adjustedSalary =
        salary +
        (employee.reimbursementAmount || 0) -
        (employee.advanceAmount || 0);

      return sum + adjustedSalary;
    }, 0);
    setTotalPayout(total);
  };

  // Function to export payroll data to Excel
  const exportToExcel = () => {
    if (filteredPayrollData.length === 0) {
      return;
    }

    const formattedData = filteredPayrollData.map((employee) => ({
      "Employee ID": employee.employeeId,
      Name: `${employee.firstName} ${employee.lastName}`,
      Department: employee.department,
      "Team Name": employee.teamName || "",
      "Gross Salary": `₹ ${parseFloat(employee.amount).toLocaleString()}`,
      Deductions: `₹ ${parseFloat(employee.deduction).toLocaleString()}`,
      Leaves: employee.leaves,
      "Half Days": employee.halfDays,
      "Not Even Half Days": employee.notEvenHalfDays,
      "Total Shifts": employee.totalShifts,
      "Remaining Paid Leaves": employee.remainingPaidLeaves,
      "Completed Shifts": employee.completedShifts,
      "Not Logged Out": employee.notLoggedOut,
      "Total Lates": employee.totalLates,
      Regularizations: employee.regularizations,
      "Advance Amount": `₹ ${
        employee.advanceAmount
          ? parseFloat(employee.advanceAmount).toLocaleString()
          : "0"
      }`,
      "Reimbursement Amount": `₹ ${
        employee.reimbursementAmount
          ? parseFloat(employee.reimbursementAmount).toLocaleString()
          : "0"
      }`,
      "Final Salary": `₹ ${parseFloat(employee.finalSalary).toLocaleString()}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PayrollData");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Payroll_${monthNames[month - 1]}_${year}.xlsx`);
  };

  // Handle Edit Button Click
  const handleEditClick = (employee) => {
    setCurrentPayroll(employee);
    setEditForm({
      deduction: employee.deduction,
      leaves: employee.leaves,
      finalSalary: employee.finalSalary,
      // Initialize other fields as needed
    });
    setIsEditing(true);
  };

  // Handle Edit Form Change
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Edited Payroll
  const submitEditForm = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/admin/payroll/update/${currentPayroll._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payroll updated successfully.",
        });
        setIsEditing(false);
        fetchPayrollData(month, year); // Refresh data
      } else {
        throw new Error(response.data.message || "Failed to update payroll.");
      }
    } catch (error) {
      console.error("Failed to update payroll.", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update payroll.",
      });
    }
  };

  // Handle Hold Payout
  const handleHoldPayout = async (employee) => {
    const hold = !employee.holdPayout; // Toggle hold status
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://apiv2.humanmaximizer.com/api/v1/admin/payroll/hold/${employee._id}`,
        { hold },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: hold
            ? "Payout has been put on hold."
            : "Payout has been resumed.",
        });
        fetchPayrollData(month, year); // Refresh data
      } else {
        throw new Error(
          response.data.message || "Failed to update hold status."
        );
      }
    } catch (error) {
      console.error("Failed to update hold status.", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update hold status.",
      });
    }
  };

  // Handle Process Payroll
  const handleProcessPayroll = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setIsProcessingPayroll(true);
      Swal.fire({
        title: "Processing Payroll",
        text: "Please wait while the payroll is being processed.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      // Call the API to process payroll
      const response = await axios.post(
        `https://apiv2.humanmaximizer.com/api/v1/admin/payroll/addpayroll/?month=${month}&year=${year}`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.success) {
        // Fetch the updated payroll data
        await fetchPayrollData(month, year);
        Swal.close();
        setIsProcessingPayroll(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payroll processed successfully.",
        });
      } else {
        throw new Error(response.data.message || "Failed to process payroll.");
      }
    } catch (error) {
      console.error("Failed to process payroll.", error);
      Swal.close();
      setIsProcessingPayroll(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process payroll.",
      });
    }
  };

  // Handle opening the Request Management modal
  const openRequestManagementModal = () => {
    setIsRequestModalOpen(true);
  };

  // Handle closing the Request Management modal
  const closeRequestManagementModal = () => {
    setIsRequestModalOpen(false);
  };

  const handlePrev = () => {
    setMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
  };

  const handleNext = () => {
    setMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
  };

  useEffect(() => {
    if (monthsContainerRef.current) {
      const monthsContainer = monthsContainerRef.current;
      const activeMonthElement = monthsContainer.querySelector(
        ".razor-emp-atd-calendar-month.active"
      );
      if (activeMonthElement) {
        const containerWidth = monthsContainer.offsetWidth;
        const monthWidth = activeMonthElement.offsetWidth;
        const monthOffsetLeft = activeMonthElement.offsetLeft;

        // Calculate the scroll position to center the active month
        const scrollTo = monthOffsetLeft - containerWidth / 2 + monthWidth / 2;

        monthsContainer.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [month]);

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container hm-pay-roll-emp">
          <div className="rzr-hm-payroll-lv">
            <h2>
              Payroll for {monthNames[month - 1]} {year}
            </h2>
            <div className="hm-mng-payroll-container">
              <button
                className="hm-mng-payroll-arrow"
                onClick={handlePrev}
                type="button" // Added type attribute
              >
                &#8592;
              </button>
              {/* Calendar Header */}
              <div className="hm-mng-payroll" ref={monthsContainerRef}>
                {monthNames.map((monthName, index) => (
                  <div
                    key={index}
                    className={`razor-emp-atd-calendar-month ${
                      month === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handleMonthChange(index + 1)}
                  >
                    {monthName}
                  </div>
                ))}
              </div>
              <button
                className="hm-mng-payroll-arrow"
                onClick={handleNext}
                type="button" // Added type attribute
              >
                &#8594;
              </button>
            </div>

            {/* Year and Department Filters */}
            <div className="year-department-filter d-flex justify-content-between align-items-center my-4">
              <div className="filter-item">
                <label htmlFor="year" className="me-2">
                  Year:
                </label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                  min="2000"
                  max={new Date().getFullYear()}
                  className="form-control d-inline-block w-auto"
                />
              </div>

              <div className="filter-item">
                <label htmlFor="department" className="me-2">
                  Department:
                </label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="form-select d-inline-block w-auto"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDepartment && (
                <div className="filter-item">
                  <label htmlFor="team" className="me-2">
                    Team:
                  </label>
                  <select
                    id="team"
                    value={selectedTeam}
                    onChange={handleTeamChange}
                    className="form-select d-inline-block w-auto"
                  >
                    <option value="">All Teams</option>
                    {teams.map((team, index) => (
                      <option key={index} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Process Payroll Button */}
              <div className="filter-item">
                <button
                  onClick={handleProcessPayroll}
                  className="btn btn-primary"
                  disabled={isProcessingPayroll}
                >
                  Process Payroll
                </button>
              </div>

              {/* Request Management Button */}
              <div className="filter-item">
                <button
                  onClick={openRequestManagementModal}
                  className="btn btn-secondary"
                >
                  Manage Claims
                </button>
              </div>
            </div>

            {/* Total Payout */}
            <div className="total-payout mb-3">
              <h5>
                Total Payout for {monthNames[month - 1]} {year}: ₹{" "}
                {totalPayout.toLocaleString()}
              </h5>
            </div>

            {/* Payroll Data */}
            <div className="payroll-data">
              <div className="rzr-hm-payroll-card-container">
                <div className="table-responsive rzr-hm-payroll-card">
                  <table className="rzr-hm-payroll-lv-table table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>

                        <th>Gross Salary</th>
                        <th>Deductions</th>
                        <th>Leaves</th>
                        <th>Half Days</th>
                        <th>Not Even Half Days</th>
                        <th>Total Shifts</th>
                        <th>Remaining Paid Leaves</th>
                        <th>Completed Shifts</th>
                        <th>Not Logged Out</th>
                        <th>Total Lates</th>
                        <th>Regularizations</th>
                        <th>Advance Amount</th>
                        <th>Reimbursement Amount</th>
                        <th>Final Salary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayrollData.map((employee, index) => (
                        <tr key={index}>
                          <td data-label="Employee ID">
                            {employee.employeeId}
                          </td>
                          <td data-label="Name">
                            {employee.firstName} {employee.lastName}
                          </td>
                          <td data-label="Department">{employee.department}</td>
                          <td data-label="Gross Salary">
                            ₹ {parseFloat(employee.amount).toLocaleString()}
                          </td>
                          <td data-label="Deductions">
                            ₹ {parseFloat(employee.deduction).toLocaleString()}
                          </td>
                          <td data-label="Leaves">{employee.leaves}</td>
                          <td data-label="Half Days">{employee.halfDays}</td>
                          <td data-label="Not Even Half Days">
                            {employee.notEvenHalfDays}
                          </td>
                          <td data-label="Total Shifts">
                            {employee.totalShifts}
                          </td>
                          <td data-label="Remaining Paid Leaves">
                            {employee.remainingPaidLeaves}
                          </td>
                          <td data-label="Completed Shifts">
                            {employee.completedShifts}
                          </td>
                          <td data-label="Not Logged Out">
                            {employee.notLoggedOut}
                          </td>
                          <td data-label="Total Lates">
                            {employee.totalLates}
                          </td>
                          <td data-label="Regularizations">
                            {employee.regularizations}
                          </td>
                          <td data-label="Advance Amount">
                            ₹{" "}
                            {parseFloat(
                              employee.advanceAmount || 0
                            ).toLocaleString()}
                          </td>
                          <td data-label="Reimbursement Amount">
                            ₹{" "}
                            {parseFloat(
                              employee.reimbursementAmount || 0
                            ).toLocaleString()}
                          </td>
                          <td data-label="Final Salary">
                            ₹{" "}
                            {parseFloat(employee.finalSalary).toLocaleString()}
                          </td>
                          <td data-label="Actions">
                            <button
                              className="btn btn-sm hm-pay-roll-edit-btn me-2"
                              onClick={() => handleEditClick(employee)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleHoldPayout(employee)}
                            >
                              {employee.holdPayout
                                ? "Resume Payout"
                                : "Hold Payout"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredPayrollData.length === 0 && (
                <p className="no-data-message">
                  No payroll data available for the selected filters.
                </p>
              )}

              {/* Export Button */}
              <div className="export-button text-end mt-3">
                <button
                  onClick={exportToExcel}
                  className="rzr-hm-payroll-lv-export-btn btn btn-success"
                >
                  Export to Excel
                </button>
              </div>
            </div>
          </div>

          {/* Edit Payroll Modal */}
          <Modal
            isOpen={isEditing}
            onRequestClose={() => setIsEditing(false)}
            contentLabel="Edit Payroll"
            className="modal-dialog hm-edit-pay-roll"
            overlayClassName="modal-backdrop"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Payroll</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsEditing(false)}
                ></button>
              </div>
              <form onSubmit={submitEditForm}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="deduction" className="form-label">
                      Deductions (₹)
                    </label>
                    <input
                      type="number"
                      id="deduction"
                      name="deduction"
                      value={editForm.deduction}
                      onChange={handleEditFormChange}
                      className="form-control"
                      required
                      min="0"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="leaves" className="form-label">
                      Leaves
                    </label>
                    <input
                      type="number"
                      id="leaves"
                      name="leaves"
                      value={editForm.leaves}
                      onChange={handleEditFormChange}
                      className="form-control"
                      required
                      min="0"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="finalSalary" className="form-label">
                      Final Salary (₹)
                    </label>
                    <input
                      type="number"
                      id="finalSalary"
                      name="finalSalary"
                      value={editForm.finalSalary}
                      onChange={handleEditFormChange}
                      className="form-control"
                      required
                      min="0"
                    />
                  </div>

                  {/* Add more fields as needed */}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </Modal>

          {/* Request Management Modal */}
          <Modal
            isOpen={isRequestModalOpen}
            onRequestClose={closeRequestManagementModal}
            contentLabel="Request Management"
            className="hm-pay-roll-claims"
            overlayClassName="modal-backdrop"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Management</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeRequestManagementModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Render the RequestManagement component */}
                <RequestManagement />
              </div>
            </div>
          </Modal>
        </div>
      </div>
      {/* Inline Styles (optional) */}
      <style jsx="true">{`
        /* Prevent horizontal overflow of the page */
        .hm-mng-payroll-container {
          // overflow-x: hidden;
        }

        /* Months container styles */
        .hm-mng-payroll {
          display: flex;

          max-width: 100%;
        }

        /* Individual month styles */
        .razor-emp-atd-calendar-month {
          flex: 0 0 auto;
          white-space: nowrap;
          /* Add padding, margin, and other styles as needed */
        }
      `}</style>
    </div>
  );
};

export default Payroll;
