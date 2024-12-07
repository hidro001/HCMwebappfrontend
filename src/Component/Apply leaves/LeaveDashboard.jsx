// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import { getLeaves, getNotifications } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplyLeave from "./ApplyLeave";
import LeaveRequests from "./LeaveRequests";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    fetchLeaves();
    fetchNotifications();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getLeaves();
      setLeaves(response.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>
        Welcome, {user.first_Name} {user.last_Name}
      </h2>
      <ApplyLeave fetchLeaves={fetchLeaves} />
      <LeaveRequests leaves={leaves} />
      <Notifications notifications={notifications} />
    </div>
  );
};

export default Dashboard;
