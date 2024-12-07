// import { useState, useEffect } from "react";
// import axios from "axios";

// const InductionPPTViewer = () => {
//   const [ppts, setPPTs] = useState([]);

//   useEffect(() => {
//     fetchPPTs();
//   }, []);

//   const fetchPPTs = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         // "https://apiv2.humanmaximizer.com/api/v1/induction/induction-ppt/user",
//         "https://apiv2.humanmaximizer.com/api/v1/ppt/all",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setPPTs(response.data.data || []);
//       } else {
//         console.error("Failed to fetch PPTs:", response.data.message);
//         setPPTs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching PPTs:", error);
//       setPPTs([]);
//     }
//   };

//   // Inline styles for UI
//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//       marginLeft: "auto",
//       width: "80%",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "40px",
//     },
//     list: {
//       listStyleType: "none",
//       padding: 0,
//     },
//     listItem: {
//       padding: "10px",
//       borderBottom: "1px solid #e9ecef",
//     },
//     pptTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     pptAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//       marginBottom: "10px",
//     },
//     downloadLink: {
//       color: "#007bff",
//       textDecoration: "none",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Induction PPTs</h1>
//       {ppts.length === 0 ? (
//         <p>No induction PPTs available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {ppts.map((ppt) => (
//             <li key={ppt._id} style={styles.listItem}>
//               <p style={styles.pptTitle}>{ppt.title}</p>
//               <p style={styles.pptAppliesTo}>
//                 Applies to:{" "}
//                 {ppt.isGeneral ? "All Departments" : ppt.departments.join(", ")}
//               </p>
//               <a
//                 href={ppt.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={styles.downloadLink}
//               >
//                 Download/View PPT
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default InductionPPTViewer;

// components/InductionPPTViewer.js

// import { useState, useEffect } from "react";
// import axios from "axios";

// const InductionPPTViewer = () => {
//   const [ppts, setPPTs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userDepartment, setUserDepartment] = useState("All"); // Default to All

//   useEffect(() => {
//     fetchUserProfileAndPPTs();
//   }, []);

//   const fetchUserProfileAndPPTs = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       // Fetch user profile to get department info
//       const profileResponse = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/user/user-profile",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (profileResponse.data.success) {
//         const userDept = profileResponse.data.data.department || "All";
//         setUserDepartment(userDept);
//       } else {
//         console.error("Failed to fetch user profile:", profileResponse.data.message);
//         setUserDepartment("All");
//       }

//       // Fetch PPTs based on user's departments
//       fetchPPTs();
//     } catch (error) {
//       console.error("Error fetching user profile or PPTs:", error);
//       setUserDepartment("All");
//       fetchPPTs(); // Fetch general PPTs if profile fetch fails
//     }
//   };

//   const fetchPPTs = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get("https://apiv2.humanmaximizer.com/api/v1/ppt/userPpts", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data.success) {
//         setPPTs(response.data.data || []);
//       } else {
//         console.error("Failed to fetch PPTs:", response.data.message);
//         setPPTs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching PPTs:", error);
//       setPPTs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Inline styles for UI
//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//       marginLeft: "auto",
//       width: "70%",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "40px",
//     },
//     userDepartment: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "16px",
//     },
//     list: {
//       listStyleType: "none",
//       padding: 0,
//     },
//     listItem: {
//       padding: "10px",
//       borderBottom: "1px solid #e9ecef",
//     },
//     pptTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     pptAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//       marginBottom: "10px",
//     },
//     downloadLink: {
//       color: "#007bff",
//       textDecoration: "none",
//     },
//     loading: {
//       textAlign: "center",
//       fontSize: "18px",
//       color: "#555",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Induction PPTs</h1>

//       <p style={styles.userDepartment}>
//         Viewing PPTs for Department: <strong>{userDepartment}</strong>
//       </p>

