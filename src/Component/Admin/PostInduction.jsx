import React, { useState, useEffect } from "react";
import axios from "axios";

const PostInduction = () => {
  // State for managing uploaded PPTs
  const [pptList, setPptList] = useState([]);
  const [departments, setDepartments] = useState([]);

  // States for uploading new PPT
  const [pptTitle, setPptTitle] = useState("");
  const [pptFile, setPptFile] = useState(null);
  const [isGeneral, setIsGeneral] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // States for editing existing PPT
  const [editingPptId, setEditingPptId] = useState(null);
  const [editingPptTitle, setEditingPptTitle] = useState("");
  const [editingIsGeneral, setEditingIsGeneral] = useState(true);
  const [editingDepartments, setEditingDepartments] = useState([]);
  const [editingPptFile, setEditingPptFile] = useState(null);

  // Loading states
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState({}); // Track deletion per PPT

  useEffect(() => {
    fetchDepartments();
    fetchPpts();
  }, []);

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
      );
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchPpts = async () => {
    try {
      // Get the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      // Make the request with the Authorization header
      const response = await axios.get("https://apiv2.humanmaximizer.com/api/v1/ppt/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token in Authorization header
        },
      });

      // Handle response and set data
      setPptList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching PPTs:", error);
    }
  };

  // Handle uploading new PPT
  const handleUploadPpt = async () => {
    const formData = new FormData();

    if (!pptTitle.trim() || !pptFile) {
      alert("Title and file are required for uploading.");
      return;
    }

    formData.append("title", pptTitle.trim());
    formData.append("file", pptFile);
    formData.append("isGeneral", isGeneral);

    if (!isGeneral) {
      const selectedDepNames = selectedDepartments.map(
        (id) => departments.find((dep) => dep._id === id)?.department
      );
      formData.append("departments", JSON.stringify(selectedDepNames));
    }

    try {
      setIsUploading(true); // Start loading
      const accessToken = localStorage.getItem("accessToken");

      await axios.post("https://apiv2.humanmaximizer.com/api/v1/ppt/upload", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchPpts(); // Refresh the list
      // Reset upload form
      setPptTitle("");
      setPptFile(null);
      setIsGeneral(true);
      setSelectedDepartments([]);
      alert("PPT uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PPT:", error);
      alert("Failed to upload PPT. Please try again.");
    } finally {
      setIsUploading(false); // End loading
    }
  };

  const handleUpdatePpt = async (pptId) => {
    const formData = new FormData();

    if (!editingPptTitle.trim()) {
      alert("Title is required for updating.");
      return;
    }

    formData.append("title", editingPptTitle.trim());
    formData.append("isGeneral", editingIsGeneral);

    // Clear departments if General is selected
    if (editingIsGeneral) {
      formData.append("departments", JSON.stringify([])); // Ensure departments are empty for general
    } else {
      const selectedDepNames = editingDepartments.map(
        (id) => departments.find((dep) => dep._id === id)?.department
      );
      formData.append("departments", JSON.stringify(selectedDepNames));
    }

    // Only append file if one is provided
    if (editingPptFile) {
      formData.append("file", editingPptFile);
    }

    try {
      setIsUpdating(true); // Start loading
      const accessToken = localStorage.getItem("accessToken");

      await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/ppt/update/${pptId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchPpts(); // Refresh the list
      cancelEditingPpt(); // Clear editing state
      alert("PPT updated successfully!");
    } catch (error) {
      console.error("Error updating PPT:", error);
      alert("Failed to update PPT. Please try again.");
    } finally {
      setIsUpdating(false); // End loading
    }
  };

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

  // Handle deleting PPT
  const deletePpt = async (pptId, fileUrl) => {
    if (!window.confirm("Are you sure you want to delete this PPT?")) return;

    try {
      setIsDeleting((prev) => ({ ...prev, [pptId]: true })); // Start loading for this PPT
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete(
        "https://apiv2.humanmaximizer.com/api/v1/ppt/delete",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { imageUrl: fileUrl },
        }
      );

      if (response.data.success) {
        // Remove the deleted item from the pptList state immediately
        setPptList((prevList) => prevList.filter((ppt) => ppt._id !== pptId));
        console.log("PPT deleted successfully");
        alert("PPT deleted successfully!");
      } else {
        console.error("Failed to delete PPT:", response.data.message);
        alert("Failed to delete PPT. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting PPT:", error);
      alert("Error deleting PPT. Please try again.");
    } finally {
      setIsDeleting((prev) => ({ ...prev, [pptId]: false })); // End loading for this PPT
    }
  };

  // Start editing a specific PPT
  const startEditingPpt = (ppt) => {
    setEditingPptId(ppt._id);
    setEditingPptTitle(ppt.title);
    setEditingIsGeneral(ppt.isGeneral);
    setEditingDepartments(
      ppt.departments.map(
        (depName) =>
          departments.find((dep) => dep.department === depName)?._id || ""
      )
    );
  };

  // Cancel editing
  const cancelEditingPpt = () => {
    setEditingPptId(null);
    setEditingPptTitle("");
    setEditingIsGeneral(true);
    setEditingDepartments([]);
    setEditingPptFile(null);
  };

  // Handle file change for uploading
  const handleUploadFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.match(/\.(ppt|pptx)$/)) {
      alert("Please upload a valid PPT file (.ppt or .pptx).");
      e.target.value = null; // Reset the input
      return;
    }
    setPptFile(file);
  };

  // Handle file change for editing
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.match(/\.(ppt|pptx)$/)) {
      alert("Please upload a valid PPT file (.ppt or .pptx).");
      e.target.value = null; // Reset the input
      return;
    }
    setEditingPptFile(file);
  };

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="container hm-upload-inductionppt">
          <h1>Induction PPT Management</h1>

          {/* Upload New PPT Form */}
          <div>
            <h3>Upload New Induction PPT</h3>
            <input
              type="text"
              placeholder="Enter PPT Title"
              value={pptTitle}
              onChange={(e) => setPptTitle(e.target.value)}
            />
            <input
              type="file"
              accept=".ppt,.pptx"
              onChange={handleUploadFileChange}
            />

            <div>
              <label>
                <input
                  type="radio"
                  name="uploadPptType"
                  checked={isGeneral}
                  // onChange={() => setIsGeneral(true)}
                  onChange={() => {
                    setIsGeneral(true);
                    setSelectedDepartments([]); // Clear selected departments when switching to General
                  }}
                />
                General PPT (All Departments)
              </label>
              <label>
                <input
                  type="radio"
                  name="uploadPptType"
                  checked={!isGeneral}
                  onChange={() => setIsGeneral(false)}
                />
                Specific Departments
              </label>
            </div>

            {!isGeneral && (
              <div className="department-selection">
                {departments.map((dep) => (
                  <div key={dep._id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dep._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments((prev) => [
                              ...prev,
                              dep._id,
                            ]);
                          } else {
                            setSelectedDepartments((prev) =>
                              prev.filter((id) => id !== dep._id)
                            );
                          }
                        }}
                      />
                      {dep.department}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleUploadPpt}
              disabled={isUploading} // Disable button while uploading
            >
              {isUploading ? (
                <>
                  <span className="spinner"></span> Uploading...
                </>
              ) : (
                "Upload PPT"
              )}
            </button>
          </div>

          {/* PPT List */}
          <div>
            <h2>Uploaded PPTs</h2>
            <ul>
              {pptList.map((ppt) => (
                <li key={ppt._id}>
                  {editingPptId === ppt._id ? (
                    // Inline Edit Form
                    <div>
                      <input
                        type="text"
                        value={editingPptTitle}
                        onChange={(e) => setEditingPptTitle(e.target.value)}
                        placeholder="Enter PPT Title"
                      />
                      <input
                        type="file"
                        accept=".ppt,.pptx"
                        onChange={handleEditFileChange}
                      />

                      <div>
                        <label>
                          <input
                            type="radio"
                            name={`pptType-${ppt._id}`}
                            checked={editingIsGeneral}
                            // onChange={() => setEditingIsGeneral(true)}
                            onChange={() => {
                              setEditingIsGeneral(true);
                              setEditingDepartments([]); // Clear departments when switching to General
                            }}
                          />
                          General PPT (All Departments)
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`pptType-${ppt._id}`}
                            checked={!editingIsGeneral}
                            onChange={() => setEditingIsGeneral(false)}
                          />
                          Specific Departments
                        </label>
                      </div>
                      {!editingIsGeneral && (
                        <div>
                          {departments.map((dep) => (
                            <label key={dep._id}>
                              <input
                                type="checkbox"
                                checked={editingDepartments.includes(dep._id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEditingDepartments((prev) => [
                                      ...prev,
                                      dep._id,
                                    ]);
                                  } else {
                                    setEditingDepartments((prev) =>
                                      prev.filter((id) => id !== dep._id)
                                    );
                                  }
                                }}
                              />
                              {dep.department}
                            </label>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => handleUpdatePpt(ppt._id)}
                        disabled={isUpdating} // Disable button while updating
                      >
                        {isUpdating ? (
                          <>
                            <span className="spinner"></span> Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>

                      <button onClick={cancelEditingPpt}>Cancel</button>
                    </div>
                  ) : (
                    // Display PPT Details
                    <div>
                      {/* <div>
                    <p style={styles.itemTitle}>{ppt.title}</p>
                    <span style={styles.department}>{ppt.departments.map}</span>
                    <a
                      href={ppt.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div> */}

                      <div>
                        <p>{ppt.title}</p>
                        <span>
                          {ppt.departments.map((dept, index) => (
                            <span key={index}>
                              {dept}
                              {index < ppt.departments.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                        <button
                          // href={ppt.fileUrl}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          onClick={() => handleDownload(ppt)}
                        >
                          Download
                        </button>
                      </div>
                      <div>
                        <button onClick={() => startEditingPpt(ppt)}>
                          Edit
                        </button>
                        <button
                          onClick={() => deletePpt(ppt._id, ppt.fileUrl)}
                          disabled={isDeleting[ppt._id]} // Disable if deleting
                        >
                          {isDeleting[ppt._id] ? (
                            <>
                              <span className="spinner"></span> Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInduction;
