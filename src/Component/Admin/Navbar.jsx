// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import authService from "../../services/Service";
// import userService from "../../services/Service";
// import img1 from "../../assets/profile.png";
// import img2 from "../../assets/HM-Horizontal.png";
// import axios from "axios";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Navbar() {
//   const [userProfile, setUserProfile] = useState(null);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [companyInfo, setCompanyInfo] = useState([]); // Array to store multiple saved records
//   const userMenuRef = useRef(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const fetchUserProfile = async () => {
//       if (!accessToken) {
//         console.error("No access token found");
//         return;
//       }
//       try {
//         const profile = await userService.getUserProfile(accessToken);
//         setUserProfile(profile.response);
//       } catch (error) {
//         console.error("Failed to fetch user profile", error.message);
//       }
//     };
//     fetchUserProfile();

//     const fetchCompanyLogo = async () => {
//       try {
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo"
//         );
//         if (response.data.success && response.data.data[0]?.logo) {
//           setCompanyInfo(response.data.data);
//         } else {
//           setCompanyInfo(null);
//         }
//       } catch (error) {
//         console.error("Error fetching company logo:", error.message);
//         toast.error("Failed to load company logo.");
//       }
//     };

//     fetchCompanyLogo();

//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setIsUserMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await authService.logout();
//       toast.success("Logout Successful!");
//       window.location.href = "/";
//     } catch (error) {
//       console.error(error.message);
//       toast.error("Logout Failed!");
//     }
//   };

//   if (!userProfile) {
//     return <div>Loading...</div>;
//   }

//   // notification

//   const userRole = localStorage.getItem("userRole");

//   let linkPath = "/dashboard";
//   if (userRole === "admin") {
//     linkPath += "/admin-notification";
//   } else if (userRole === "manager") {
//     linkPath += "/manager-notification";
//   } else if (userRole === "employee") {
//     linkPath += "/employee-notification";
//   } else if (userRole === "super-admin") {
//     linkPath += "/employee-notification";
//   }

//   return (
//     <>
//       <section className="">
//         <header
//           className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm"
//           style={{
//             height: "10vh",
//             position: "static",
//             top: "0",
//             left: "0",
//             zIndex: "999",
//             backgroundColor: "white",
//             width: "86vw",
//             marginLeft: "-74px",
//             //  marginBottom:"200px"
//           }}
//         >
//           {/* <div className="d-flex align-items-center">
              
//               {Array.isArray(companyInfo) && companyInfo.length > 0 ? (
//                 companyInfo.map((data, index) => (
//                   <div key={index} className="d-flex align-items-center">
//                     <img
//                       src={data.logo ? data.logo : img2}
//                       alt="Logo"
//                       className="hm-logo-img"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         objectFit: "cover",
//                         marginRight: "10px",
//                       }}
//                     />
//                     <p>{data.name}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="d-flex align-items-center">
//                   <img
//                     src={img2}
//                     alt="Fallback Logo"
//                     className="hm-logo-img"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       objectFit: "cover",
//                       marginRight: "10px",
//                     }}
//                   />
//                   <p>Default Company Name</p>
//                 </div>
//               )}
//             </div> */}

//           <div className="razor-admin-ems-notification">
//             <div className="razor-admin-user-profile ">
//               <a onClick={toggleUserMenu} style={{ cursor: "pointer" }}>
//                 <img
//                   src={userProfile.user_Avatar || img1}
//                   alt="User"
//                   className="razor-admin-user-avatar"
//                 />
//                 {/* <span className="razor-admin-user-name">
//                     {userProfile.first_Name}
//                   </span> */}
//               </a>
//               <svg
//                 style={{ cursor: "pointer" }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 width={22}
//                 fill="#0d306d"
//                 height={22}
//                 viewBox="0 0 24 24"
//                 onClick={toggleUserMenu}
//               >
//                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
//               </svg>
//               <div
//                 ref={userMenuRef}
//                 className={`razor-admin-user-menu ${
//                   isUserMenuOpen ? "d-flex" : ""
//                 }`}
//                 id="razorAdminUserMenu"
//               >
//                 {userProfile.userRole === "employee" && (
//                   <div className="razor-admin-profile-link mb-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={18}
//                       fill="#679903"
//                       height={18}
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
//                     </svg>
//                     <Link
//                       to={"/dashboard/my-profile"}
//                       className="razor-admin-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       Profile
//                     </Link>
//                   </div>
//                 )}
//                 <div className="razor-admin-signout-link">
//                   <a
//                     onClick={handleLogout}
//                     className="razor-admin-link"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={15}
//                       fill="#000"
//                       height={15}
//                       viewBox="0 0 24 24"
//                       className="me-2"
//                     >
//                       <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
//                       <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
//                     </svg>
//                     Sign Out
//                   </a>
//                 </div>
//               </div>
//             </div>
//             {/* notification start */}
//             <Link className="nav-link" to={"/dashboard/notificationv2"}>
//               <span className="badge badge-pill badge-danger me-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="24"
//                   width="21"
//                   viewBox="0 0 448 512"
//                 >
//                   <path
//                     fill="#0d306d"
//                     d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
//                   />
//                 </svg>
//               </span>

