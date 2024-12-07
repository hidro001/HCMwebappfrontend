import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import service from "../../services/Service";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

const EmployeeDashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [isPerformerPopupVisible, setIsPerformerPopupVisible] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [isAnnouncementPopupVisible, setIsAnnouncementPopupVisible] =
    useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const [isBirthdayPopupVisible, setIsBirthdayPopupVisible] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);

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
      Swal.fire({
        title: "Error",
        text: "Failed to post birthday announcements.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

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

  const showPerformerPopup = (performer) => {
    setSelectedPerformer(performer);
    setIsPerformerPopupVisible(true);
  };

  const hidePerformerPopup = () => {
    setIsPerformerPopupVisible(false);
  };

  const showAnnouncementPopup = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsAnnouncementPopupVisible(true);
  };

  const hideAnnouncementPopup = () => {
    setIsAnnouncementPopupVisible(false);
  };

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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-4">
          <div className="row mt-3 mt-lg-5">
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

                  {isPopupVisible && (
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
                  )}
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
                {/* Today's Birthdays Section */}
                <div className="">
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
                              onClick={(event) =>
                                showBirthdayPopup(user, event)
                              }
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
                                <div
                                  style={{ fontSize: "0.9em", color: "#555" }}
                                >
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
                              onClick={(event) =>
                                showBirthdayPopup(user, event)
                              }
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
                                <div
                                  style={{ fontSize: "0.9em", color: "#555" }}
                                >
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
              </div>
              <div className=" mt-2 rzr-emp-holiday-container">
                <div className="rzr-emp-holiday">
                  <div className="rzr-emp-holiday-head">Calender</div>
                  <div className="rzr-hm-emp-cla calendar-container">
                    <div className="calendar-body">
                      <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="dashboard-calendar"
                      />
                    </div>
                    <div className="calendar-footer">
                      <p>Selected Date: {selectedDate.toDateString()}</p>
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

            <div className="col-lg-6">
              <div className="top-performer">
                <div className="top-head d-flex align-items-center gap-3 pb-3">
                  <div className="widget-box">
                    <div className="widget-header">
                      <h2>Announcements</h2>
                      <Link to={"/dashboard/view-previous-announcements-hr"}>
                        <span style={{ color: "#fff" }}>
                          <span className="me-2">View All</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="14"
                            width="12.25"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="#ffffff"
                              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                {announcements.slice(0, 4).map((announcement) => (
                  <div
                    className="top-employee"
                    key={announcement._id}
                    onClick={() => showAnnouncementPopup(announcement)}
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
              </div>
            </div>
          </div>
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
        </div>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
