// import axios from "axios";

// const API_URL = "https://apiv2.humanmaximizer.com/api/v1";

// const addIssue = async (issueDetails) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found. Please log in.");
//     }

//     const response = await axios.post(
//       `${{ API_URL }/issues`, // Corrected Endpoint
//       issueDetails,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           // "Content-Type": "multipart/form-data", // Removed to let axios set it automatically
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error adding issue:", error.response?.data || error.message);
//     // Optionally, throw the entire error for more detailed handling
//     throw new Error(error.response?.data?.message || "Failed to add issue");
//   }
// };

// // Fetch all issues for department head
// const fetchDepartmentIssues = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await axios.get(`${API_URL}/issues/departmentissues`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     return response.data;
// };

// // Update issue status
// const updateIssueStatus = async (issueId, status) => {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await axios.put(`${API_URL}/${issueId}/status`, { issueStatus: status }, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//         },
//     });
//     return response.data;
// };

// export default {
//   addIssue,
//   fetchDepartmentIssues,
//   updateIssueStatus,
// };

import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1";

// Add a new issue
const addIssue = async (issueDetails) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(
      `${API_URL}/issues`, // Corrected endpoint syntax
      issueDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Content-Type is set automatically for JSON data
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding issue:", error.response?.data || error.message);
    // Optionally throw the error for the calling function to handle
    throw new Error(error.response?.data?.message || "Failed to add issue");
  }
};

const deleteIssue = async (issueId) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.delete(`${API_URL}/issues/${issueId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// Fetch all issues for department head
const fetchDepartmentIssues = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/issues/department`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching department issues:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch issues");
  }
};

// Update issue status
const updateIssueStatus = async (issueId, updatedData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.put(
      `${API_URL}/issues/${issueId}/status`, // Fixed endpoint structure
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Explicitly setting content type for JSON
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating issue status:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update issue status"
    );
  }
};
// services/service.js

// Helper function to get access token
const getAccessToken = () => localStorage.getItem("accessToken");

// Add a new comment to an issue
const postCommentOnIssue = async (issueId, comment) => {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(
      `${API_URL}/issues/${issueId}/comments`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Expected structure: { success: true, data: {...} }
  } catch (error) {
    console.error(
      "Error posting comment:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to add comment");
  }
};

// Get all comments for a specific issue
const getCommentsForIssue = async (issueId) => {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/issues/${issueId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return response.data.data; // Assuming 'data' contains an array of comments
    } else {
      throw new Error(response.data.message || "Failed to fetch comments.");
    }
  } catch (error) {
    console.error(
      "Error fetching comments:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments."
    );
  }
};

const getAllIssues = async (params = {}) => {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/issues/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      params, // Pagination, sorting, filtering
    });

    return response.data; // { success: true, data: [...], pagination: {...} }
  } catch (error) {
    console.error(
      "Error fetching all issues:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch issues");
  }
};

// Export all functions as a module
export default {
  addIssue,
  fetchDepartmentIssues,
  updateIssueStatus,
  deleteIssue,
  getCommentsForIssue,
  postCommentOnIssue,
  getAllIssues,
};
