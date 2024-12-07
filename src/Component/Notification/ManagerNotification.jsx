import { useContext } from "react";
import NotificationContext from "../../ContextApi/NotificationContext";
import { useState } from "react";

export default function ManagerNotification() {
  const {
    notifications,
    markAllAsRead,
    deleteNotification,
    deleteAllNotification,
    markAsRead,
  } = useContext(NotificationContext);
  const [activeTab, setActiveTab] = useState("unread");

  const unreadNotifications = notifications.filter(
    (notification) => notification.status === "unread"
  );

  const readNotifications = notifications.filter(
    (notification) => notification.status === "read"
  );

  return (
    <>
      <div className="main">
        <div className="ems-content">
          <div className="container hcm-notification-admin-container">
            <div className="hcm-notification-admin-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="hcm-notification-admin-heading">Notification </h2>
              <div>
                {/* <button
                  className="btn hcm-notification-admin-button mr-2"
                  onClick={markAllAsRead}
                  disabled={unreadNotifications.length === 0}>
                  Mark All Read
                </button>
                <button
                  className="btn hcm-notification-admin-button-danger"
                  onClick={() => deleteAllNotification()}
                  disabled={
                    unreadNotifications.length === 0 &&
                    readNotifications.length === 0
                  }>
                  Delete All
                </button> */}
              </div>
            </div>

            <ul className="nav nav-tabs hcm-notification-admin-nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link hcm-notification-admin-nav-link ${activeTab === "unread" ? "active" : ""
                    }`}
                  onClick={() => setActiveTab("unread")}>
                  Unread
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link hcm-notification-admin-nav-link ${activeTab === "read" ? "active" : ""
                    }`}
                  onClick={() => setActiveTab("read")}>
                  Read
                </button>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {activeTab === "unread" && (
                <>
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="card hcm-notification-admin-card mb-2">
                        <div
                          className="card-body hcm-notification-admin-card-body"
                          onClick={() => markAsRead(notification._id)}>
                          {notification.message}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="hcm-notification-admin-no-notification">No new notifications</p>
                  )}
                </>
              )}
              {activeTab === "read" && (
                <>
                  {readNotifications.length > 0 ? (
                    readNotifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="card hcm-notification-admin-card mb-2">
                        <div className="card-body d-flex justify-content-between align-items-center hcm-notification-admin-card-body">
                          {notification.message}
                          <button
                            className="btn btn-sm hcm-notification-admin-delete-button"
                            onClick={() => deleteNotification(notification._id)}>
                            &times;
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="hcm-notification-admin-no-notification">No read notifications</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
