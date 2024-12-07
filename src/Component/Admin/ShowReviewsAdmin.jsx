import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import AutomatedReviewAnalysis from "./AutomatedReviewAnalysis";
import EditModal from "./EditModal";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  // Initial state setup (should ideally be placed where editFormData state is initialized)
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    employeeId: "", // Make sure this matches the key used in reviews array
    review: "",
    rating: "",
    designation: "",
    department: "",
    date: "", // This should match the field used for date handling
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/admin/reviews",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data); // Log the response data to understand its structure

      if (data.success && Array.isArray(data.data)) {
        setReviews(data.data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRatingFilter = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleEditClick = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditingIndex(index);
        setCurrentReview({ ...reviews[index] });
        setEditFormData({ ...reviews[index] });
        setIsModalOpen(true);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (index) => {
    const reviewToDelete = reviews[index];

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const accessToken = localStorage.getItem("accessToken");
        try {
          await axios.delete(
            `https://apiv2.humanmaximizer.com/api/v1/admin/reviews/${reviewToDelete._id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const newReviews = [...reviews];
          newReviews.splice(index, 1);
          setReviews(newReviews);
          toast.success("Review deleted successfully!");
        } catch (error) {
          console.error("Error deleting review:", error);
          toast.error("Failed to delete review: " + error.message);
        }
      }
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const reviewToEdit = reviews[editingIndex];
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/admin/reviews/${reviewToEdit._id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newReviews = [...reviews];
      newReviews[editingIndex] = editFormData;
      setReviews(newReviews);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error editing review:", error);
    }
    handleCloseModal();
  };

  const filteredReviews = reviews
    .filter((review) => {
      const fullName = review.fullName ? review.fullName.toLowerCase() : ""; // Change here
      const employeeId = review.employeeId
        ? review.employeeId.toLowerCase()
        : "";
      return (
        (fullName.includes(search.toLowerCase()) || // Change here
          employeeId.includes(search.toLowerCase())) &&
        (ratingFilter === "" || review.rating === parseInt(ratingFilter)) &&
        (departmentFilter === "" || review.department === departmentFilter)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDownload = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to download the reviews as an Excel file?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const ws = XLSX.utils.json_to_sheet(filteredReviews);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Reviews");
          XLSX.writeFile(wb, "reviews.xlsx");
          toast.success("Excel file downloaded successfully!");
        } catch (error) {
          console.error("Error downloading Excel:", error);
          toast.error("Failed to download Excel file: " + error.message);
        }
      }
    });
  };

  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="ems-content">
        <div className="container">
          <div className="hcm-hr-assign-task-dashboard-container">
            <div className="all-head d-flex align-items-center justify-content-between mb-3">
              <h4>Employee Review </h4>
            </div>
            <div className="hcm-admin-review-task-filter-container">
              <div className="hcm-admin-review-task-search-container">
                <input
                  type="text"
                  placeholder="Search by Name or Employee ID"
                  value={search}
                  onChange={handleSearch}
                  className="hcm-admin-review-task-input"
                />
                <i className="fas fa-search hcm-admin-review-task-search-icon"></i>
              </div>

              <select
                value={ratingFilter}
                onChange={handleRatingFilter}
                className="hcm-admin-review-task-input"
              >
                <option value="">RATING(All)</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>

              <select
                value={departmentFilter}
                onChange={handleDepartmentFilter}
                className="hcm-admin-review-task-input"
              >
                <option value="">DEPARTMENT(All)</option>
                <option value="IT">IT</option>
                <option value="BPO">BPO</option>
                <option value="RPO">RPO</option>
              </select>

              <button
                onClick={handleDownload}
                className="hcm-admin-review-task-button"
              >
                Download as Excel
              </button>
            </div>

            <div className="hcm-admin-review-task-table-container">
              <table className="hcm-admin-review-task-table">
                <thead>
                  <tr>
                    <th className="hcm-admin-review-task-th">Name</th>
                    <th className="hcm-admin-review-task-th">Employee ID</th>
                    <th className="hcm-admin-review-task-th">Review</th>
                    <th className="hcm-admin-review-task-th">Rating</th>
                    <th className="hcm-admin-review-task-th">Designation</th>
                    <th className="hcm-admin-review-task-th">Department</th>
                    <th className="hcm-admin-review-task-th">Date</th>
                    <th className="hcm-admin-review-task-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review, index) => (
                    <tr key={index}>
                      <td className="hcm-admin-review-task-td">
                        {review.fullName}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {review.employee_Id}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {review.review}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {review.rating}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {review.designation}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {review.department}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        {convertToIST(review.createdAt)}
                      </td>
                      <td className="hcm-admin-review-task-td">
                        <span
                          onClick={() => handleEditClick(index)}
                          className="p-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="#05941d"
                              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                            />
                          </svg>
                        </span>
                        <span
                          onClick={() => handleDeleteClick(index)}
                          className="p-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="17.5"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="#b10606"
                              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                            />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AutomatedReviewAnalysis reviews={reviews} />
            <EditModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              review={editFormData} // Passing editFormData instead of currentReview
              onSubmit={handleEditFormSubmit}
              onChange={handleEditFormChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  emsContent: {
    width: "80%",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    padding: "20px 0",
    background: "#0073e6",
    color: "white",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    width: "30%",
    padding: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    background: "#0073e6",
    color: "white",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  button: {
    padding: "10px 20px",
    background: "#0073e6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default ShowReviewsAdmin;