//               <>
//                 <span className="nav-counter nav-counter-green"></span>
//               </>
//             </Link>
//             {/* notification end */}
//           </div>
//         </header>
//       </section>
//     </>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/Service";
import userService from "../../services/Service";
import img1 from "../../assets/profile.png";
import img2 from "../../assets/HM-Horizontal.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [userProfile, setUserProfile] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]); // Array to store multiple saved records
  const [unreadCount, setUnreadCount] = useState(0); // State for notification count
  const userMenuRef = useRef(null);

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

    const fetchCompanyLogo = async () => {
      try {
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo"
        );
        if (response.data.success && response.data.data[0]?.logo) {
          setCompanyInfo(response.data.data);
        } else {
          setCompanyInfo(null);
        }
      } catch (error) {
        console.error("Error fetching company logo:", error.message);
        toast.error("Failed to load company logo.");
      }
    };

    const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/notification",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const unreadCount = response.data.data.filter((notif) => !notif.isRead).length;
        setUnreadCount(unreadCount); // Update unread count
      } catch (error) {
        console.error("Failed to fetch notifications:", error.message);
      }
    };

    fetchUserProfile();
    fetchCompanyLogo();
    fetchUnreadNotifications();

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logout Successful!");
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
      toast.error("Logout Failed!");
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // notification

  const userRole = localStorage.getItem("userRole");

  let linkPath = "/dashboard";
  if (userRole === "admin") {
    linkPath += "/admin-notification";
  } else if (userRole === "manager") {
    linkPath += "/manager-notification";
  } else if (userRole === "employee") {
    linkPath += "/employee-notification";
  } else if (userRole === "super-admin") {
    linkPath += "/employee-notification";
  }

  return (
    <>
      <section className="">
        <header
          className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm"
          style={{
            height: "10vh",
            position: "static",
            top: "0",
            left: "0",
            zIndex: "999",
            backgroundColor: "white",
            width: "86vw",
            marginLeft: "-74px",
          }}
        >
          <div className="razor-admin-ems-notification">
            <div className="razor-admin-user-profile ">
              <a onClick={toggleUserMenu} style={{ cursor: "pointer" }}>
                <img
                  src={userProfile.user_Avatar || img1}
                  alt="User"
                  className="razor-admin-user-avatar"
                />
              </a>
              <svg
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                fill="#0d306d"
                height={22}
                viewBox="0 0 24 24"
                onClick={toggleUserMenu}
              >
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
              </svg>
              <div
                ref={userMenuRef}
                className={`razor-admin-user-menu ${isUserMenuOpen ? "d-flex" : ""}`}
                id="razorAdminUserMenu"
              >
                <div className="razor-admin-signout-link">
                  <a
                    onClick={handleLogout}
                    className="razor-admin-link"
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      fill="#000"
                      height={15}
                      viewBox="0 0 24 24"
                      className="me-2"
                    >
                      <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
                      <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                    </svg>
                    Sign Out
                  </a>
                </div>
              </div>
            </div>

            {/* Notification Section */}
            <Link className="nav-link" to={"/dashboard/notificationv2"}>
              <span className="position-relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="21"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#0d306d"
                    d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {unreadCount}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </header>
      </section>
    </>
  );
}

