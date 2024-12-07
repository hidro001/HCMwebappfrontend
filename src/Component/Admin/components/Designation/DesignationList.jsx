import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditDesignationModal from "./EditDesignationModal";
import { Link } from "react-router-dom";

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentDesignation, setCurrentDesignation] = useState(null);

  // Fetch all designations on component mount
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("User not authenticated. Please log in.");
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/designations/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setDesignations(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch designations.");
          toast.error(response.data.message || "Failed to fetch designations.");
        }
      } catch (err) {
        console.error("Error fetching designations:", err);
        setError("Error fetching designations.");
        toast.error("Error fetching designations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  // Handle Delete Designation
  const handleDelete = (designation) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the designation "${designation.designation_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.delete(
            `https://apiv2.humanmaximizer.com/api/v1/designations/${designation.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            toast.success("Designation deleted successfully.");
            // Remove the deleted designation from state
            setDesignations((prevDesignations) =>
              prevDesignations.filter((d) => d._id !== designation._id)
            );
          } else {
            toast.error(
              response.data.message || "Failed to delete designation."
            );
          }
        } catch (error) {
          console.error("Error deleting designation:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error("Error: " + error.response.data.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Deletion canceled.");
      }
    });
  };

  // Handle Edit Designation
  const handleEdit = (designation) => {
    setCurrentDesignation(designation);
    setEditModalOpen(true);
  };

  // Refresh Designations after Edit
  const refreshDesignations = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://apiv2.humanmaximizer.com/api/v1/designations/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setDesignations(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch designations.");
          toast.error(response.data.message || "Failed to fetch designations.");
        }
      })
      .catch((err) => {
        console.error("Error fetching designations:", err);
        setError("Error fetching designations.");
        toast.error("Error fetching designations.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="container mt-5">Loading designations...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container mt-5 p-5 rzr-alldesg-update">
          <Link to="/dashboard/addDesignation">
            <button className="btn btn-primary">Add New Designation</button>
          </Link>

          <h2>All Designations</h2>
          {designations.length === 0 ? (
            <p>No designations found.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Designation Name</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {designations.map((designation, index) => (
                  <tr key={designation._id}>
                    <td>{index + 1}</td>
                    <td>{designation.designation_name}</td>
                    <td>
                      <ul>
                        {designation.permission.map((perm, idx) => (
                          <li key={idx}>
                            <strong>{perm.name}</strong>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(designation)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(designation)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Designation Modal */}
          {editModalOpen && (
            <EditDesignationModal
              designation={currentDesignation}
              onClose={() => setEditModalOpen(false)}
              onEditSuccess={() => {
                setEditModalOpen(false);
                refreshDesignations();
              }}
            />
          )}

          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default DesignationList;
