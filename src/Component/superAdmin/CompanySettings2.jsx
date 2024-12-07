import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Table,
  Form,
  Tabs,
  Tab,
  Alert,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Reusable Confirmation Modal
const ConfirmationModal = ({ show, onHide, onConfirm, title, body }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

const CompanySettings2 = () => {
  const [settings, setSettings] = useState(null); // Initially null to check existence
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modals State
  const [showOffDayModal, setShowOffDayModal] = useState(false);
  const [newOffDay, setNewOffDay] = useState("");

  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [editDeductionId, setEditDeductionId] = useState(null);
  const [newDeduction, setNewDeduction] = useState({
    name: "",
    amount: 0,
  });

  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [editHolidayId, setEditHolidayId] = useState(null);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "", id: null });

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.success && response.data.data) {
          setSettings(response.data.data); // Single settings object
        } else {
          setSettings(null); // No settings exist
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle form submission for creating or updating settings
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Destructure _id out of values, and collect the rest in submitValues
      const { _id, ...submitValues } = values;

      let response;
      if (settings && settings._id) {
        // Update existing settings (excluding sub-resources)
        response = await axios.put(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",

          { ...submitValues }, // Exclude _id
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new settings (excluding sub-resources)
        response = await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",

          { ...submitValues }, // Exclude _id
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.data.success) {
        setMessage(
          settings && settings._id
            ? "Settings updated successfully"
            : "Settings created successfully"
        );
        setSettings(response.data.data); // Update settings with response data
      } else {
        throw new Error(response.data.message || "Failed to save settings");
      }
    } catch (error) {
      console.error(error);
      // Extract detailed error messages if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.details
      ) {
        const detailedErrors = error.response.data.details
          .map((detail) => detail.message)
          .join(", ");
        setError(detailedErrors);
      } else {
        setError(error.response?.data?.message || "Failed to save settings");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================== Deductions Handlers ==================

  const handleDeductionChange = (e) => {
    const { name, value } = e.target;
    setNewDeduction((prevDeduction) => ({
      ...prevDeduction,
      [name]: value,
    }));
  };

  const handleAddOrUpdateDeduction = async () => {
    if (!newDeduction.name || newDeduction.amount < 0) {
      setError("Deduction name is required and amount must be non-negative.");
      return;
    }

    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      if (editDeductionId) {
        // Update existing deduction
        const response = await axios.put(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/deductions/${editDeductionId}`,

          { name: newDeduction.name, amount: newDeduction.amount },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setMessage("Deduction updated successfully.");
          // Update local state
          const updatedDeductions = settings.deductions.map((deduction) =>
            deduction._id === editDeductionId ? response.data.data : deduction
          );
          setSettings({ ...settings, deductions: updatedDeductions });
        } else {
          throw new Error(
            response.data.message || "Failed to update deduction."
          );
        }
      } else {
        // Add new deduction
        const response = await axios.post(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/deductions`,

          newDeduction,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setMessage("Deduction added successfully.");
          setSettings({
            ...settings,
            deductions: [...settings.deductions, response.data.data],
          });
        } else {
          throw new Error(response.data.message || "Failed to add deduction.");
        }
      }
      handleCloseDeductionModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to manage deduction.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeduction = async () => {
    if (!deleteItem.id) return;
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/deductions/${deleteItem.id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setMessage("Deduction deleted successfully.");
        setSettings({
          ...settings,
          deductions: settings.deductions.filter(
            (deduction) => deduction._id !== deleteItem.id
          ),
        });
      } else {
        throw new Error(response.data.message || "Failed to delete deduction.");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete deduction.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteItem({ type: "", id: null });
    }
  };

  const handleShowDeductionModal = (id = null) => {
    if (id) {
      const deduction = settings.deductions.find((d) => d._id === id);
      setNewDeduction({ name: deduction.name, amount: deduction.amount });
      setEditDeductionId(id);
    } else {
      setNewDeduction({ name: "", amount: 0 });
      setEditDeductionId(null);
    }
    setShowDeductionModal(true);
  };

  const handleCloseDeductionModal = () => {
    setShowDeductionModal(false);
    setNewDeduction({ name: "", amount: 0 });
    setEditDeductionId(null);
  };

  // ================== Holidays Handlers ==================

  const handleHolidayChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prevHoliday) => ({
      ...prevHoliday,
      [name]: value,
    }));
  };

  const handleAddOrUpdateHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) {
      setError("Holiday name and date are required.");
      return;
    }

    // Check for duplicate dates
    const isDuplicate = settings.holidays.some(
      (holiday) =>
        holiday.date.split("T")[0] === newHoliday.date &&
        (editHolidayId === null || holiday._id !== editHolidayId)
    );

    if (isDuplicate) {
      setError("A holiday on this date already exists.");
      return;
    }

    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      if (editHolidayId) {
        // Update existing holiday
        const response = await axios.put(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/holidays/${editHolidayId}`,

          { name: newHoliday.name, date: newHoliday.date },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setMessage("Holiday updated successfully.");
          // Update local state
          const updatedHolidays = settings.holidays.map((holiday) =>
            holiday._id === editHolidayId ? response.data.data : holiday
          );
          setSettings({ ...settings, holidays: updatedHolidays });
        } else {
          throw new Error(response.data.message || "Failed to update holiday.");
        }
      } else {
        // Add new holiday
        const response = await axios.post(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/holidays`,

          newHoliday,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setMessage("Holiday added successfully.");
          setSettings({
            ...settings,
            holidays: [...settings.holidays, response.data.data],
          });
        } else {
          throw new Error(response.data.message || "Failed to add holiday.");
        }
      }
      handleCloseHolidayModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to manage holiday.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHoliday = async () => {
    if (!deleteItem.id) return;
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/holidays/${deleteItem.id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setMessage("Holiday deleted successfully.");
        setSettings({
          ...settings,
          holidays: settings.holidays.filter(
            (holiday) => holiday._id !== deleteItem.id
          ),
        });
      } else {
        throw new Error(response.data.message || "Failed to delete holiday.");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete holiday.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteItem({ type: "", id: null });
    }
  };

  const handleShowHolidayModal = (id = null) => {
    if (id) {
      const holiday = settings.holidays.find((h) => h._id === id);
      setNewHoliday({
        name: holiday.name,
        date: holiday.date.split("T")[0], // Format date for input
      });
      setEditHolidayId(id);
    } else {
      setNewHoliday({ name: "", date: "" });
      setEditHolidayId(null);
    }
    setShowHolidayModal(true);
  };

  const handleCloseHolidayModal = () => {
    setShowHolidayModal(false);
    setNewHoliday({ name: "", date: "" });
    setEditHolidayId(null);
  };

  // ================== Off Days Handlers ==================

  const handleAddOrUpdateOffDay = async () => {
    if (!newOffDay) {
      setError("Please select a valid day.");
      return;
    }

    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      // Prevent duplicates
      if (
        settings.permanentOffDays.some(
          (day) => day.toLowerCase() === newOffDay.toLowerCase()
        )
      ) {
        setError("This off day already exists.");
        return;
      }

      // Add new off day
      const response = await axios.post(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/offdays`,

        { day: newOffDay },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setMessage("Off day added successfully.");
        setSettings({
          ...settings,
          permanentOffDays: [...settings.permanentOffDays, response.data.data],
        });
      } else {
        throw new Error(response.data.message || "Failed to add off day.");
      }
      handleCloseOffDayModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to manage off day.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffDay = async () => {
    if (!deleteItem.id) return;
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings/offdays/${deleteItem.id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setMessage("Off day deleted successfully.");
        setSettings({
          ...settings,
          permanentOffDays: settings.permanentOffDays.filter(
            (day) => day !== deleteItem.id
          ),
        });
      } else {
        throw new Error(response.data.message || "Failed to delete off day.");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete off day.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteItem({ type: "", id: null });
    }
  };

  const handleShowOffDayModal = () => {
    setNewOffDay("");
    setShowOffDayModal(true);
  };

  const handleCloseOffDayModal = () => {
    setShowOffDayModal(false);
    setNewOffDay("");
  };

  // ================== Delete Confirmation ==================

  const handleDeleteSettings = async () => {
    if (!settings) return;
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setMessage("Settings deleted successfully");
        setSettings(null); // Reset settings
      } else {
        throw new Error(response.data.message || "Failed to delete settings");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete settings");
    } finally {
      setLoading(false);
    }
  };

  // Delete Confirmation Handler
  const confirmDelete = () => {
    const { type } = deleteItem;
    if (type === "settings") {
      handleDeleteSettings();
    } else if (type === "deduction") {
      handleDeleteDeduction();
    } else if (type === "holiday") {
      handleDeleteHoliday();
    } else if (type === "offDay") {
      handleDeleteOffDay();
    }
  };

  // ================== Form Validation Schemas ==================

  const validationSchema = Yup.object().shape({
    totalPaidLeaves: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Total Paid Leaves is required"),
    pfDeductionRate: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("PF Deduction Rate is required"),
    taxRate: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Tax Rate is required"),
    gstRate: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("GST Rate is required"),
    otherDeductions: Yup.number().min(0, "Must be greater than or equal to 0"),
    overTimeRate: Yup.number().min(0, "Must be greater than or equal to 0"),
  });

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="rzr-hm-sa-comp-overview-settings">
            <h2 className="rzr-hm-sa-comp-overview-title">Company Settings</h2>
            {loading && (
              <div className="rzr-hm-sa-loading">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {message && (
              <Alert
                className="rzr-hm-sa-alert-success"
                variant="success"
                onClose={() => setMessage("")}
                dismissible
              >
                {message}
              </Alert>
            )}

            {error && (
              <Alert
                className="rzr-hm-sa-alert-danger"
                variant="danger"
                onClose={() => setError("")}
                dismissible
              >
                {error}
              </Alert>
            )}

            <Tabs
              defaultActiveKey="general"
              id="company-settings-tabs"
              className="rzr-hm-sa-tabs mb-3"
            >
              <Tab eventKey="general" title="General">
                <Formik
                  initialValues={{
                    totalPaidLeaves: settings?.totalPaidLeaves || 0,
                    pfDeductionRate: settings?.pfDeductionRate || 0,
                    taxRate: settings?.taxRate || 0,
                    gstRate: settings?.gstRate || 0,
                    otherDeductions: settings?.otherDeductions || 0,
                    overTimeRate: settings?.overTimeRate || 0,
                  }}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                  }) => (
                    <Form
                      onSubmit={handleSubmit}
                      className="rzr-hm-sa-settings-form"
                    >
                      <Row className="mb-3">
                        <Col md="6">
                          <Form.Group controlId="formTotalPaidLeaves">
                            Total Paid Leaves
                            <Form.Control
                              type="number"
                              name="totalPaidLeaves"
                              value={values.totalPaidLeaves}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={
                                touched.totalPaidLeaves &&
                                !!errors.totalPaidLeaves
                              }
                              min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.totalPaidLeaves}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group controlId="formPfDeductionRate">
                            PF Deduction Rate (%)
                            <Form.Control
                              type="number"
                              name="pfDeductionRate"
                              value={values.pfDeductionRate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={
                                touched.pfDeductionRate &&
                                !!errors.pfDeductionRate
                              }
                              min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.pfDeductionRate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md="6">
                          <Form.Group controlId="formTaxRate">
                            Tax Rate (%)
                            <Form.Control
                              type="number"
                              name="taxRate"
                              value={values.taxRate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.taxRate && !!errors.taxRate}
                              min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.taxRate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group controlId="formGstRate">
                            GST Rate (%)
                            <Form.Control
                              type="number"
                              name="gstRate"
                              value={values.gstRate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.gstRate && !!errors.gstRate}
                              min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.gstRate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="rzr-hm-sa-buttons">
                        {!settings && (
                          <Button
                            variant="primary"
                            type="submit"
                            className="rzr-hm-sa-btn-create"
                          >
                            Create Settings
                          </Button>
                        )}
                        {settings && (
                          <>
                            <Button
                              variant="success"
                              type="submit"
                              className="rzr-hm-sa-btn-save"
                            >
                              Save Settings
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                setDeleteItem({
                                  type: "settings",
                                  id: settings._id,
                                });
                                setShowDeleteModal(true);
                              }}
                              className="rzr-hm-sa-btn-delete ms-2"
                            >
                              Delete Settings
                            </Button>
                          </>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </Tab>

              {/* Permanent Off Days Tab */}
              <Tab
                eventKey="offDays"
                title="Permanent Off Days"
                className="rzr-hm-sa-tab-content"
              >
                <div className="rzr-hm-sa-comp-section">
                  <Button
                    variant="primary"
                    onClick={() => handleShowOffDayModal()}
                    className="mb-3 rzr-hm-sa-comp-btn"
                    disabled={!settings}
                  >
                    Add Off Day
                  </Button>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Day</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings && settings.permanentOffDays.length > 0 ? (
                        settings.permanentOffDays.map((offDay, index) => (
                          <tr key={offDay}>
                            <td>{index + 1}</td>
                            <td>{offDay}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setDeleteItem({ type: "offDay", id: offDay });
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
                          <td colSpan="3" className="text-center">
                            No permanent off days added.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>

              {/* Deductions Tab */}
              <Tab
                eventKey="deductions"
                title="Deductions"
                className="rzr-hm-sa-tab-content"
              >
                <div className="rzr-hm-sa-comp-section">
                  <Button
                    variant="primary"
                    onClick={() => handleShowDeductionModal()}
                    className="mb-3 rzr-hm-sa-comp-btn"
                    disabled={!settings}
                  >
                    Add Deduction
                  </Button>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Deduction Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings && settings.deductions.length > 0 ? (
                        settings.deductions.map((deduction, index) => (
                          <tr key={deduction._id}>
                            <td>{index + 1}</td>
                            <td>{deduction.name}</td>
                            <td>{deduction.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No deductions available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>

              {/* Holidays Tab */}
              <Tab
                eventKey="holidays"
                title="Holidays"
                className="rzr-hm-sa-tab-content"
              >
                <div className="rzr-hm-sa-comp-section">
                  <Button
                    variant="primary"
                    onClick={() => handleShowHolidayModal()}
                    className="mb-3 rzr-hm-sa-comp-btn"
                    disabled={!settings}
                  >
                    Add Holiday
                  </Button>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Holiday Name</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings && settings.holidays.length > 0 ? (
                        settings.holidays.map((holiday, index) => (
                          <tr key={holiday._id}>
                            <td>{index + 1}</td>
                            <td>{holiday.name}</td>
                            <td>
                              {new Date(holiday.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No holidays available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>
            </Tabs>

            {/* Off Day Modal */}
            <Modal
              show={showOffDayModal}
              onHide={handleCloseOffDayModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Permanent Off Day</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formOffDay" className="mb-3">
                  <Form.Label> </Form.Label>
                  <Form.Control
                    as="select"
                    value={newOffDay}
                    onChange={(e) => setNewOffDay(e.target.value)}
                    required
                  >
                    <option value="">Select a day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </Form.Control>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOffDayModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddOrUpdateOffDay}>
                  Add Off Day
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
                  <Form.Group controlId="formDeductionName" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newDeduction.name}
                      onChange={handleDeductionChange}
                      placeholder="Enter deduction name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formDeductionAmount" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={newDeduction.amount}
                      onChange={handleDeductionChange}
                      placeholder="Enter amount"
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

            {/* Holiday Modal */}
            <Modal
              show={showHolidayModal}
              onHide={handleCloseHolidayModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editHolidayId ? "Edit Holiday" : "Add Holiday"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formHolidayName" className="mb-3">
                    <Form.Label> </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newHoliday.name}
                      onChange={handleHolidayChange}
                      placeholder="Enter holiday name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formHolidayDate" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={newHoliday.date}
                      onChange={handleHolidayChange}
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseHolidayModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddOrUpdateHoliday}>
                  {editHolidayId ? "Save Changes" : "Add Holiday"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              onConfirm={confirmDelete}
              title="Confirm Deletion"
              body="Are you sure you want to delete this item? This action cannot be undone."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanySettings2;