//       {loading ? (
//         <div style={styles.loading}>
//           <span className="spinner"></span> Loading PPTs...
//         </div>
//       ) : ppts.length === 0 ? (
//         <p>No induction PPTs available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {ppts.map((ppt) => (
//             <li key={ppt._id} style={styles.listItem}>
//               <p style={styles.pptTitle}>{ppt.title}</p>
//               <p style={styles.pptAppliesTo}>
//                 Applies to:{" "}
//                 {ppt.isGeneral ? "All Departments" : ppt.departments.join(", ")}
//               </p>
//               <a
//                 // href={ppt.fileUrl}
//                 href={`https://apiv2.humanmaximizer.com/api/v1/ppt/download/${ppt._id}`}

//                 style={styles.downloadLink}
//               >
//                 Download/View PPT
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// // Styles object remains unchanged
// export default InductionPPTViewer;

// components/InductionPPTViewer.js

// import { useState, useEffect } from "react";
// import axios from "axios";

// const InductionPPTViewer = () => {
//   const [ppts, setPPTs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userDepartment, setUserDepartment] = useState("All"); // Default to All

//   useEffect(() => {
//     fetchUserProfileAndPPTs();
//   }, []);

//   const fetchUserProfileAndPPTs = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       // Fetch user profile to get department info
//       const profileResponse = await axios.get("https://apiv2.humanmaximizer.com/api/v1/user/profile", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (profileResponse.data.success) {
//         const userDept = profileResponse.data.data.department || "All";
//         setUserDepartment(userDept);
//       } else {
//         console.error("Failed to fetch user profile:", profileResponse.data.message);
//         setUserDepartment("All");
//       }

//       // Fetch PPTs based on user's departments
//       fetchPPTs();
//     } catch (error) {
//       console.error("Error fetching user profile or PPTs:", error);
//       setUserDepartment("All");
//       fetchPPTs(); // Fetch general PPTs if profile fetch fails
//     }
//   };

//   const fetchPPTs = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get("https://apiv2.humanmaximizer.com/api/v1/ppt/userPpts", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data.success) {
//         setPPTs(response.data.data || []);
//       } else {
//         console.error("Failed to fetch PPTs:", response.data.message);
//         setPPTs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching PPTs:", error);
//       setPPTs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Inline styles for UI
//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//       marginLeft: "auto",
//       width: "80%",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "40px",
//     },
//     userDepartment: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "16px",
//     },
//     list: {
//       listStyleType: "none",
//       padding: 0,
//     },
//     listItem: {
//       padding: "10px",
//       borderBottom: "1px solid #e9ecef",
//     },
//     pptTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     pptAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//       marginBottom: "10px",
//     },
//     downloadLink: {
//       color: "#007bff",
//       textDecoration: "none",
//     },
//     loading: {
//       textAlign: "center",
//       fontSize: "18px",
//       color: "#555",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Induction PPTs</h1>

//       <p style={styles.userDepartment}>
//         Viewing PPTs for Department: <strong>{userDepartment}</strong>
//       </p>

//       {loading ? (
//         <div style={styles.loading}>
//           <span className="spinner"></span> Loading PPTs...
//         </div>
//       ) : ppts.length === 0 ? (
//         <p>No induction PPTs available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {ppts.map((ppt) => (
//             <li key={ppt._id} style={styles.listItem}>
//               <p style={styles.pptTitle}>{ppt.title}</p>
//               <p style={styles.pptAppliesTo}>
//                 Applies to: {ppt.isGeneral ? "All Departments" : ppt.departments.join(", ")}
//               </p>
//               <a
//                 href={`https://apiv2.humanmaximizer.com/api/v1/ppt/download/${ppt._id}`}
//                 style={styles.downloadLink}
//               >
//                 Download/View PPT
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// // Styles object remains unchanged
// export default InductionPPTViewer;

// components/InductionPPTViewer.js

// import { useState, useEffect } from "react";
// import axios from "axios";

// const InductionPPTViewer = () => {
//   const [ppts, setPPTs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userDepartment, setUserDepartment] = useState("All"); // Default to All

//   useEffect(() => {
//     fetchUserProfileAndPPTs();
//   }, []);

