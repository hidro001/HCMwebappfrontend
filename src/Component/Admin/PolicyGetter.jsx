// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PolicyGetter = () => {
//   const [categories, setCategories] = useState([]);

//   // Fetch policies allocated to the user
//   const fetchPolicies = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       const response = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/policy/policies/user",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         const fetchedCategories = response.data.data || [];
//         setCategories(fetchedCategories);
//       } else {
//         console.error("Failed to fetch policies:", response.data.message);
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error("Error fetching policies:", error);
//       setCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "40px",
//     },
//     section: {
//       backgroundColor: "#fff",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//       marginBottom: "30px",
//     },
//     categoryName: {
//       fontSize: "24px",
//       marginBottom: "10px",
//     },
//     policyContent: {
//       fontSize: "16px",
//       marginBottom: "5px",
//     },
//     policyAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//       marginBottom: "20px",
//     },
//   };

//   // Rendering UI
//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <div style={styles.container}>
//             <h1 style={styles.header}>Policies</h1>
//             {categories.map((category) => (
//               <div key={category._id} style={styles.section}>
//                 <h2 style={styles.categoryName}>{category.name}</h2>

//                 <ul style={{ listStyleType: "none", padding: 0 }}>
//                   {category.policies.map((policy) => (
//                     <li key={policy._id} style={{ marginBottom: "20px" }}>
//                       <p style={styles.policyContent}>{policy.content}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PolicyGetter;

// components/PolicyViewer.js

// import { useState, useEffect } from "react";
// import axios from "axios";

// // In PolicyViewer.js

// import html2pdf from "html2pdf.js";

// // ...

// const downloadPolicyAsPDF = (policy) => {
//   const element = document.createElement("div");
//   element.innerHTML = policy.content;

//   const options = {
//     margin: 1,
//     filename: `Policy-${policy._id}.pdf`,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//   };

//   html2pdf()
//     .set(options)
//     .from(element)
//     .save()
//     .catch((err) => console.error("Error generating PDF:", err));
// };

// const PolicyViewer = () => {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const fetchPolicies = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//            "https://apiv2.humanmaximizer.com/api/v1/policy/policies/user",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setPolicies(response.data.data || []);
//       } else {
//         console.error("Failed to fetch policies:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching policies:", error);
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
//       width: "70%",
//       marginLeft: "auto",
//       // marginRight: "auto",
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
//     policyContent: {
//       fontSize: "16px",
//       marginBottom: "5px",
//     },
//     policyAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
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
//       <h1 style={styles.header}>Policies</h1>
//       {loading ? (
//         <div style={styles.loading}>
//           <span className="spinner"></span> Loading Policies...
//         </div>
//       ) : policies.length === 0 ? (
//         <p>No policies available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {policies.map((policy) => (
//             <li key={policy._id} style={styles.listItem}>
//               <div
//                 dangerouslySetInnerHTML={{ __html: policy.content }}
//                 style={styles.policyContent}
//               />
//               <p style={styles.policyAppliesTo}>
//                 Applies to:{" "}
//                 {policy.isGeneral
//                   ? "All Departments"
//                   : (policy.departments || []).join(", ")}
//               </p>
//               {/* If you want to allow users to download the policy as PDF */}
//               <button
//                 onClick={() => downloadPolicyAsPDF(policy)}
//                 style={{ marginTop: "10px" }}
//               >
//                 Download as PDF
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PolicyViewer;

// components/PolicyViewer.js

// import { useState, useEffect } from "react";
// import axios from "axios";
// import html2pdf from "html2pdf.js";

// const PolicyViewer = () => {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State for modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPolicy, setSelectedPolicy] = useState(null);

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const fetchPolicies = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/policy/policies/user",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setPolicies(response.data.data || []);
//       } else {
//         console.error("Failed to fetch policies:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching policies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPolicyAsPDF = (policy) => {
//     const element = document.createElement("div");
//     element.innerHTML = `<h1>${policy.title}</h1>${policy.content}`;

//     const options = {
//       margin: 1,
//       filename: `${policy.title || "Policy"}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf()
//       .set(options)
//       .from(element)
//       .save()
//       .catch((err) => console.error("Error generating PDF:", err));
//   };

//   // Modal handlers
//   const openModal = (policy) => {
//     setSelectedPolicy(policy);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedPolicy(null);
//     setIsModalOpen(false);
//   };

