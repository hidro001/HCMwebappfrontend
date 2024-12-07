import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Tabs,
  Tab,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

import axios from "axios";

const CompanySettings = () => {
  // State variables
  const [shiftTimings, setShiftTimings] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [payrollCycles, setPayrollCycles] = useState([]);
  const [leaveSystems, setLeaveSystems] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);

  // For messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showShiftTimingModal, setShowShiftTimingModal] = useState(false);
  const [editShiftTimingId, setEditShiftTimingId] = useState(null);
  const [newShiftTiming, setNewShiftTiming] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });

  // For Holidays
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [editHolidayId, setEditHolidayId] = useState(null);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    recurring: false,
  });

  // For Deductions
  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [editDeductionId, setEditDeductionId] = useState(null);
  const [newDeduction, setNewDeduction] = useState({
    name: "",
    percentage: 0,
  });

  // For Payroll Cycles
  const [showPayrollCycleModal, setShowPayrollCycleModal] = useState(false);
  const [editPayrollCycleId, setEditPayrollCycleId] = useState(null);
  const [newPayrollCycle, setNewPayrollCycle] = useState({
    name: "",
    processingDate: "",
  });

  // For Leave Systems
  const [showLeaveSystemModal, setShowLeaveSystemModal] = useState(false);
  const [editLeaveSystemId, setEditLeaveSystemId] = useState(null);
  const [newLeaveSystem, setNewLeaveSystem] = useState({
    name: "",
    workingDays: [],
    monthlyPaidLeaves: 0,
  });

  // For Employment Types
  const [showEmploymentTypeModal, setShowEmploymentTypeModal] = useState(false);
  const [editEmploymentTypeId, setEditEmploymentTypeId] = useState(null);
  const [newEmploymentType, setNewEmploymentType] = useState({
    name: "",
    deductions: [],
    payrollCycleId: "",
    leaveSystemId: "",
    salaryHikePercentage: 0,
  });

  // For delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "", id: null });
  // In CompanySettings.js

  // Add to state variables
  const [attendancePolicies, setAttendancePolicies] = useState({
    fullDayHours: 9,
    halfDayHours: 5,
    minimumWorkingHours: 4.5,
    gracePeriodMinutes: 15,
    regularizationCriteria: {
      minHours: 7,
      maxHours: 9,
    },
    regularizationApprovalRequired: false,
    overtimeEligibilityHours: 10,
    overtimeRate: 1.5,
    maximumLeaveCarryover: 30,
    autoAbsenceThreshold: 3,
  });

  const [monthsBetweenHikesOrAdvances, setMonthsBetweenHikesOrAdvances] =
    useState(12);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Company Settings
        const companySettingsRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings"
        );

        let settingsData = companySettingsRes.data.data;

        if (!companySettingsRes.data.success) {
          // Company settings not found, create them
          const newSettingsRes = await axios.post(
            "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",

            {
              companyName: "Your Company Name",
              address: "123 Main Street, City, Country",
              contactEmail: "contact@yourcompany.com",
            }
          );
          settingsData = newSettingsRes.data.data;
        }

        // Now you can use settingsData
        setAttendancePolicies(
          settingsData.attendancePolicies || {
            fullDayHours: 9,
            halfDayHours: 5,
            minimumWorkingHours: 4.5,
            gracePeriodMinutes: 15,
            regularizationCriteria: {
              minHours: 7,
              maxHours: 9,
            },
            regularizationApprovalRequired: false,
            overtimeEligibilityHours: 10,
            overtimeRate: 1.5,
            maximumLeaveCarryover: 30,
            autoAbsenceThreshold: 3,
          }
        );

        setMonthsBetweenHikesOrAdvances(
          settingsData.monthsBetweenHikesOrAdvances || 12
        );

        // Fetch Shift Timings
        const shiftTimingsRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings"
        );
        setShiftTimings(shiftTimingsRes.data.data || []);

        // Fetch Holidays
        const holidaysRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays"
        );
        setHolidays(holidaysRes.data.data || []);

        // Fetch Deductions
        const deductionsRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions"
        );
        setDeductions(deductionsRes.data.data || []);

        // Fetch Payroll Cycles
        const payrollCyclesRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles"
        );
        setPayrollCycles(payrollCyclesRes.data.data || []);

        // Fetch Leave Systems
        const leaveSystemsRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems"
        );
        setLeaveSystems(leaveSystemsRes.data.data || []);

        // Fetch Employment Types
        const employmentTypesRes = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types"
        );
        setEmploymentTypes(employmentTypesRes.data.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data from server.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Shift Timings Handlers
  const handleShiftTimingChange = (e) => {
    const { name, value } = e.target;
    setNewShiftTiming((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateShiftTiming = async () => {
    if (
      !newShiftTiming.name ||
      !newShiftTiming.startTime ||
      !newShiftTiming.endTime
    ) {
      setError("Please fill all fields for shift timing.");
      return;
    }

    try {
      if (editShiftTimingId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings",

          {
            id: editShiftTimingId,
            ...newShiftTiming,
          }
        );
        setMessage("Shift Timing updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings",

          newShiftTiming
        );
        setMessage("Shift Timing added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings"
      );
      setShiftTimings(res.data.data);
      handleCloseShiftTimingModal();
    } catch (error) {
      console.error("Error saving shift timing:", error);
      setError("Failed to save shift timing.");
    }
  };

  // In CompanySettings.js

  // Handler for attendance policies
  const handleAttendancePoliciesChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAttendancePolicies((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number" || type === "range"
          ? parseFloat(value)
          : value,
    }));
  };

  // Handler for regularization criteria
  const handleRegularizationCriteriaChange = (e) => {
    const { name, value } = e.target;

    setAttendancePolicies((prev) => ({
      ...prev,
      regularizationCriteria: {
        ...prev.regularizationCriteria,
        [name]: parseFloat(value),
      },
    }));
  };

  // Handler for saving policies
  const handleSavePolicies = async () => {
    try {
      const updatedSettings = {
        attendancePolicies,
        monthsBetweenHikesOrAdvances,
      };

      await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/update-policies",

        updatedSettings
      );

      setMessage("Policies updated successfully.");
    } catch (error) {
      console.error("Error saving policies:", error);
      setError("Failed to save policies.");
    }
  };

  const handleDeleteShiftTiming = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings/${deleteItem.id}`
      );
      setMessage("Shift Timing deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/shift-timings"
      );
      setShiftTimings(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting shift timing:", error);
      setError("Failed to delete shift timing.");
    }
  };

  const handleShowShiftTimingModal = (id = null) => {
    if (id) {
      const shiftTiming = shiftTimings.find((st) => st.id === id);
      setNewShiftTiming(shiftTiming);
      setEditShiftTimingId(id);
    } else {
      setNewShiftTiming({
        name: "",
        startTime: "",
        endTime: "",
      });
      setEditShiftTimingId(null);
    }
    setShowShiftTimingModal(true);
  };

  const handleCloseShiftTimingModal = () => {
    setShowShiftTimingModal(false);
    setNewShiftTiming({
      name: "",
      startTime: "",
      endTime: "",
    });
    setEditShiftTimingId(null);
  };

  // Holidays Handlers
  const handleHolidayChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) {
      setError("Please fill all fields for holiday.");
      return;
    }

    try {
      if (editHolidayId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays",

          {
            id: editHolidayId,
            ...newHoliday,
          }
        );
        setMessage("Holiday updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays",

          newHoliday
        );
        setMessage("Holiday added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays"
      );
      setHolidays(res.data.data);
      handleCloseHolidayModal();
    } catch (error) {
      console.error("Error saving holiday:", error);
      setError("Failed to save holiday.");
    }
  };

  const handleDeleteHoliday = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays/${deleteItem.id}`
      );
      setMessage("Holiday deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays"
      );
      setHolidays(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting holiday:", error);
      setError("Failed to delete holiday.");
    }
  };

  const handleShowHolidayModal = (id = null) => {
    if (id) {
      const holiday = holidays.find((h) => h.id === id);
      setNewHoliday(holiday);
      setEditHolidayId(id);
    } else {
      setNewHoliday({
        name: "",
        date: "",
        recurring: false,
      });
      setEditHolidayId(null);
    }
    setShowHolidayModal(true);
  };

  const handleCloseHolidayModal = () => {
    setShowHolidayModal(false);
    setNewHoliday({
      name: "",
      date: "",
      recurring: false,
    });
    setEditHolidayId(null);
  };

  // Deductions Handlers
  const handleDeductionChange = (e) => {
    const { name, value } = e.target;
    setNewDeduction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateDeduction = async () => {
    if (!newDeduction.name || newDeduction.percentage === "") {
      setError("Please fill all fields for deduction.");
      return;
    }

    try {
      if (editDeductionId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions",

          {
            id: editDeductionId,
            ...newDeduction,
          }
        );
        setMessage("Deduction updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions",

          newDeduction
        );
        setMessage("Deduction added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions"
      );
      setDeductions(res.data.data);
      handleCloseDeductionModal();
    } catch (error) {
      console.error("Error saving deduction:", error);
      setError("Failed to save deduction.");
    }
  };

  const handleDeleteDeduction = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions/${deleteItem.id}`
      );
      setMessage("Deduction deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/deductions"
      );
      setDeductions(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting deduction:", error);
      setError("Failed to delete deduction.");
    }
  };

  const handleShowDeductionModal = (id = null) => {
    if (id) {
      const deduction = deductions.find((d) => d.id === id);
      setNewDeduction(deduction);
      setEditDeductionId(id);
    } else {
      setNewDeduction({
        name: "",
        percentage: 0,
      });
      setEditDeductionId(null);
    }
    setShowDeductionModal(true);
  };

  const handleCloseDeductionModal = () => {
    setShowDeductionModal(false);
    setNewDeduction({
      name: "",
      percentage: 0,
    });
    setEditDeductionId(null);
  };

  // Payroll Cycles Handlers
  const handlePayrollCycleChange = (e) => {
    const { name, value } = e.target;
    setNewPayrollCycle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdatePayrollCycle = async () => {
    if (!newPayrollCycle.name || !newPayrollCycle.processingDate) {
      setError("Please fill all fields for payroll cycle.");
      return;
    }

    try {
      if (editPayrollCycleId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles",

          {
            id: editPayrollCycleId,
            ...newPayrollCycle,
          }
        );
        setMessage("Payroll Cycle updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles",

          newPayrollCycle
        );
        setMessage("Payroll Cycle added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles"
      );
      setPayrollCycles(res.data.data);
      handleClosePayrollCycleModal();
    } catch (error) {
      console.error("Error saving payroll cycle:", error);
      setError("Failed to save payroll cycle.");
    }
  };

  const handleDeletePayrollCycle = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles/${deleteItem.id}`
      );
      setMessage("Payroll Cycle deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/payroll-cycles"
      );
      setPayrollCycles(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting payroll cycle:", error);
      setError("Failed to delete payroll cycle.");
    }
  };

  const handleShowPayrollCycleModal = (id = null) => {
    if (id) {
      const payrollCycle = payrollCycles.find((pc) => pc.id === id);
      setNewPayrollCycle(payrollCycle);
      setEditPayrollCycleId(id);
    } else {
      setNewPayrollCycle({
        name: "",
        processingDate: "",
      });
      setEditPayrollCycleId(null);
    }
    setShowPayrollCycleModal(true);
  };

  const handleClosePayrollCycleModal = () => {
    setShowPayrollCycleModal(false);
    setNewPayrollCycle({
      name: "",
      processingDate: "",
    });
    setEditPayrollCycleId(null);
  };

  // Leave Systems Handlers
  const handleLeaveSystemChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveSystem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkingDaysChange = (day) => {
    setNewLeaveSystem((prev) => {
      const workingDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays };
    });
  };

  const handleMonthlyPaidLeavesChange = (value) => {
    setNewLeaveSystem((prev) => ({
      ...prev,
      monthlyPaidLeaves: parseFloat(
        (prev.monthlyPaidLeaves + value).toFixed(1)
      ),
    }));
  };

  const handleAddOrUpdateLeaveSystem = async () => {
    if (!newLeaveSystem.name) {
      setError("Please fill all fields for leave system.");
      return;
    }

    try {
      if (editLeaveSystemId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems",

          {
            id: editLeaveSystemId,
            ...newLeaveSystem,
          }
        );
        setMessage("Leave System updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems",

          newLeaveSystem
        );
        setMessage("Leave System added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems"
      );
      setLeaveSystems(res.data.data);
      handleCloseLeaveSystemModal();
    } catch (error) {
      console.error("Error saving leave system:", error);
      setError("Failed to save leave system.");
    }
  };

  const handleDeleteLeaveSystem = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems/${deleteItem.id}`
      );
      setMessage("Leave System deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/leave-systems"
      );
      setLeaveSystems(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting leave system:", error);
      setError("Failed to delete leave system.");
    }
  };

  const handleShowLeaveSystemModal = (id = null) => {
    if (id) {
      const leaveSystem = leaveSystems.find((ls) => ls.id === id);
      setNewLeaveSystem(leaveSystem);
      setEditLeaveSystemId(id);
    } else {
      setNewLeaveSystem({
        name: "",
        workingDays: [],
        monthlyPaidLeaves: 0,
      });
      setEditLeaveSystemId(null);
    }
    setShowLeaveSystemModal(true);
  };

  const handleCloseLeaveSystemModal = () => {
    setShowLeaveSystemModal(false);
    setNewLeaveSystem({
      name: "",
      workingDays: [],
      monthlyPaidLeaves: 0,
    });
    setEditLeaveSystemId(null);
  };

  // Employment Types Handlers
  const handleEmploymentTypeChange = (e) => {
    const { name, value } = e.target;
    setNewEmploymentType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateEmploymentType = async () => {
    if (!newEmploymentType.name) {
      setError("Please fill all fields for employment type.");
      return;
    }

    try {
      if (editEmploymentTypeId) {
        // Update
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types",

          {
            id: editEmploymentTypeId,
            ...newEmploymentType,
          }
        );
        setMessage("Employment Type updated successfully.");
      } else {
        // Add
        await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types",

          newEmploymentType
        );
        setMessage("Employment Type added successfully.");
      }
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types"
      );
      setEmploymentTypes(res.data.data);
      handleCloseEmploymentTypeModal();
    } catch (error) {
      console.error("Error saving employment type:", error);
      setError("Failed to save employment type.");
    }
  };

  const handleDeleteEmploymentType = async () => {
    try {
      await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types/${deleteItem.id}`
      );
      setMessage("Employment Type deleted successfully.");
      // Refresh data
      const res = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/employment-types"
      );
      setEmploymentTypes(res.data.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting employment type:", error);
      setError("Failed to delete employment type.");
    }
  };

  const handleShowEmploymentTypeModal = (id = null) => {
    if (id) {
      const employmentType = employmentTypes.find((et) => et.id === id);
      setNewEmploymentType(employmentType);
      setEditEmploymentTypeId(id);
    } else {
      setNewEmploymentType({
        name: "",
        deductions: [],
        payrollCycleId: "",
        leaveSystemId: "",
        salaryHikePercentage: 0,
      });
      setEditEmploymentTypeId(null);
    }
    setShowEmploymentTypeModal(true);
  };

  const handleCloseEmploymentTypeModal = () => {
    setShowEmploymentTypeModal(false);
    setNewEmploymentType({
      name: "",
      deductions: [],
      payrollCycleId: "",
      leaveSystemId: "",
      salaryHikePercentage: 0,
    });
    setEditEmploymentTypeId(null);
  };

  // Delete Confirmation
  const confirmDelete = () => {
    const { type } = deleteItem;
    if (type === "shiftTiming") {
      handleDeleteShiftTiming();
    } else if (type === "holiday") {
      handleDeleteHoliday();
    } else if (type === "deduction") {
      handleDeleteDeduction();
    } else if (type === "payrollCycle") {
      handleDeletePayrollCycle();
    } else if (type === "leaveSystem") {
      handleDeleteLeaveSystem();
    } else if (type === "employmentType") {
      handleDeleteEmploymentType();
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading settings...</p>
      </div>
    );
  }
  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-5">
          <div className="company-settings rzr-company-settings">
            <h2>Company Settings</h2>

            {message && (
              <Alert
                variant="success"
                onClose={() => setMessage("")}
                dismissible
              >
                {message}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" onClose={() => setError("")} dismissible>
                {error}
              </Alert>
            )}

            <Tabs defaultActiveKey="shiftTimings" className="mb-3">
              <Tab eventKey="attendancePolicies" title="Attendance Policies">
                <Form>
                  {/* Full Day Hours */}
                  <h5>Full Day Hours</h5>
                  <Form.Group controlId="fullDayHours" className="mb-3">
                    <Form.Label>Full Day Hours</Form.Label>
                    <Form.Control
                      type="number"
                      name="fullDayHours"
                      value={attendancePolicies.fullDayHours}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Half Day Hours */}
                  <h5>Half Day Hours</h5>
                  <Form.Group controlId="halfDayHours" className="mb-3">
                    <Form.Label>Half Day Hours</Form.Label>
                    <Form.Control
                      type="number"
                      name="halfDayHours"
                      value={attendancePolicies.halfDayHours}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Minimum Working Hours */}
                  <h5>Minimum Working Hours</h5>
                  <Form.Group controlId="minimumWorkingHours" className="mb-3">
                    <Form.Label>Minimum Working Hours</Form.Label>
                    <Form.Control
                      type="number"
                      name="minimumWorkingHours"
                      value={attendancePolicies.minimumWorkingHours}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Grace Period */}
                  <h5>Grace Period</h5>
                  <Form.Group controlId="gracePeriodMinutes" className="mb-3">
                    <Form.Label>Grace Period (Minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      name="gracePeriodMinutes"
                      value={attendancePolicies.gracePeriodMinutes}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Regularization Criteria */}
                  <h5>Regularization Criteria</h5>
                  <Form.Group
                    controlId="regularizationCriteria"
                    className="mb-3"
                  >
                    <Form.Label>Regularization Criteria</Form.Label>
                    <Row>
                      <Form.Group
                        as={Col}
                        controlId="regularizationMinHours"
                        className="mb-3"
                      >
                        <Form.Label>Minimum Hours</Form.Label>
                        <Form.Control
                          type="number"
                          name="minHours"
                          value={
                            attendancePolicies.regularizationCriteria.minHours
                          }
                          onChange={handleRegularizationCriteriaChange}
                          min="0"
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        controlId="regularizationMaxHours"
                        className="mb-3"
                      >
                        <Form.Label>Maximum Hours</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxHours"
                          value={
                            attendancePolicies.regularizationCriteria.maxHours
                          }
                          onChange={handleRegularizationCriteriaChange}
                          min="0"
                          required
                        />
                      </Form.Group>
                    </Row>
                  </Form.Group>

                  {/* Regularization Approval Required */}
                  <h5>Regularization Approval</h5>
                  <Form.Group
                    controlId="regularizationApprovalRequired"
                    className="mb-3"
                  >
                    <Form.Check
                      type="checkbox"
                      name="regularizationApprovalRequired"
                      label="Regularization Approval Required"
                      checked={
                        attendancePolicies.regularizationApprovalRequired
                      }
                      onChange={handleAttendancePoliciesChange}
                    />
                  </Form.Group>

                  {/* Overtime Eligibility Hours */}
                  <h5>Overtime Eligibility</h5>
                  <Form.Group
                    controlId="overtimeEligibilityHours"
                    className="mb-3"
                  >
                    <Form.Label>Overtime Eligibility Hours</Form.Label>
                    <Form.Control
                      type="number"
                      name="overtimeEligibilityHours"
                      value={attendancePolicies.overtimeEligibilityHours}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Overtime Rate */}
                  <h5>Overtime Rate</h5>
                  <Form.Group controlId="overtimeRate" className="mb-3">
                    <Form.Label>Overtime Rate (Multiplier)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      name="overtimeRate"
                      value={attendancePolicies.overtimeRate}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Maximum Leave Carryover */}
                  <h5>Maximum Leave Carryover</h5>
                  <Form.Group
                    controlId="maximumLeaveCarryover"
                    className="mb-3"
                  >
                    <Form.Label>Maximum Leave Carryover</Form.Label>
                    <Form.Control
                      type="number"
                      name="maximumLeaveCarryover"
                      value={attendancePolicies.maximumLeaveCarryover}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Auto-Absence Threshold */}
                  <h5>Auto-Absence Threshold</h5>
                  <Form.Group controlId="autoAbsenceThreshold" className="mb-3">
                    <Form.Label>Auto-Absence Threshold (Days)</Form.Label>
                    <Form.Control
                      type="number"
                      name="autoAbsenceThreshold"
                      value={attendancePolicies.autoAbsenceThreshold}
                      onChange={handleAttendancePoliciesChange}
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Months Between Hikes or Advances */}
                  <h5>Months Between Hikes or Advances</h5>
                  <Form.Group
                    controlId="monthsBetweenHikesOrAdvances"
                    className="mb-3"
                  >
                    <Form.Label>Months Between Hikes or Advances</Form.Label>
                    <Form.Control
                      type="number"
                      name="monthsBetweenHikesOrAdvances"
                      value={monthsBetweenHikesOrAdvances}
                      onChange={(e) =>
                        setMonthsBetweenHikesOrAdvances(
                          parseInt(e.target.value)
                        )
                      }
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Save Button */}
                  <Button variant="primary" onClick={handleSavePolicies}>
                    Save Policies
                  </Button>
                </Form>
              </Tab>
              {/* Shift Timings Tab */}
              <Tab eventKey="shiftTimings" title="Shift Timings">
                <Button
                  variant="primary"
                  onClick={() => handleShowShiftTimingModal()}
                  className="mb-3"
                >
                  Add Shift Timing
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftTimings.length > 0 ? (
                      shiftTimings.map((st, index) => (
                        <tr key={st.id}>
                          <td>{index + 1}</td>
                          <td>{st.name}</td>
                          <td>{st.startTime}</td>
                          <td>{st.endTime}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowShiftTimingModal(st.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({
                                  type: "shiftTiming",
                                  id: st.id,
                                });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Shift Timings added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              {/* Holidays Tab */}
              <Tab eventKey="holidays" title="Holidays">
                <Button
                  variant="primary"
                  onClick={() => handleShowHolidayModal()}
                  className="mb-3"
                >
                  Declare Holiday
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Recurring</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidays.length > 0 ? (
                      holidays.map((h, index) => (
                        <tr key={h.id}>
                          <td>{index + 1}</td>
                          <td>{h.name}</td>
                          <td>{h.date}</td>
                          <td>{h.recurring ? "Yes" : "No"}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowHolidayModal(h.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({ type: "holiday", id: h.id });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Holidays declared.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              {/* Deductions Tab */}
              <Tab eventKey="deductions" title="Deductions">
                <Button
                  variant="primary"
                  onClick={() => handleShowDeductionModal()}
                  className="mb-3"
                >
                  Add Deduction
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Percentage (%)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductions.length > 0 ? (
                      deductions.map((d, index) => (
                        <tr key={d.id}>
                          <td>{index + 1}</td>
                          <td>{d.name}</td>
                          <td>{d.percentage}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowDeductionModal(d.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({ type: "deduction", id: d.id });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Deductions added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              {/* Payroll Cycles Tab */}
              <Tab eventKey="payrollCycles" title="Payroll Cycles">
                <Button
                  variant="primary"
                  onClick={() => handleShowPayrollCycleModal()}
                  className="mb-3"
                >
                  Add Payroll Cycle
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cycle Name</th>
                      <th>Processing Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollCycles.length > 0 ? (
                      payrollCycles.map((pc, index) => (
                        <tr key={pc.id}>
                          <td>{index + 1}</td>
                          <td>{pc.name}</td>
                          <td>{pc.processingDate}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowPayrollCycleModal(pc.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({
                                  type: "payrollCycle",
                                  id: pc.id,
                                });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Payroll Cycles added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              {/* Leave Systems Tab */}
              <Tab eventKey="leaveSystems" title="Leave Systems">
                <Button
                  variant="primary"
                  onClick={() => handleShowLeaveSystemModal()}
                  className="mb-3"
                >
                  Add Leave System
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Working Days</th>
                      <th>Monthly Paid Leaves</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveSystems.length > 0 ? (
                      leaveSystems.map((ls, index) => (
                        <tr key={ls.id}>
                          <td>{index + 1}</td>
                          <td>{ls.name}</td>
                          <td>{ls.workingDays.join(", ")}</td>
                          <td>{ls.monthlyPaidLeaves}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowLeaveSystemModal(ls.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({
                                  type: "leaveSystem",
                                  id: ls.id,
                                });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Leave Systems added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              {/* Employment Types Tab */}
              <Tab eventKey="employmentTypes" title="Employment Types">
                <Button
                  variant="primary"
                  onClick={() => handleShowEmploymentTypeModal()}
                  className="mb-3"
                >
                  Add Employment Type
                </Button>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Deductions</th>
                      <th>Payroll Cycle</th>
                      <th>Leave System</th>
                      <th>Salary Hike (%)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employmentTypes.length > 0 ? (
                      employmentTypes.map((et, index) => (
                        <tr key={et.id}>
                          <td>{index + 1}</td>
                          <td>{et.name}</td>
                          <td>
                            {et.deductions
                              .map(
                                (dId) =>
                                  deductions.find((d) => d.id === dId)?.name
                              )
                              .join(", ")}
                          </td>
                          <td>
                            {
                              payrollCycles.find(
                                (pc) => pc.id === et.payrollCycleId
                              )?.name
                            }
                          </td>
                          <td>
                            {
                              leaveSystems.find(
                                (ls) => ls.id === et.leaveSystemId
                              )?.name
                            }
                          </td>
                          <td>{et.salaryHikePercentage}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() =>
                                handleShowEmploymentTypeModal(et.id)
                              }
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteItem({
                                  type: "employmentType",
                                  id: et.id,
                                });
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Employment Types added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>

            {/* Modals */}

            {/* Shift Timing Modal */}
            <Modal
              show={showShiftTimingModal}
              onHide={handleCloseShiftTimingModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editShiftTimingId ? "Edit Shift Timing" : "Add Shift Timing"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="shiftTimingName" className="mb-3">
                    <Form.Label>Shift Timing Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newShiftTiming.name}
                      onChange={handleShiftTimingChange}
                      placeholder="Enter shift timing name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="shiftStartTime" className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={newShiftTiming.startTime}
                      onChange={handleShiftTimingChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="shiftEndTime" className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={newShiftTiming.endTime}
                      onChange={handleShiftTimingChange}
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseShiftTimingModal}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddOrUpdateShiftTiming}
                >
                  {editShiftTimingId ? "Save Changes" : "Add Shift Timing"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Holiday Modal */}
            <Modal
              show={showHolidayModal}
              onHide={handleCloseHolidayModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editHolidayId ? "Edit Holiday" : "Declare Holiday"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="holidayName" className="mb-3">
                    <Form.Label>Holiday Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newHoliday.name}
                      onChange={handleHolidayChange}
                      placeholder="Enter holiday name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="holidayDate" className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={newHoliday.date}
                      onChange={handleHolidayChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="holidayRecurring" className="mb-3">
                    <Form.Label>Recurring</Form.Label>
                    <Form.Control
                      as="select"
                      name="recurring"
                      value={newHoliday.recurring}
                      onChange={(e) =>
                        setNewHoliday((prev) => ({
                          ...prev,
                          recurring: e.target.value === "true",
                        }))
                      }
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseHolidayModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddOrUpdateHoliday}>
                  {editHolidayId ? "Save Changes" : "Declare Holiday"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Deduction Modal */}
            <Modal
              show={showDeductionModal}
              onHide={handleCloseDeductionModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editDeductionId ? "Edit Deduction" : "Add Deduction"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="deductionName" className="mb-3">
                    <Form.Label>Deduction Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newDeduction.name}
                      onChange={handleDeductionChange}
                      placeholder="Enter deduction name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="deductionPercentage" className="mb-3">
                    <Form.Label>Percentage (%)</Form.Label>
                    <Form.Control
                      type="number"
                      name="percentage"
                      value={newDeduction.percentage}
                      onChange={handleDeductionChange}
                      placeholder="Enter percentage"
                      min="0"
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeductionModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddOrUpdateDeduction}>
                  {editDeductionId ? "Save Changes" : "Add Deduction"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Payroll Cycle Modal */}
            <Modal
              show={showPayrollCycleModal}
              onHide={handleClosePayrollCycleModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editPayrollCycleId
                    ? "Edit Payroll Cycle"
                    : "Add Payroll Cycle"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="payrollCycleName" className="mb-3">
                    <Form.Label>Cycle Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newPayrollCycle.name}
                      onChange={handlePayrollCycleChange}
                      placeholder="Enter cycle name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="processingDate" className="mb-3">
                    <Form.Label>Processing Date</Form.Label>
                    <Form.Control
                      type="number"
                      name="processingDate"
                      value={newPayrollCycle.processingDate}
                      onChange={handlePayrollCycleChange}
                      placeholder="Enter processing date (day of month)"
                      min="1"
                      max="31"
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleClosePayrollCycleModal}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddOrUpdatePayrollCycle}
                >
                  {editPayrollCycleId ? "Save Changes" : "Add Payroll Cycle"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Leave System Modal */}
            <Modal
              show={showLeaveSystemModal}
              onHide={handleCloseLeaveSystemModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editLeaveSystemId ? "Edit Leave System" : "Add Leave System"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="leaveSystemName" className="mb-3">
                    <Form.Label>Leave System Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newLeaveSystem.name}
                      onChange={handleLeaveSystemChange}
                      placeholder="Enter leave system name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="workingDays" className="mb-3">
                    <Form.Label>Working Days</Form.Label>
                    <div className="mb-3">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <Form.Check
                          inline
                          key={day}
                          label={day}
                          type="checkbox"
                          checked={newLeaveSystem.workingDays.includes(day)}
                          onChange={() => handleWorkingDaysChange(day)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="monthlyPaidLeaves" className="mb-3">
                    <Form.Label>Monthly Paid Leaves</Form.Label>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleMonthlyPaidLeavesChange(-0.5)}
                        disabled={newLeaveSystem.monthlyPaidLeaves <= 0}
                      >
                        -
                      </Button>
                      <span className="mx-3">
                        {newLeaveSystem.monthlyPaidLeaves}
                      </span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleMonthlyPaidLeavesChange(0.5)}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseLeaveSystemModal}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddOrUpdateLeaveSystem}
                >
                  {editLeaveSystemId ? "Save Changes" : "Add Leave System"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Employment Type Modal */}
            <Modal
              show={showEmploymentTypeModal}
              onHide={handleCloseEmploymentTypeModal}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editEmploymentTypeId
                    ? "Edit Employment Type"
                    : "Add Employment Type"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="employmentTypeName" className="mb-3">
                    <Form.Label>Employment Type Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newEmploymentType.name}
                      onChange={handleEmploymentTypeChange}
                      placeholder="Enter employment type name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="deductions" className="mb-3">
                    <Form.Label>Select Deductions</Form.Label>
                    <div>
                      {deductions.map((deduction) => (
                        <Form.Check
                          key={deduction.id}
                          type="checkbox"
                          label={deduction.name}
                          checked={newEmploymentType.deductions.includes(
                            deduction.id
                          )}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setNewEmploymentType((prev) => ({
                              ...prev,
                              deductions: checked
                                ? [...prev.deductions, deduction.id]
                                : prev.deductions.filter(
                                    (id) => id !== deduction.id
                                  ),
                            }));
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="payrollCycleId" className="mb-3">
                    <Form.Label>Select Payroll Cycle</Form.Label>
                    <Form.Control
                      as="select"
                      name="payrollCycleId"
                      value={newEmploymentType.payrollCycleId}
                      onChange={handleEmploymentTypeChange}
                    >
                      <option value="">Select Payroll Cycle</option>
                      {payrollCycles.map((pc) => (
                        <option key={pc.id} value={pc.id}>
                          {pc.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="leaveSystemId" className="mb-3">
                    <Form.Label>Select Leave System</Form.Label>
                    <Form.Control
                      as="select"
                      name="leaveSystemId"
                      value={newEmploymentType.leaveSystemId}
                      onChange={handleEmploymentTypeChange}
                    >
                      <option value="">Select Leave System</option>
                      {leaveSystems.map((ls) => (
                        <option key={ls.id} value={ls.id}>
                          {ls.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="salaryHikePercentage" className="mb-3">
                    <Form.Label>Salary Hike Percentage</Form.Label>
                    <Form.Control
                      type="number"
                      name="salaryHikePercentage"
                      value={newEmploymentType.salaryHikePercentage}
                      onChange={handleEmploymentTypeChange}
                      placeholder="Enter salary hike percentage"
                      min="0"
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseEmploymentTypeModal}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddOrUpdateEmploymentType}
                >
                  {editEmploymentTypeId
                    ? "Save Changes"
                    : "Add Employment Type"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanySettings;
