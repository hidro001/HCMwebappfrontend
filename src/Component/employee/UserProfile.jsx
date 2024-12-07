import { useEffect, useState } from "react";
import userService from "../../services/Service";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main">
        <section className="ems-content">
          <div className="container p-5">

            <div className="all-employee">
              <div className="all-head p-4">
                <h4>Profile Overview</h4>
              </div>
              <div className="rzr-hcm-profiledetails-container">

                <div className="rzr-hcm-profiledetails-row">
                  <div className="rzr-hcm-profiledetails-col-lg-5">
                    <div className="rzr-hcm-profiledetails-card rzr-hcm-profiledetails-profile-card">
                      <div className="rzr-hcm-profiledetails-profile-image">
                        <img
                          src={
                            userProfile.user_Avatar ||
                            "assets/images/default-avatar.jpg"
                          }
                          alt="Employee Profile"
                          className="rzr-hcm-profiledetails-profile-img rounded"
                          height="160px"
                        />
                      </div>
                      <div className="rzr-hcm-profiledetails-profile-bio">
                        <div className="rzr-hcm-profiledetails-profile-name-title">
                          {userProfile.first_Name} {userProfile.last_Name}
                          <span className="rzr-hcm-profiledetails-profile-designation">
                            {userProfile.designation || "N/A"}
                          </span>
                        </div>
                        <div className="rzr-hcm-profiledetails-profile-id-doj">
                          <strong>Employee ID:</strong>
                          {userProfile.employee_Id || "N/A"}
                          &nbsp;
                          <span>
                            <strong>DOJ: </strong>
                            {userProfile.date_of_Joining
                              ? new Date(
                                userProfile.date_of_Joining
                              ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <Link
                          to={`/dashboard/my-profile/employee-edit-profile?employee_Id=${userProfile.employee_Id}`}>
                          <button className="leva-btn mt-2">Edit Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="rzr-hcm-profiledetails-col-lg-7">
                    <div className="rzr-hcm-profiledetails-card rzr-hcm-profiledetails-bank-details-card">
                      <ul className="rzr-hcm-profiledetails-profile-details-list">
                        <li>
                          <span>Aadhar No:</span>
                          {userProfile.adhaar_Number || "N/A"}
                        </li>
                        <li>
                          <span>PAN:</span> {userProfile.pan_No || "N/A"}
                        </li>
                        <li>
                          <span>Department:</span>
                          {userProfile.department || "N/A"}
                        </li>
                        {/* <li>
                          <span>Date of Birth:</span>
                          {userProfile.date_of_Birth || "N/A"}
                        </li> */}
                        <li>
                          <span>Working Mail:</span>
                          {userProfile.working_Email_Id || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="rzr-hcm-profiledetails-row mt-4">
                  <div className="rzr-hcm-profiledetails-col-lg-5">
                    <div className="rzr-hcm-profiledetails-card rzr-hcm-profiledetails-bank-details-card">
                      <div className="rzr-hcm-profiledetails-card-header">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="#fff"
                          viewBox="0 0 24 24">
                          <path d="M2 8v4.001h1V18H2v3h16l3 .001V21h1v-3h-1v-5.999h1V8L12 2 2 8zm4 10v-5.999h2V18H6zm5 0v-5.999h2V18h-2zm7 0h-2v-5.999h2V18zM14 8a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 8z"></path>
                        </svg>
                        <div className="rzr-hcm-profiledetails-card-title">
                          Bank Information
                        </div>
                      </div>
                      <ul className="rzr-hcm-profiledetails-card-content">
                        <li>
                          <span>Holder Name:</span>
                          {userProfile.bank_Holder_Name || "N/A"}
                        </li>
                        <li>
                          <span>Bank Name:</span>
                          {userProfile.bank_Name || "N/A"}
                        </li>
                        {/* <li>
                          <span>Branch:</span> {userProfile.branch_Name || "N/A"}
                        </li> */}
                        <li>
                          <span>Account No:</span>
                          {userProfile.bank_Account_No || "N/A"}
                        </li>
                        <li>
                          <span>IFSC Code:</span>
                          {userProfile.ifsc_Code || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="rzr-hcm-profiledetails-col-lg-7">
                    <div className="rzr-hcm-profiledetails-card rzr-hcm-profiledetails-personal-info-card">
                      <div className="rzr-hcm-profiledetails-card-header">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#fff"
                          viewBox="0 0 24 24">
                          <path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3zM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18z"></path>
                        </svg>
                        <div className="rzr-hcm-profiledetails-card-title">
                          Personal Information
                        </div>
                      </div>
                      <ul className="rzr-hcm-profiledetails-card-content">
                        <li>
                          <span>Phone No:</span>
                          {userProfile.mobile_No || "N/A"}
                        </li>
                        {/* <li>
                          <span>Emergency No:</span>
                          {userProfile.emergency_No || "N/A"}
                        </li> */}
                        <li>
                          <span>Personal Mail:</span>
                          {userProfile.personal_Email_Id || "N/A"}
                        </li>
                        <li>
                          <span>Address:</span> {userProfile.address || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* <a href="#" className="edit-req">
                Edit Request
                <svg
                  width="18"
                  height="18"
                  fill="#fff"
                  className="ms-1"
                  viewBox="0 0 24 24"
                >
                  <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                  <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                </svg>
              </a> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
