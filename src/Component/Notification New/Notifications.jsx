// import React, { useState, useEffect } from "react";
// import { markNotificationAsRead } from "./notificationService";
// import axios from "axios";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         setError("No authorization token found.");
//         setLoading(false);
//         return;
//       }
//       const response = await axios.get("https://apiv2.humanmaximizer.com/api/v1/notification", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(response.data.data); // Assuming `data` holds the notifications array
//     } catch (err) {
//       setError(err.response ? err.response.data.message : "Error fetching notifications.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkAsRead = async (notificationId, index) => {
//     try {
//       await markNotificationAsRead(notificationId);
//       setNotifications((prev) =>
//         prev.map((notif, i) =>
//           i === index ? { ...notif, isRead: true } : notif
//         )
//       );
//     } catch (err) {
//       alert(err.message || "Failed to mark notification as read.");
//     }
//   };

//   if (loading) return <p>Loading notifications...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>Notifications</h2>
//       {notifications.length === 0 && <p>No notifications available.</p>}
//       <ul>
//         {notifications.map((notif, index) => (
//           <li
//             key={notif.id}
//             style={{
//               padding: "10px",
//               marginBottom: "5px",
//               backgroundColor: notif.isRead ? "#f0f0f0" : "#ffffff",
//               border: "1px solid #ccc",
//             }}
//           >
//             <h4>{notif.title}</h4>
//             <p>{notif.message}</p>
//             <div>
//               {notif.targetDepartments.length > 0 ? (
//                 notif.targetDepartments.map((depart, idx) => (
//                   <span key={idx}>{`Department : ${depart}`}</span>
//                 ))
//               ) : (
//                 <span>All Departments</span>
//               )}
//             </div>
//             <small>{new Date(notif.createdAt).toLocaleString()}</small>
//             {!notif.isRead && (
//               <button
//                 onClick={() => handleMarkAsRead(notif.id, index)}
//                 style={{ marginTop: "10px" }}
//               >
//                 Mark as Read
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
import React, { useState, useEffect } from "react";
import { markNotificationAsRead } from "./notificationService";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No authorization token found.");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/notification",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data.data);
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error fetching notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId, index) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notif, i) =>
          i === index ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      alert(err.message || "Failed to mark notification as read.");
    }
  };

  const handleViewMedia = (mediaUrl) => {
    window.open(mediaUrl, "_blank", "noopener,noreferrer");
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Notifications</h2>
      {notifications.length === 0 && (
        <p className="text-center text-muted">No notifications available.</p>
      )}
      <div className="row">
        {notifications.map((notif, index) => (
          <div className="col-md-6 mb-4" key={notif.id}>
            <div
              className={`card shadow-sm ${
                notif.isRead ? "border-light" : "border-primary"
              }`}
              style={{
                borderLeftWidth: "5px",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5
                    className={`card-title mb-1 ${
                      notif.isRead ? "text-muted" : "text-dark"
                    }`}
                  >
                    {notif.title}
                  </h5>
                  {!notif.isRead && (
                    <span
                      className="badge bg-primary"
                      style={{
                        fontSize: "0.8rem",
                        height: "1.5rem",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
                <p className="card-text text-muted">{notif.message}</p>
                {/* {notif.mediaUrl && (
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleViewMedia(notif.mediaUrl)}
                    >
                      View Media
                    </button>
                  </div>
                )} */}
                <small className="text-muted">
                  {notif.targetDepartments.length > 0
                    ? `Department: ${notif.targetDepartments.join(", ")}`
                    : "All Departments"}
                </small>
                <br />
                <small className="text-muted">
                  {new Date(notif.createdAt).toLocaleString()}
                </small>
                  {notif.mediaUrl && (
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleViewMedia(notif.mediaUrl)}
                    >
                      View Media
                    </button>
                  </div>
                )}
                {!notif.isRead && (
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleMarkAsRead(notif.id, index)}
                    >
                      Mark as Read
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
