import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Puff } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { FaUserEdit, FaArrowLeft } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  console.log("parmas for id", id);
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setEmployeeData(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch employee details.");
        toast.error(
          response.data.message || "Failed to fetch employee details."
        );
      }
    } catch (err) {
      console.error("Error fetching employee details:", err);
      setError(err.message || "An error occurred.");
      toast.error(
        err.message || "An error occurred while fetching employee details."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Puff type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="main">
      <div className="ems-content ">
        <motion.div
          className="container rzr-emp-details-super"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Employee Details</h2>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Back to List
            </motion.button>
          </div>
          <div className="card shadow-lg p-4">
            <div className="row">
              {/* Profile Section */}
              <div className="col-md-4 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150 }}
                >
                  <img
                    src={employeeData.user_Avatar}
                    alt={`${employeeData.first_Name} ${employeeData.last_Name}`}
                    className="img-fluid rounded-circle"
                    style={{
                      maxWidth: "200px",
                      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </motion.div>
                <h3 className="mt-3 text-primary">{`${employeeData.first_Name} ${employeeData.last_Name}`}</h3>
                <p className="text-muted">{employeeData.designation}</p>
              </div>

              {/* General Info Section */}
              <div className="col-md-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="text-primary">General Information</h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <p>
                        <strong>Employee ID:</strong> {employeeData.employee_Id}
                      </p>
                      <p>
                        <strong>Department:</strong> {employeeData.department}
                      </p>
                      <p>
                        <strong>Date of Joining:</strong>{" "}
                        {employeeData.date_of_Joining}
                      </p>
                      <p>
                        <strong>Employee Type:</strong>{" "}
                        {employeeData.employee_Type}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        <strong>Shift Timing:</strong>{" "}
                        {employeeData.shift_Timing}
                      </p>
                      <p>
                        <strong>Salary:</strong> ₹{employeeData.salary}
                      </p>
                      <p>
                        <strong>Role:</strong> {employeeData.user_Role}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {employeeData.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <hr />

            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-primary">Contact Information</h4>
              <div className="row">
                <div className="col-sm-6">
                  <p>
                    <strong>Mobile:</strong> {employeeData.mobile_No}
                  </p>
                  <p>
                    <strong>Personal Email:</strong>{" "}
                    {employeeData.personal_Email_Id}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <strong>Office Email:</strong>{" "}
                    {employeeData.working_Email_Id}
                  </p>
                  <p>
                    <strong>Address:</strong> {employeeData.address}
                  </p>
                </div>
              </div>
            </motion.div>

            <hr />

            {/* Documents Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-primary">Documents</h4>
              <ul>
                {employeeData.documents.map((doc) => (
                  <li key={doc._id}>
                    <AiOutlineFileText className="me-2 text-success" />
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <hr />

            {/* Assigned Managers */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="text-primary">Assigned Managers</h4>
              <ul>
                {employeeData.assigned_to.map((manager) => (
                  <li key={manager._id}>
                    {manager.first_Name} {manager.last_Name} (
                    {manager.employee_Id})
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4">
              {/* <motion.button
                className="btn btn-primary me-3"
                whileHover={{ scale: 1.1 }}
                onClick={() =>
                  navigate(`/dashboard/update/${employeeData._id}`)
                }
              >
                <FaUserEdit className="me-2" /> Edit Employee
              </motion.button> */}
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="me-2" /> Back to List
              </motion.button>
            </div>
          </div>
          <ToastContainer />
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