//   // Inline styles for UI
//   const styles = {
//     container: {
//       padding: "30px",
//       fontFamily: "'Roboto', sans-serif",
//       backgroundColor: "#f5f7fa",
//       color: "#333",
//       width: "70%",
//       marginLeft: "auto",
//       marginRight: "auto",
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
//     policyTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     policyAppliesTo: {
//       fontStyle: "italic",
//       color: "#6c757d",
//       fontSize: "14px",
//     },
//     buttonGroup: {
//       marginTop: "10px",
//     },
//     button: {
//       padding: "8px 16px",
//       borderRadius: "4px",
//       border: "none",
//       fontSize: "14px",
//       cursor: "pointer",
//       backgroundColor: "#007bff",
//       color: "#fff",
//       marginRight: "10px",
//     },
//     loading: {
//       textAlign: "center",
//       fontSize: "18px",
//       color: "#555",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     // Modal styles
//     modalOverlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: isModalOpen ? "flex" : "none",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     },
//     modalContent: {
//       backgroundColor: "#fff",
//       padding: "20px",
//       borderRadius: "8px",
//       width: "80%",
//       maxHeight: "80%",
//       overflowY: "auto",
//       position: "relative",
//     },
//     modalCloseButton: {
//       position: "absolute",
//       top: "10px",
//       right: "10px",
//       backgroundColor: "#dc3545",
//       color: "#fff",
//       border: "none",
//       padding: "5px 10px",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Policies</h1>
//       {loading ? (
//         <div style={styles.loading}>
//           <span className="spinner"></span> Loading Policies...
//         </div>
//       ) : policies.length === 0 ? (
//         <p>No policies available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {policies.map((policy) => (
//             <li key={policy._id} style={styles.listItem}>
//               <div style={styles.policyTitle}>{policy.title}</div>
//               <p style={styles.policyAppliesTo}>
//                 Applies to:{" "}
//                 {policy.isGeneral
//                   ? "All Departments"
//                   : (policy.departments || []).join(", ")}
//               </p>
//               <div style={styles.buttonGroup}>
//                 <button
//                   onClick={() => openModal(policy)}
//                   style={styles.button}
//                 >
//                   View Policy
//                 </button>
//                 <button
//                   onClick={() => downloadPolicyAsPDF(policy)}
//                   style={styles.button}
//                 >
//                   Download as PDF
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Modal */}
//       {isModalOpen && selectedPolicy && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <button onClick={closeModal} style={styles.modalCloseButton}>
//               Close
//             </button>
//             <h2>{selectedPolicy.title}</h2>
//             <div
//               dangerouslySetInnerHTML={{ __html: selectedPolicy.content }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PolicyViewer;

// components/PolicyViewer.js

import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const PolicyViewer = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/policy/policies/user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setPolicies(response.data.data || []);
      } else {
        console.error("Failed to fetch policies:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPolicyAsPDF = (policy) => {
    const doc = new jsPDF("p", "pt", "a4");

    const content = `
      <style>
        body { font-family: 'Helvetica'; }
        h1 { font-size: 24pt; }
        p { font-size: 12pt; }
        img { max-width: 100%; height: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; }
      </style>
      <h1>${policy.title}</h1>
      ${policy.content}
    `;

    doc.html(content, {
      callback: function (doc) {
        doc.save(`${policy.title || "Policy"}.pdf`);
      },
      x: 20,
      y: 20,
      width: 550, // Adjust as needed
      windowWidth: 800,
      autoPaging: "text",
      html2canvas: {
        scale: 0.6,
        allowTaint: true,
        useCORS: true,
      },
    });
  };

  // Modal handlers
  const openModal = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPolicy(null);
    setIsModalOpen(false);
  };

  // Inline styles (same as before)
  // Inline styles for UI

  return (
    <div className="main">
      <div className="ems-content p-5 ">
        <div className="container  hm-comp-policies">
          <h1>Policies</h1>
          {loading ? (
            <div>
              <span className="spinner"></span> Loading Policies...
            </div>
          ) : policies.length === 0 ? (
            <p>No policies available.</p>
          ) : (
            <ul>
              {policies.map((policy) => (
                <li key={policy._id}>
                  <div>{policy.title}</div>
                  <p>
                    Applies to:{" "}
                    {policy.isGeneral
                      ? "All Departments"
                      : (policy.departments || []).join(", ")}
                  </p>
                  <div>
                    <button onClick={() => openModal(policy)}>
                      View Policy
                    </button>
                    <button onClick={() => downloadPolicyAsPDF(policy)}>
                      Download as PDF
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Modal */}
          {isModalOpen && selectedPolicy && (
            <div className="hm-view-updated-policy">
              <div>
                <button onClick={closeModal}>Close</button>
                <h2>{selectedPolicy.title}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPolicy.content }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyViewer;
