import { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PolicyManagementSuperAdmin = () => {
  const [policies, setPolicies] = useState([]);
  const [departments, setDepartments] = useState([]);

  // State variables for the policy form
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyContent, setPolicyContent] = useState("");
  const [isGeneralPolicy, setIsGeneralPolicy] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // State variables for editing
  const [editingPolicyId, setEditingPolicyId] = useState(null);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // State variables for image upload
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false); // For loading indicator
  const [uploadedImages, setUploadedImages] = useState([]); // For history
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // For modal

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchDepartments();
    fetchPolicies();
  }, []);

  const fetchDepartments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setDepartments(response.data.data || []);
      } else {
        console.error("Failed to fetch departments:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchPolicies = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/policy/policies/all",

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
    }
  };

  const addOrUpdatePolicy = async () => {
    if (policyTitle.trim() === "" || policyContent.trim() === "") {
      Swal.fire("Policy title and content cannot be empty.", "", "warning");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (confirmResult.isConfirmed) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const policyData = {
          title: policyTitle,
          content: policyContent,
          isGeneral: isGeneralPolicy,
          departments: isGeneralPolicy
            ? []
            : selectedDepartments.map(
                (id) => departments.find((dep) => dep._id === id).department
              ),
        };

        let response;
        if (editingPolicyId) {
          // Update existing policy
          response = await axios.put(
            `https://apiv2.humanmaximizer.com/api/v1/policy/policies/${editingPolicyId}`,

            policyData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } else {
          // Add new policy
          response = await axios.post(
            "https://apiv2.humanmaximizer.com/api/v1/policy/policies",

            policyData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        }

        if (response.data.success) {
          fetchPolicies();
          resetForm();
          Swal.fire("Saved!", "Your policy has been saved.", "success");
        } else {
          console.error("Failed to save policy:", response.data.message);
          Swal.fire(
            "Error",
            "Failed to save policy. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error saving policy:", error);
        Swal.fire("Error", "Error saving policy. Please try again.", "error");
      }
    } else if (confirmResult.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
    // If canceled, do nothing
  };

  const deletePolicy = async (policyId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.delete(
              `https://apiv2.humanmaximizer.com/api/v1/policy/policies/${policyId}`,

              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (response.data.success) {
              setPolicies(policies.filter((policy) => policy._id !== policyId));
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your policy has been deleted.",
                "success"
              );
            } else {
              console.error("Failed to delete policy:", response.data.message);
              swalWithBootstrapButtons.fire(
                "Error",
                "Failed to delete policy. Please try again.",
                "error"
              );
            }
          } catch (error) {
            console.error("Error deleting policy:", error);
            swalWithBootstrapButtons.fire(
              "Error",
              "Error deleting policy. Please try again.",
              "error"
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your policy is safe :)",
            "error"
          );
        }
      });
  };

  const startEditingPolicy = async (policy) => {
    const confirmResult = await Swal.fire({
      title: "Do you want to edit this policy?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Edit",
      denyButtonText: `Don't edit`,
    });

    if (confirmResult.isConfirmed) {
      setEditingPolicyId(policy._id);
      setPolicyTitle(policy.title);
      setPolicyContent(policy.content);
      setIsGeneralPolicy(policy.isGeneral);
      setSelectedDepartments(
        policy.departments.map((depName) => {
          const dep = departments.find((d) => d.department === depName);
          return dep ? dep._id : null;
        })
      );
      Swal.fire("You can now edit the policy.", "", "info");
    } else if (confirmResult.isDenied) {
      Swal.fire("Edit cancelled", "", "info");
    }
    // If canceled, do nothing
  };

  const resetForm = () => {
    setEditingPolicyId(null);
    setPolicyTitle("");
    setPolicyContent("");
    setIsGeneralPolicy(true);
    setSelectedDepartments([]);
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

  // Handle image file selection
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setUploadedImageUrl("");
    setCopySuccess("");
  };

  // Handle image upload on button click
  const handleImageUpload = async () => {
    if (!selectedImageFile) {
      Swal.fire("Please select an image file first.", "", "warning");
      return;
    }

    setIsUploading(true); // Show loading indicator

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", selectedImageFile);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/upload/image",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data && response.data.url) {
        setUploadedImageUrl(response.data.url);
        setUploadedImages((prevImages) => [
          { url: response.data.url },
          ...prevImages,
        ]); // Add to history
        setSelectedImageFile(null); // Reset the selected file
        Swal.fire("Image uploaded successfully!", "", "success");
      } else {
        Swal.fire("Failed to upload image.", "", "error");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error uploading image. Please try again.", "", "error");
    } finally {
      setIsUploading(false); // Hide loading indicator
    }
  };

  // Clear uploaded image
  const clearUploadedImage = () => {
    setUploadedImageUrl("");
    setSelectedImageFile(null);
    setCopySuccess("");
  };

  // Open and close history modal
  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  // Clear all uploaded images from state (frontend only)
  const clearAllUploadedImages = () => {
    Swal.fire({
      title: "Are you sure you want to clear all uploaded images?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear them!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        setUploadedImages([]);
        clearUploadedImage();
        Swal.fire(
          "Cleared!",
          "All uploaded images have been cleared.",
          "success"
        );
      }
    });
  };

  // Function to copy the image URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedImageUrl).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy.");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    );
  };

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="container rzr-company">
          <h1>Update Comapany Policies </h1>

          {/* Policy Form */}
          <div>
            <h2>{editingPolicyId ? "Edit Policy" : "Add New Policy"}</h2>

            {/* Policy Title Input */}
            <input
              type="text"
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
              placeholder="Enter Policy Title"
            />

            {/* Policy Content Editor */}
            <Editor
              tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
              value={policyContent}
              init={{
                license_key: "gpl",
                height: 400,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "link",
                  "image",
                  "lists",
                  "charmap",
                  "preview",
                  "anchor",
                  "pagebreak",
                  "searchreplace",
                  "wordcount",
                  "visualblocks",
                  "visualchars",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "emoticons",
                  "help",
                ],
                toolbar:
                  "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
                menu: {
                  favs: {
                    title: "My Favorites",
                    items: "code visualaid | searchreplace | emoticons",
                  },
                },
                menubar: "favs file edit view insert format tools table help",
              }}
              onEditorChange={(content) => setPolicyContent(content)}
            />

            {/* Image Uploader Component */}
            {/* ... (Your existing image upload code) */}

            {/* Image Uploader Component */}
            <div className="pt-3">
              <input
                type="file"
                accept="image/*"
                className="w-50 m-2"
                onChange={handleImageFileChange}
              />
              <button onClick={handleImageUpload}>Upload Image</button>
              <button onClick={clearUploadedImage}>Clear</button>
              {isUploading && <div>Uploading image...</div>}

              {uploadedImageUrl && (
                <div>
                  <p>Image URL:</p>
                  <div>
                    <input
                      type="text"
                      className="w-50 m-2"
                      value={uploadedImageUrl}
                      readOnly
                    />
                    <button onClick={copyToClipboard}>Copy</button>
                  </div>
                  {copySuccess && <p>{copySuccess}</p>}
                  <p>
                    NOTE: You can copy this URL and paste it into the TinyMCE
                    editor.
                  </p>
                  <div>
                    <p>Image Preview:</p>
                    <img src={uploadedImageUrl} alt="Uploaded" />
                  </div>
                </div>
              )}
              {/* Button to open history modal */}
              <div className="pt-3 pb-4 p-2">
                <button onClick={openHistoryModal}>View Uploaded Images</button>
                <button onClick={clearAllUploadedImages}>
                  Clear All Images
                </button>
              </div>
            </div>

            {/* History Modal */}
            {isHistoryModalOpen && (
              <div>
                <div>
                  <button onClick={closeHistoryModal}>Close</button>
                  <h2>Uploaded Images</h2>
                  {uploadedImages.length === 0 ? (
                    <p>No uploaded images found.</p>
                  ) : (
                    <>
                      <div>
                        {uploadedImages.map((img, index) => (
                          <div key={index}>
                            <img src={img.url} alt="Uploaded" />
                            <input
                              className="w-50 m-3"
                              type="text"
                              value={img.url}
                              readOnly
                            />
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(img.url);
                                Swal.fire(
                                  "Image URL copied to clipboard.",
                                  "",
                                  "success"
                                );
                              }}
                            >
                              Copy URL
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Policy Type Selection */}
            <div className="pt-4 pb-4">
              <div>
                <label>
                  <input
                    type="radio"
                    checked={isGeneralPolicy}
                    onChange={() => {
                      setIsGeneralPolicy(true);
                      setSelectedDepartments([]);
                    }}
                  />
                  General Policy (All Departments)
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    checked={!isGeneralPolicy}
                    onChange={() => setIsGeneralPolicy(false)}
                  />
                  Specific Departments
                </label>
              </div>
              {!isGeneralPolicy && (
                <div>
                  {departments.map((dep) => (
                    <div key={dep._id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDepartments.includes(dep._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDepartments([
                                ...selectedDepartments,
                                dep._id,
                              ]);
                            } else {
                              setSelectedDepartments(
                                selectedDepartments.filter(
                                  (id) => id !== dep._id
                                )
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
              <div className="pt-4">
                <button onClick={addOrUpdatePolicy}>
                  {editingPolicyId ? "Update Policy" : "Add Policy"}
                </button>
                {editingPolicyId && <button onClick={resetForm}>Cancel</button>}
              </div>
            </div>
          </div>

          {/* Policies List */}
          <div className="hm-update-policies">
            <h2>Posted Policies</h2>
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
                    <button onClick={() => startEditingPolicy(policy)}>
                      Edit
                    </button>
                    <button onClick={() => deletePolicy(policy._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Modal */}
          {isModalOpen && selectedPolicy && (
            <div>
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

export default PolicyManagementSuperAdmin;
