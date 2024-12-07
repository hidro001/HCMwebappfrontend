import { useState, useEffect } from "react";
import service from "../../services/Service";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    performerName: "",
    performerDepartment: "",
    performerImg: null,
    performerDescription: "",
  });
  const [isAnnouncementPopupVisible, setIsAnnouncementPopupVisible] =
    useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersLoggedInToday, setUsersLoggedInToday] = useState(0);
  const [employeesOnLeaveToday, setEmployeesOnLeaveToday] = useState(0);

  const [announcements, setAnnouncements] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [isPerformerPopupVisible, setIsPerformerPopupVisible] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const [isBirthdayPopupVisible, setIsBirthdayPopupVisible] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [employeesPerDepartment, setEmployeesPerDepartment] = useState([]);
  const [todayBirthday, setTodayBirthday] = useState([]);

  // New state to track if birthday announcement has been sent today
  const [birthdayAnnouncementSent, setBirthdayAnnouncementSent] =
    useState(false);

  // Function to handle clicking on a birthday user
  const showBirthdayPopup = (birthdayUser, event) => {
    event.stopPropagation(); // Prevent any parent handlers from being executed
    setSelectedBirthday(birthdayUser);
    setIsBirthdayPopupVisible(true);
  };

  const hideBirthdayPopup = () => {
    setIsBirthdayPopupVisible(false);
  };

  const getTodayBirthdays = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/user/birthdays/today",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Extract birthdays from the response
      const { birthdays } = response.data;
      setTodayBirthdays(birthdays); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching today's birthdays:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch today's birthdays.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // Fetch birthdays on component mount
  useEffect(() => {
    getTodayBirthdays();
  }, []);

  // Function to handle Birthday Announcement
  const handleBirthdayAnnouncement = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/user/birthday",
        {}, // Assuming no body is needed; adjust if parameters are required
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Mark that the announcement has been sent
      setBirthdayAnnouncementSent(true);
    } catch (error) {
      console.error("Error posting birthday announcement:", error);
    }
  };
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setTotalUsers(response.data.totalUsers);
          setUsersLoggedInToday(response.data.numberOfUsersLoggedInToday);
          setEmployeesOnLeaveToday(response.data.numberOfEmployeesOnLeaveToday);
          setEmployeesPerDepartment(response.data.employeesPerDepartment); // Set the new data
        } else {
          console.error(
            "Failed to fetch dashboard stats:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  // Automatically send birthday announcement and fetch birthdays on component mount
  useEffect(() => {
    const sendAnnouncementAndFetchBirthdays = async () => {
      // Optionally, check if the announcement has already been sent today
      if (!birthdayAnnouncementSent) {
        await handleBirthdayAnnouncement();
      }
      await "";
    };

    sendAnnouncementAndFetchBirthdays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await service.fetchAnnouncementListEmployee();
        setAnnouncements(data.data); // Assuming the API response has a data field containing the announcements
      } catch (error) {
        console.error("Error fetching announcement list:", error);
      }
    };

    getAnnouncements();
  }, []);

  const showPerformerPopup = (performer, event) => {
    event.stopPropagation(); // Prevent any parent handlers from being executed
    setSelectedPerformer(performer);
    setIsPerformerPopupVisible(true);
  };

  const hidePerformerPopup = () => {
    setIsPerformerPopupVisible(false);
  };

  const showAnnouncementPopup = (announcement, event) => {
    event.stopPropagation(); // Prevent any parent handlers from being executed
    setSelectedAnnouncement(announcement);
    setIsAnnouncementPopupVisible(true);
  };

  const hideAnnouncementPopup = () => {
    setIsAnnouncementPopupVisible(false);
  };

  const fetchTopPerformers = async (month, year) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/performance/top-performer",
        {
          params: { month, year }, // Sending month and year as query params
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setTopPerformers(response.data.TopPerformers);
      } else {
        setTopPerformers([]);
        console.error("Failed to fetch top performers:", response.data.message);
      }
    } catch (error) {
      setTopPerformers([]);
      console.error("Error fetching top performers:", error);
    }
  };

  // Add this useEffect alongside your existing useEffect hooks
  // Add this useEffect alongside your existing useEffect hooks
  useEffect(() => {
    fetchTopPerformers(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const showPopupForm = () => {
    setIsPopupVisible(true);
  };

  const hidePopupForm = () => {
    setIsPopupVisible(false);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new performer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const performerDetails = new FormData();
        performerDetails.append("performerName", formData.performerName);
        performerDetails.append(
          "performerDepartment",
          formData.performerDepartment
        );
        if (formData.performerImg) {
          performerDetails.append("performerImg", formData.performerImg);
        }
        performerDetails.append(
          "performerDescription",
          formData.performerDescription
        );

        const response = await addPerformer(performerDetails);

        if (response.success) {
          Swal.fire({
            title: "Success",
            text: "Performer added successfully.",
            icon: "success",
            confirmButtonText: "Ok",
          });

          setFormData({
            performerName: "",
            performerDepartment: "",
            performerImg: null,
            performerDescription: "",
          });

          hidePopupForm();
          getPerformers(selectedMonth, selectedYear); // Refresh the performer list
        } else {
          console.error("Failed to add performer:", response.message);
        }
      } catch (error) {
        console.error("Error adding performer:", error);
      }
    }
  };

  const addPerformer = async (performerDetails) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/admin/add-performer",
        performerDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  const months = [
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

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i);
  }

  const HandleDeletePerformer = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `https://apiv2.humanmaximizer.com/api/v1/performer/${id}`,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting performer:", error);
    }
  };

  const HandleUpdatePerformer = async (_id) => {
    alert(_id);
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="row">
            <div className="hm-dash-head-cards-container">
              {/* <div className="hm-dash-head-cards-row">
                <div className="hm-dash-head-cards-col">
                  <div
                    className="hm-dash-head-card animated-card"
                    id="storageCard"
                  >
                    <div className="hm-dash-head-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="42"
                        width="50"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l448 0c53 0 96-43 96-96l0-320c0-53-43-96-96-96L96 0zM64 96c0-17.7 14.3-32 32-32l448 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32L64 96zm159.8 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM96 309.3c0 14.7 11.9 26.7 26.7 26.7l56.1 0c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4l-69.3 0C119.9 256 96 279.9 96 309.3zM461.2 336l56.1 0c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3l-69.3 0c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1l-80 0c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-8.6-24.3-29.9-42.6-55.9-47zM512 176a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                        />
                      </svg>
                    </div>
                    <div className="hm-dash-head-card-title">Total Teams</div>
                    <div className="hm-dash-head-card-data">10</div>
                    <hr />
                  </div>
                </div>
                <div className="hm-dash-head-cards-col">
                  <div
                    className="hm-dash-head-card animated-card"
                    id="leaderCard"
                  >
                    <div className="hm-dash-head-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="42"
                        width="50"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"
                        />
                      </svg>
                    </div>
                    <div className="hm-dash-head-card-title">
                      Total Team Leader
                    </div>
                    <div className="hm-dash-head-card-data">10</div>
                    <hr />
                  </div>
                </div>
                <div className="hm-dash-head-cards-col">
                  <div
                    className="hm-dash-head-card animated-card"
                    id="employeeCard"
                  >
                    <div className="hm-dash-head-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40"
                        width="36"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"
                        />
                      </svg>
                    </div>
                    <div className="hm-dash-head-card-title">
                      Total Employees
                    </div>
                    <div className="hm-dash-head-card-data">50</div>
                    <hr />
                  </div>
                </div>
                <div className="hm-dash-head-cards-col">
                  <div
                    className="hm-dash-head-card animated-card"
                    id="projectCard"
                  >
                    <div className="hm-dash-head-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40"
                        width="40"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                        />
                      </svg>
                    </div>
                    <div className="hm-dash-head-card-title">
                      Active Project
                    </div>
                    <div className="hm-dash-head-card-data">12</div>
                    <hr />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="hm-dash-head-cards-container">
            <div className="hm-dash-head-cards-row">
              {/* Total Employees Card */}
              <div className="hm-dash-head-cards-col">
                <div
                  className="hm-dash-head-card animated-card"
                  id="employeeCard"
                >
                  <div className="hm-dash-head-card-icon">
                    {/* Include the SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="40"
                      width="36"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"
                      />
                    </svg>
                  </div>
                  <div className="hm-dash-head-card-title">Total Employees</div>
                  <div className="hm-dash-head-card-data">{totalUsers}</div>
                  <hr />
                </div>
              </div>

              {/* Users Logged In Today Card */}
              <div className="hm-dash-head-cards-col">
                <div
                  className="hm-dash-head-card animated-card"
                  id="employeeCard"
                >
                  <div className="hm-dash-head-card-icon">
                    {/* Include the SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="40"
                      width="36"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"
                      />
                    </svg>
                  </div>
                  <div className="hm-dash-head-card-title">
                    Users Logged In Today
                  </div>
                  <div className="hm-dash-head-card-data">
                    {usersLoggedInToday}
                  </div>
                  <hr />
                </div>
              </div>

              {/* Employees On Leave Today Card */}
              <div className="hm-dash-head-cards-col">
                <div
                  className="hm-dash-head-card animated-card"
                  id="employeeCard"
                >
                  <div className="hm-dash-head-card-icon">
                    {/* Include the SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="40"
                      width="36"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"
                      />
                    </svg>
                  </div>
                  <div className="hm-dash-head-card-title">
                    Employees On Leave Today
                  </div>
                  <div className="hm-dash-head-card-data">
                    {employeesOnLeaveToday}
                  </div>
                  <hr />
                </div>
              </div>

              {/* Employees Per Department Section */}
            </div>
          </div>
          <div className="mt-4 hm-empperdpt text-center">
            <h2>Employees Per Department</h2>
            <div className="department-list">
              {employeesPerDepartment.length === 0 ? (
                <p>No departments found.</p>
              ) : (
                employeesPerDepartment.map((dept) => (
                  <div className="department-item" key={dept.department}>
                    <h3>{dept.department || "Unassigned"}</h3>
                    <p>Employees: {dept.count}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="row mt-3 mt-lg-4 p-5">
            <div className="col-lg-6 col-xl-6 col-md-6">
              <div className="top-performer">
                <div className="widget-box">
                  <div className="widget-header d-flex justify-content-between align-items-center">
                    <h2>Top Performers</h2>
                    <Link to={"/dashboard/make-announcement"}>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="17.5"
                        onClick={showPopupForm}
                        viewBox="0 0 448 512"
                        className="cursor-pointer"
                      >
                        <path
                          fill="#ffffff"
                          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                        />
                        ADD
                      </svg> */}
                    </Link>
                  </div>

                  {/* {isPopupVisible && (
                    <>
                      <div
                        id="overlay1"
                        className="hm-rzr-performermth-overlay"
                        onClick={hidePopupForm}
                      ></div>
                      <div
                        id="popupForm1"
                        className="hm-rzr-performermth-popup-form"
                      >
                        <div className="hm-rzr-performermth-header mb-4">
                          <h4>Add Performer Of The Month</h4>
                        </div>
                        <form id="performerForm1" onSubmit={submitForm}>
                          <div className="hm-rzr-performermth-input-row">
                            <div
                              className={`hm-rzr-performermth-input-box ${
                                formData.performerName ? "filled" : ""
                              }`}
                            >
                              <input
                                type="text"
                                id="performerName"
                                name="performerName"
                                value={formData.performerName}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="performerName">Name</label>
                            </div>
                            <div
                              className={`hm-rzr-performermth-input-box ${
                                formData.performerDepartment ? "filled" : ""
                              }`}
                            >
                              <input
                                type="text"
                                id="performerDepartment"
                                name="performerDepartment"
                                value={formData.performerDepartment}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="performerDepartment">
                                Department
                              </label>
                            </div>
                          </div>
                          <div
                            className={`hm-rzr-performermth-input-box ${
                              formData.performerImg ? "filled" : ""
                            }`}
                          >
                            <input
                              type="file"
                              id="performerImg"
                              name="performerImg"
                              onChange={handleChange}
                            />
                            <label htmlFor="performerImg"></label>
                          </div>
                          <div
                            className={`hm-rzr-performermth-input-box ${
                              formData.performerDescription ? "filled" : ""
                            }`}
                          >
                            <textarea
                              name="performerDescription"
                              id="performerDescription"
                              value={formData.performerDescription}
                              onChange={handleChange}
                              required
                            ></textarea>
                            <label htmlFor="performerDescription">
                              Description
                            </label>
                          </div>
                          <div className="hm-rzr-performermth-button-row">
                            <button
                              type="submit"
                              className="hm-rzr-performermth-btn submit-btn"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="hm-rzr-performermth-btn close-btn"
                              onClick={hidePopupForm}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  )} */}
                </div>
                <div className="widget-content">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div
                          id="calendar"
                          className="razr-perfrmer-admin-calendar"
                        >
                          <div className="razr-perfrmer-admin-month-year">
                            <select
                              id="razrPerfrmerAdminMonthSelect"
                              value={selectedMonth}
                              onChange={handleMonthChange}
                              className="razr-perfrmer-admin-select"
                            >
                              {months.map((month, index) => (
                                <option key={index} value={index + 1}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <select
                              id="razrPerfrmerAdminYearSelect"
                              value={selectedYear}
                              onChange={handleYearChange}
                              className="razr-perfrmer-admin-select"
                            >
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birthday Popup */}
                  {isBirthdayPopupVisible && selectedBirthday && (
                    <div className="hcm-razr-admin-performer">
                      <div className="performer-popup-hcm">
                        <div className="performer-content">
                          <h2>{`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}</h2>
                          <img
                            src={
                              selectedBirthday.avtar ||
                              "https://via.placeholder.com/150"
                            }
                            alt={`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}
                            style={{
                              width: "150px",
                              borderRadius: "50%",
                              marginBottom: "10px",
                            }}
                          />
                          <p>Department: {selectedBirthday.department}</p>
                          <p>Designation: {selectedBirthday.designation}</p>
                          <button
                            onClick={hideBirthdayPopup}
                            className="btn btn-secondary"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="top-employee-list">
                    {topPerformers.length === 0 ? (
                      <p>No top performers found for this month.</p>
                    ) : (
                      topPerformers.map((performer) => (
                        <div
                          className="top-employee"
                          key={performer._id}
                          onClick={(event) =>
                            showPerformerPopup(performer, event)
                          }
                        >
                          <div className="top-emp">
                            <img
                              src={
                                performer.img ||
                                "https://via.placeholder.com/150" // Default image if img is null
                              }
                              alt={performer.fullName}
                            />
                          </div>
                          <div className="top-emp-details">
                            <a href="#" className="top-emp-name">
                              {performer.fullName}
                            </a>
                            <div className="emp-details">
                              <span className="emp-designation">
                                {performer.description}
                              </span>{" "}
                              ||
                              <span className="emp-process">
                                {performer.department}
                              </span>
                            </div>
                          </div>

                          {/* Optional: Edit and Delete buttons */}
                          {/* 
              <button
                onClick={() => HandleUpdatePerformer(performer._id)}
              >
                Edit
              </button>
              <button
                onClick={() => HandleDeletePerformer(performer._id)}
              >
                Delete
              </button> 
              */}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className=" mt-4">
                {/* <div className="widget-box">
                  <div className="widget-header d-flex justify-content-between align-items-center">
                    <h2>Today's Birthdays</h2>
                  </div>

                  <div className="widget-content">
                    <div className="birthday-list">
                      {todayBirthdays.length === 0 ? (
                        <p>No birthdays today.</p>
                      ) : (
                        todayBirthdays.map((user) => (
                          <div
                            className="birthday-item"
                            key={user._id}
                            onClick={(event) => showBirthdayPopup(user, event)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <img
                              src={
                                user.profileImage ||
                                "https://via.placeholder.com/50"
                              }
                              alt={`${user.first_Name} ${user.last_Name}`}
                              style={{
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                            />
                            <div>
                              <strong>{`${user.first_Name} ${user.last_Name}`}</strong>
                              <div style={{ fontSize: "0.9em", color: "#555" }}>
                                {user.department} - {user.designation}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div> */}

                <div className="widget-box">
                  <div className="widget-header d-flex justify-content-between align-items-center">
                    <h2>Today's Birthdays</h2>
                  </div>

                  <div className="widget-content">
                    <div className="birthday-list">
                      {todayBirthdays.length === 0 ? (
                        <p>No birthdays today.</p>
                      ) : (
                        todayBirthdays.map((user, index) => (
                          <div
                            className="birthday-item"
                            key={index}
                            onClick={(event) => showBirthdayPopup(user, event)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <img
                              src={
                                user.avtar || "https://via.placeholder.com/50"
                              }
                              alt={`${user.first_Name} ${user.last_Name}`}
                              style={{
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                            />
                            <div>
                              <strong>{`${user.first_Name} ${user.last_Name}`}</strong>
                              <div style={{ fontSize: "0.9em", color: "#555" }}>
                                {user.department} - {user.designation}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isPerformerPopupVisible && (
              <div className="hcm-razr-admin-performer">
                <div className="performer-popup-hcm">
                  <div className="performer-content">
                    <h2>{selectedPerformer.performerName}</h2>
                    <img
                      src={selectedPerformer.performerImg}
                      alt={selectedPerformer.performerName}
                    />
                    <p>{selectedPerformer.performerDescription}</p>
                    <p>Department: {selectedPerformer.performerDepartment}</p>
                    <button onClick={hidePerformerPopup}>Close</button>
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-6 col-xl-6 col-md-6">
              <div className="top-performer">
                <div className="widget-box">
                  <div className="widget-header">
                    <h2>Announcements</h2>
                  </div>
                </div>
                <ul>
                  {announcements.slice(0, 4).map((announcement) => (
                    <div
                      className="top-employee"
                      key={announcement._id}
                      onClick={(event) =>
                        showAnnouncementPopup(announcement, event)
                      }
                    >
                      <div className="top-emp">
                        <img
                          src={announcement.announcementPostImg}
                          alt={announcement.announcementSubject}
                        />
                      </div>
                      <div className="top-emp-details">
                        <a href="#" className="top-emp-name">
                          {announcement.announcementSubject}
                        </a>
                        <div className="emp-details">
                          <span className="emp-designation">
                            {announcement.announcementDate}
                          </span>
                          <br />
                          <span className="emp-process">
                            {announcement.announcementDescription}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isAnnouncementPopupVisible && (
                    <div className="hcm-razr-admin-performer">
                      <div className="performer-popup-hcm">
                        <div className="performer-content">
                          <h2>{selectedAnnouncement.announcementSubject}</h2>
                          <img
                            src={selectedAnnouncement.announcementPostImg}
                            alt={selectedAnnouncement.announcementSubject}
                          />
                          <p>{selectedAnnouncement.announcementDescription}</p>
                          <button onClick={hideAnnouncementPopup}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            {/* Today's Birthdays Section */}

            {/* Birthday Popup */}
            {/* {isBirthdayPopupVisible && selectedBirthday && (
              <div className="hcm-razr-admin-performer">
                <div className="performer-popup-hcm">
                  <div className="performer-content">
                    <h2>{`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}</h2>
                    <img
                      src={
                        selectedBirthday.profileImage ||
                        "https://via.placeholder.com/150"
                      }
                      alt={`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}
                      style={{
                        width: "150px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                      }}
                    />
                    <p>Department: {selectedBirthday.department}</p>
                    <p>Designation: {selectedBirthday.designation}</p>
                    <button
                      onClick={hideBirthdayPopup}
                      className="btn btn-secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {isBirthdayPopupVisible && selectedBirthday && (
              <div className="birthday-popup">
                <div className="popup-content">
                  <h2>{`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}</h2>
                  <img
                    src={
                      selectedBirthday.avtar ||
                      "https://via.placeholder.com/150"
                    }
                    alt={`${selectedBirthday.first_Name} ${selectedBirthday.last_Name}`}
                    style={{
                      width: "150px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <p>Department: {selectedBirthday.department}</p>
                  <p>Designation: {selectedBirthday.designation}</p>
                  <button
                    onClick={hideBirthdayPopup}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx="true">{`
        .employees-per-department {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
        }

        .department-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .department-item {
          flex: 1 1 200px;
          background-color: #f4f6f9;
          padding: 15px;
          border-radius: 8px;
        }

        .department-item h3 {
          margin-top: 0;
        }

        .department-item p {
          margin-bottom: 0;
        }
        .birthday-list {
          padding: 10px;
        }

        .birthday-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
          background-color: #f9f9f9;
          transition: background-color 0.3s;
        }

        .birthday-item:hover {
          background-color: #e9ecef;
        }

        .birthday-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .popup-content h2 {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
