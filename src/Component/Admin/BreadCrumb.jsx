import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import userService from "../../services/Service";

// Mapping route paths to user-friendly names
const routeNameMap = {
  "/admin-dashboard": "Admin Dashboard",
  "/add-user": "Add User",
  "/all-employees": "All Employees",
  "/manager-dashboard": "Manager Dashboard",
  "/view-task": "View Task",
  "/assign-task": "Assign Task",
  "/employee-dashboard": "Employee Dashboard",
  "/my-profile": "My Profile",
  "/fetch-leaves": "Fetch Leaves",
  "/apply-leave": "Apply Leave",
  "/my-attendance": "My Attendance",
  "/attendance": "Attendance",
  "/settings": "Settings",
  "/employee-details": "Employee Details",
  "/edit-profile": "Edit Profile",
  "/apply-leaves": "Apply Leaves",
  "/view-leave": "View Leave",
  "/view-leave-manager": "View Leave Manager",
  "/view-task/task-detail": "Task Detail",
  "/update-task": "Update Task",
  "/add-task": "Add Task",
  "/all-employees-hr": "All Employees HR",
  "/add-user-hr": "Add Employees HR",
  "/view-leave-hr": "View Leave HR",
  "/view-task-hr": "View Task HR",
  "/make-announcement": "Make Announcement",
  "/support": "Support",
  "/view-previous-announcements": "View Previous Announcements",
  "/view-previous-announcements-hr": "View Previous Announcements HR",
  "/get-support": "Get Support",
  "/action-tracker": "Action Tracker",
  "/training-material": "Training Material",
  "/my-profile/employee-edit-profile": "Edit Profile",
  "/manage-issues-manager": "Manage Issues Manager",
  "/manager-action-tracker": "Action Tracker Manager",
  "/super-admin-dashboard": "Super Admin Dashboard",
  "/job-posting": "Job Posting",
  "/departdesig": "Department & Designation",
  "/department-details": "Department Details",
  // Add more routes as needed
};

const BreadCrumb = () => {
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchUserProfile = async () => {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      try {
        const profile = await userService.getUserProfile(accessToken);
        setUserProfile(profile.response);
      } catch (error) {
        console.error("Failed to fetch user profile", error.message);
      }
    };
    fetchUserProfile();
  }, []);

  // Split the current path into parts for breadcrumb
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div>
      <nav className="hm-nav-breadcrumb" aria-label="breadcrumb">
        <div className="nav-left">
          Welcome,{" "}
          <i>
            {userProfile
              ? `${userProfile.first_Name} ${userProfile.last_Name} (${userProfile.user_Role})`
              : "Loading..."}{" "}
          </i>
        </div>
        <div className="nav-right">
          <ol className="breadcrumb">
            {pathnames.map((value, index) => {
              // Replace %20 with a hyphen
              const formattedValue = decodeURIComponent(value).replace(
                /%20/g,
                "-"
              );

              // Rebuild the path for each breadcrumb item
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              // Handle "dashboard" separately to make it unclickable
              if (value === "dashboard") {
                return (
                  <li key={to} className="breadcrumb-item" aria-current="page">
                    Dashboard
                  </li>
                );
              }

              return isLast ? (
                <li
                  key={to}
                  className="breadcrumb-item active"
                  aria-current="page">
                  {routeNameMap[to] || formattedValue}
                </li>
              ) : (
                <li key={to} className="breadcrumb-item">
                  <Link to={to}>{routeNameMap[to] || formattedValue}</Link>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default BreadCrumb;
