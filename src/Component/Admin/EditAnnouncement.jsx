// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2"; // Import SweetAlert2

// export default function EditAnnouncement() {
//   const { id } = useParams();
//   const [announcementData, setAnnouncementData] = useState({
//     announcementSubject: "",
//     announcementDescription: "",
//   });
//   const [postImage, setPostImage] = useState(null); // To handle file input for image
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate(); // Replaces useHistory

//   // Fetch announcement data by ID on component mount (only subject and description)
//   useEffect(() => {
//     const fetchAnnouncement = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         };
//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
//           { headers }
//         );
//         if (response.data.success) {
//           setAnnouncementData({
//             announcementSubject: response.data.data.announcementSubject,
//             announcementDescription: response.data.data.announcementDescription,
//           });
//         } else {
//           setError("Announcement data not found.");
//         }
//       } catch (error) {
//         setError("Error fetching announcement data.");
//         console.error("Error fetching announcement:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnnouncement();
//   }, [id]);

//   // Handle form field changes (for subject and description)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAnnouncementData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle file input change (for image upload)
//   const handleFileChange = (e) => {
//     setPostImage(e.target.files[0]); // Store the file for uploading later
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError(null);

//     const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage

//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       // Create form data to include image file and text fields
//       const formData = new FormData();
//       formData.append(
//         "announcementSubject",
//         announcementData.announcementSubject
//       );
//       formData.append(
//         "announcementDescription",
//         announcementData.announcementDescription
//       );

//       // If a new image is uploaded, append it to the form data
//       if (postImage) {
//         formData.append("announcementPostImg", postImage);
//       }

//       const response = await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
//         formData,
//         { headers, "Content-Type": "multipart/form-data" }
//       );

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Announcement updated successfully!",
//           confirmButtonText: "OK",
//         }).then(() => {
//           navigate("/dashboard/make-announcement"); // Redirect after success
//         });
//       } else {
//         setError("Failed to update announcement.");
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to update announcement.",
//         });
//       }
//     } catch (error) {
//       setError("Error updating announcement.");
//       console.error("Error updating announcement:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred while updating the announcement.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="rzr-hm-admin-editanc container">
//           <h2>Edit Announcement</h2>
//           <form onSubmit={handleSubmit} className="rzr-hm-admin-editanc-form">
//             <div className="rzr-hm-admin-editanc-group">
//               <label htmlFor="announcementSubject">Subject:</label>
//               <input
//                 type="text"
//                 id="announcementSubject"
//                 name="announcementSubject"
//                 value={announcementData.announcementSubject}
//                 onChange={handleChange}
//                 required
//                 className="rzr-hm-admin-editanc-input"
//               />
//             </div>
//             <div className="rzr-hm-admin-editanc-group">
//               <label htmlFor="announcementDescription">Description:</label>
//               <textarea
//                 id="announcementDescription"
//                 name="announcementDescription"
//                 value={announcementData.announcementDescription}
//                 onChange={handleChange}
//                 required
//                 className="rzr-hm-admin-editanc-textarea"
//               />
//             </div>
//             <div className="rzr-hm-admin-editanc-group">
//               <label htmlFor="announcementPostImg">Post Image:</label>
//               <input
//                 type="file"
//                 id="announcementPostImg"
//                 name="announcementPostImg"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="rzr-hm-admin-editanc-file"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="rzr-hm-admin-editanc-button"
//             >
//               {submitting ? "Updating..." : "Update Announcement"}
//             </button>
//           </form>
//           {error && <p className="rzr-hm-admin-editanc-error">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditAnnouncement() {
  const { id } = useParams();
  const [announcementData, setAnnouncementData] = useState({
    announcementSubject: "",
    announcementDescription: "",
  });
  const [postImage, setPostImage] = useState(null); // To handle file input for image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate(); // Replaces useHistory

  // Fetch announcement data by ID on component mount (only subject and description)
  useEffect(() => {
    const fetchAnnouncement = async () => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(
          `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
          { headers }
        );
        if (response.data.success) {
          setAnnouncementData({
            announcementSubject: response.data.data.announcementSubject,
            announcementDescription: response.data.data.announcementDescription,
          });
        } else {
          setError("Announcement data not found.");
        }
      } catch (error) {
        setError("Error fetching announcement data.");
        console.error("Error fetching announcement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  // Handle form field changes (for subject and description)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (for image upload)
  const handleFileChange = (e) => {
    setPostImage(e.target.files[0]); // Store the file for uploading later
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        // 'Content-Type' is intentionally omitted to let Axios handle it
      };

      // Create form data to include image file and text fields
      const formData = new FormData();
      formData.append(
        "announcementSubject",
        announcementData.announcementSubject
      );
      formData.append(
        "announcementDescription",
        announcementData.announcementDescription
      );

      // If a new image is uploaded, append it to the form data
      if (postImage) {
        formData.append("announcementPostImg", postImage);
      }

      const response = await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
        formData,
        { headers } // Correctly configured headers
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Announcement updated successfully!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/add-announcement"); // Updated redirect path
        });
      } else {
        setError("Failed to update announcement.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update announcement.",
        });
      }
    } catch (error) {
      setError("Error updating announcement.");
      console.error("Error updating announcement:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the announcement.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="main">
      <div className="ems-content">
        <div className="rzr-hm-admin-editanc container">
          <h2>Edit Announcement</h2>
          <form onSubmit={handleSubmit} className="rzr-hm-admin-editanc-form">
            <div className="rzr-hm-admin-editanc-group">
              <label htmlFor="announcementSubject">Subject:</label>
              <input
                type="text"
                id="announcementSubject"
                name="announcementSubject"
                value={announcementData.announcementSubject}
                onChange={handleChange}
                required
                className="rzr-hm-admin-editanc-input form-control"
              />
            </div>
            <div className="rzr-hm-admin-editanc-group">
              <label htmlFor="announcementDescription">Description:</label>
              <textarea
                id="announcementDescription"
                name="announcementDescription"
                value={announcementData.announcementDescription}
                onChange={handleChange}
                required
                className="rzr-hm-admin-editanc-textarea form-control"
              />
            </div>
            <div className="rzr-hm-admin-editanc-group">
              <label htmlFor="announcementPostImg">Post Image:</label>
              <input
                type="file"
                id="announcementPostImg"
                name="announcementPostImg"
                accept="image/*"
                onChange={handleFileChange}
                className="rzr-hm-admin-editanc-file form-control"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="rzr-hm-admin-editanc-button btn btn-primary"
            >
              {submitting ? "Updating..." : "Update Announcement"}
            </button>
          </form>
          {error && (
            <p className="rzr-hm-admin-editanc-error text-danger">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