//   const fetchUserProfileAndPPTs = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       // Fetch user profile to get department info
//       const profileResponse = await axios.get("https://apiv2.humanmaximizer.com/api/v1/user/profile", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (profileResponse.data.success) {
//         const userDept = profileResponse.data.data.department || "All";
//         setUserDepartment(userDept);
//       } else {
//         console.error("Failed to fetch user profile:", profileResponse.data.message);
//         setUserDepartment("All");
//       }

//       // Fetch PPTs based on user's departments
//       fetchPPTs();
//     } catch (error) {
//       console.error("Error fetching user profile or PPTs:", error);
//       setUserDepartment("All");
//       fetchPPTs(); // Fetch general PPTs if profile fetch fails
//     }
//   };

//   const fetchPPTs = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get("https://apiv2.humanmaximizer.com/api/v1/ppt/userPpts", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data.success) {
//         setPPTs(response.data.data || []);
//       } else {
//         console.error("Failed to fetch PPTs:", response.data.message);
//         setPPTs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching PPTs:", error);
//       setPPTs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (ppt) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(`https://apiv2.humanmaximizer.com/api/v1/ppt/download/${ppt._id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         responseType: "blob", // Important for handling binary data
//       });

//       if (response.status === 200) {
//         const blob = new Blob([response.data], { type: response.headers['content-type'] });
//         const link = document.createElement("a");
//         const url = window.URL.createObjectURL(blob);
//         link.href = url;

//         // Extract filename from Content-Disposition header
//         const disposition = response.headers['content-disposition'];
//         let filename = "download.pptx"; // Default filename
//         if (disposition && disposition.indexOf('attachment') !== -1) {
//           const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//           const matches = filenameRegex.exec(disposition);
//           if (matches != null && matches[1]) {
//             filename = matches[1].replace(/['"]/g, '');
//           }
//         }

//         link.setAttribute('download', filename);
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error("Failed to download PPT:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error downloading PPT:", error);
//       // Optionally, display an error message to the user
//     }
//   };

//   // Inline styles for UI
//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//       marginLeft: "auto",
//       width: "80%",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "40px",
//     },
//     userDepartment: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "16px",
//     },
//     list: {
//       listStyleType: "none",
//       padding: 0,
//     },
//     listItem: {
//       padding: "10px",
//       borderBottom: "1px solid #e9ecef",
//     },
//     pptTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     pptAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//       marginBottom: "10px",
//     },
//     downloadButton: {
//       backgroundColor: "#007bff",
//       color: "#fff",
//       border: "none",
//       padding: "8px 16px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       textDecoration: "none",
//     },
//     loading: {
//       textAlign: "center",
//       fontSize: "18px",
//       color: "#555",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Induction PPTs</h1>

//       <p style={styles.userDepartment}>
//         Viewing PPTs for Department: <strong>{userDepartment}</strong>
//       </p>

//       {loading ? (
//         <div style={styles.loading}>
//           <span className="spinner"></span> Loading PPTs...
//         </div>
//       ) : ppts.length === 0 ? (
//         <p>No induction PPTs available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {ppts.map((ppt) => (
//             <li key={ppt._id} style={styles.listItem}>
//               <p style={styles.pptTitle}>{ppt.title}</p>
//               <p style={styles.pptAppliesTo}>
//                 Applies to: {ppt.isGeneral ? "All Departments" : ppt.departments.join(", ")}
//               </p>
//               <button
//                 onClick={() => handleDownload(ppt)}
//                 style={styles.downloadButton}
//               >
//                 Download/View PPT
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default InductionPPTViewer;

// components/InductionPPTViewer.js

import { useState, useEffect } from "react";
import axios from "axios";

const InductionPPTViewer = () => {
  const [ppts, setPPTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDepartment, setUserDepartment] = useState("All"); // Default to All

  useEffect(() => {
    fetchUserProfileAndPPTs();
  }, []);

  const fetchUserProfileAndPPTs = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Fetch user profile to get department info
      const profileResponse = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (profileResponse.data.success) {
        const userDept = profileResponse.data.data.department || "All";
        setUserDepartment(userDept);
      } else {
        console.error(
          "Failed to fetch user profile:",
          profileResponse.data.message
        );
        setUserDepartment("All");
      }

      // Fetch PPTs based on user's departments
      fetchPPTs();
    } catch (error) {
      console.error("Error fetching user profile or PPTs:", error);
      setUserDepartment("All");
      fetchPPTs(); // Fetch general PPTs if profile fetch fails
    }
  };

  const fetchPPTs = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/ppt/userPpts",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setPPTs(response.data.data || []);
      } else {
        console.error("Failed to fetch PPTs:", response.data.message);
        setPPTs([]);
      }
    } catch (error) {
      console.error("Error fetching PPTs:", error);
      setPPTs([]);
    } finally {
      setLoading(false);
    }
  };

  // const handleDownload = async (ppt) => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const response = await axios.get(`https://apiv2.humanmaximizer.com/api/v1/ppt/download/${ppt._id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       responseType: "blob", // Important for handling binary data
  //     });

  //     if (response.status === 200) {
  //       const blob = new Blob([response.data], { type: response.headers['content-type'] });
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");

  //       // Extract filename from Content-Disposition header
  //       const disposition = response.headers['content-disposition'];
  //       let filename = "download.pptx"; // Default filename

  //       if (disposition && disposition.indexOf('attachment') !== -1) {
  //         const filenameRegex = /filename\*=UTF-8''([^;\n]*)|filename[^;=\n]*=((['"]).*?\3|[^;\n]*)/;
  //         const matches = filenameRegex.exec(disposition);
  //         if (matches != null) {
  //           if (matches[1]) {
  //             // Handle RFC 5987 encoding
  //             filename = decodeURIComponent(matches[1]);
  //           } else if (matches[2]) {
  //             filename = matches[2].replace(/['"]/g, '');
  //           }
  //         }
  //       }

  //       link.href = url;
  //       link.setAttribute('download', filename);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     } else {
  //       console.error("Failed to download PPT:", response.data.message);
  //       // Optionally, display an error message to the user
  //     }
  //   } catch (error) {
  //     console.error("Error downloading PPT:", error);
  //     // Optionally, display an error message to the user
  //   }
  // };

  // Inline styles for UI

  const handleDownload = async (ppt) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Make the download request with the JWT token
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/ppt/download/${ppt._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob", // Important to handle binary data
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        // Extract filename from the Content-Disposition header
        const disposition = response.headers["content-disposition"];
        let filename;

        if (disposition && disposition.includes("attachment")) {
          const filenameRegex = /filename[^;=\n]*=["']?([^"';\n]*)["']?/;
          const matches = filenameRegex.exec(disposition);

          if (matches && matches[1]) {
            filename = matches[1]; // Extracted filename from header
          } else {
            filename = ppt.title + ".pptx"; // Fallback to title from the model
          }
        } else {
          filename = ppt.title + ".pptx"; // Fallback if Content-Disposition is missing
        }

        console.log("Filename:", filename); // Debug: Ensure filename is extracted correctly

        link.href = url;
        link.setAttribute("download", filename); // Correct filename
        document.body.appendChild(link);
        link.click(); // Trigger download
        link.remove(); // Clean up DOM
        window.URL.revokeObjectURL(url); // Free memory
      } else {
        console.error("Failed to download PPT:", response.data.message);
      }
    } catch (error) {
      console.error("Error downloading PPT:", error);
    }
  };

  return (
    <div className="main">
      <section className="ems-content p-5">
        <div className="container hm-emp-induction">
          <h1>Induction PPTs</h1>

          <p>
            Viewing PPTs for Department: <strong>{userDepartment}</strong>
          </p>

          {loading ? (
            <div>
              <span className="spinner"></span> Loading PPTs...
            </div>
          ) : ppts.length === 0 ? (
            <p>No induction PPTs available.</p>
          ) : (
            <ul>
              {ppts.map((ppt) => (
                <li key={ppt._id}>
                  <p>{ppt.title}</p>
                  <p>
                    Applies to:{" "}
                    {ppt.isGeneral
                      ? "All Departments"
                      : ppt.departments.join(", ")}
                  </p>
                  <button onClick={() => handleDownload(ppt)}>
                    Download/View PPT
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default InductionPPTViewer;
