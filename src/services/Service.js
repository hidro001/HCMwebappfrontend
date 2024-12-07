import axios from "axios";

// const API_URL = "https://apiv2.humanmaximizer.com/api/v1/user";
const API_URL = "https://apiv2.humanmaximizer.com/api/v1/user";

// Login function
const login = async (employeeId, password) => {
  try {
    console.log("Sending login request..."); // Log request initiation
    const response = await axios.post(`${API_URL}/login`, {
      employee_Id: employeeId,
      password: password,
    });
    console.log("Login response:", response.data); // Log the full response
    if (response.data.success) {
      localStorage.setItem("accessToken", response.data.accessToken); // Store the token in local storage
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

// OTP Verification function (new addition)
const verifyOtp = async (employeeId, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      employee_Id: employeeId,
      otp,
    });

    console.log("OTP verification response:", response.data); // Log the response
    // const response = await axios.post(`${API_URL}/verify-otp`, {
    //   employee_Id: employeeId,
    //   otp,
    // });

    if (response.data.success) {
      return response.data; // Return the response with accessToken
    }
  } catch (error) {
    console.error("OTP verification error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

// Resend OTP API
const resendOtp = async (employeeId) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, {
      employee_Id: employeeId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to resend OTP");
  }
};

// Register function
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register");
  }
};
// Register function
const registerSuperAdmin = async (userData) => {
  try {
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/superadmin/register`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register");
  }
};
const registerSuperAdminadmin = async (userData, accessToken) => {
  try {
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/admin/register`,
      userData, // Send the data directly as JSON
      {
        headers: {
          "Content-Type": "application/json", // Use application/json for JSON payloads
          Authorization: `Bearer ${accessToken}`, // Send access token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register");
  }
};

// Get user profile function
const getUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/user-profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

const updateUserStatus = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // console.log("Access Token:", accessToken); // Debugging purpose

    if (!accessToken) {
      throw new Error("Access token not found. Please log in.");
    }

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/admin/user-status/${employeeId}`,
      {}, // Empty data payload if not required by the API
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw new Error(
      error.response?.data?.message || "Failed to toggle user status."
    );
  }
};

// Get all users function
const getAllUsers = async (credentials) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${API_URL}/all-user`,
      { ...credentials },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Get all users for chart function
const getChart = async (credentials) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/user/user-chart`,
      { ...credentials },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Get user details function
const getUserDetails = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${API_URL}/getuser/${employeeId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user details"
    );
  }
};

// Edit user profile function
const editUserProfile = async (employeeId, formData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    // Make the POST request with FormData
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/user/edit-profile/${employeeId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response:", response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.message || error.message); // Log the error message
    throw new Error(
      error.response?.data?.message || "Failed to edit user profile"
    );
  }
};

// Delete user function
const deleteUser = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://apiv2.humanmaximizer.com/api/v1/admin/delete-user-and-info/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
const deleteSuperUser = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://apiv2.humanmaximizer.com/api/v1/superadmin/delete-user/${employeeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Accessss token : ", accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

const deleteManagerUser = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/manager/delete-user-and-info/${employeeId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

// Logout function
const logout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    localStorage.removeItem("accessToken"); // Remove the token from local storage
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to logout");
  }
};

// Post leave function
const postLeave = async (leaveData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/leave/applyleave`,
      leaveData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to post leave");
  }
};

// Get manager's leave requests
const getManagerLeaveRequestsByStatus = () => {
  return axios.get(`https://apiv2.humanmaximizer.com/api/v1/leave/manager/leaverequests`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// Handle (approve/reject) leave request
const handleLeaveRequest = (id, actionData) => {
  return axios.put(
    `https://apiv2.humanmaximizer.com/api/v1/leave/manager/leaverequests/${id}`,
    actionData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

// Fetch employee's leave requests by status
const getEmployeeLeaveRequestsByStatus = (status) => {
  return axios.get(`https://apiv2.humanmaximizer.com/leave/employee/leaverequests`, {
    params: { status },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// Fetch leave function
const fetchLeave = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/leave/fetch-all-leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch leaves");
  }
};

// Approve leave function
// Approve leave function
const approveLeave = async (leaveId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/leave/leaveaction`,
      { leave_Id: leaveId, leave_Action: "approved" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to approve leave");
  }
};

// Reject leave function
const rejectLeave = async (leaveId, leave_Action, reason_For_Reject) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/leave/leaveaction`,
      {
        leave_Id: leaveId,
        leave_Action: "rejected",
        reason_For_Reject,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to reject leave");
  }
};

// Fetch employee leave function
const fetchEmployeeLeave = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://apiv2.humanmaximizer.com/api/v1/leave/fetch-leave",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch employee leave"
      );
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch employee leave"
    );
  }
};

export async function addTask(taskDescriptions) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in again.");
  }

  try {
    const response = await fetch("https://apiv2.humanmaximizer.com/api/v1/task/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        task: taskDescriptions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error Response from Server:", error);
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
}

// Function to get task list

const getTaskListByDate = async (date) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage
    console.log("Fetching tasks for date:", date || "all dates");

    const url = date
      ? `https://apiv2.humanmaximizer.com/api/v1/task/task-list?task_Date=${date}`
      : `https://apiv2.humanmaximizer.com/api/v1/task/task-list`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return response.data.data; // Return the data part of the response
    } else {
      throw new Error(response.data.message || "Failed to fetch task list");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch task list"
    );
  }
};

const fetchEmployeeTasks = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/task/all-task/${employeeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch employee tasks"
      );
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch employee tasks"
    );
  }
};

const getManagerUserList = async (credentials) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/manager/user-list`,
      { ...credentials },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch manager user list"
    );
  }
};

const fetchManagerLeaveList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/manager/leave-list`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch manager leave list"
    );
  }
};

const getManagerTaskList = async (date) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage
    console.log("Fetching tasks for date:", date || "all dates");

    const url = date
      ? `https://apiv2.humanmaximizer.com/api/v1/manager/task-list?task_Date=${date}`
      : `https://apiv2.humanmaximizer.com/api/v1/manager/task-list`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data.data }; // Ensure the structure matches what fetchTasks expects
    } else {
      throw new Error(response.data.message || "Failed to fetch task list");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch task list"
    );
  }
};

const addUserForManager = async (userData) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/manager/add-user`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add user");
  }
};

async function addPerformer(performerDetails) {
  const accessToken = localStorage.getItem("accessToken");

  // Create a FormData object and append the performer details
  const formData = new FormData();
  for (const key in performerDetails) {
    formData.append(key, performerDetails[key]);
  }

  try {
    const response = await axios.post(
      "https://apiv2.humanmaximizer.com/api/v1/admin/add-performer",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding performer:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.message : "Something went wrong"
    );
  }
}

const fetchPerformerList = async (month, year) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const date = `${year}-${String(month).padStart(2, "0")}`;
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/admin/performer-list?date=${date}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch performer list"
    );
  }
};

const addAnnouncement = async (announcementDetails) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Log the FormData contents for debugging
    for (let pair of announcementDetails.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/admin/announcement`,
      announcementDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding announcement:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to add announcement"
    );
  }
};

const fetchAnnouncementList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
    const response = await axios.get(
      // `https://apiv2.humanmaximizer.com/api/v1/admin/announcement`,
      `https://apiv2.humanmaximizer.com/api/v1/admin/announcement`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch announcement list"
    );
  }
};
const fetchAnnouncementListEmployee = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
    const response = await axios.get(
      // `https://apiv2.humanmaximizer.com/api/v1/admin/announcement`,
      `https://apiv2.humanmaximizer.com/api/v1/announcement`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch announcement list"
    );
  }
};
const fetchAnnouncementListManager = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
    const response = await axios.get(
      // `https://apiv2.humanmaximizer.com/api/v1/admin/announcement`,
      `https://apiv2.humanmaximizer.com/api/v1/manager/announcement`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch announcement list"
    );
  }
};

const getSupport = async (supportData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/support/get-support`,
      supportData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch support data"
    );
  }
};

async function submitSupportIssue(issueData) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(
    "https://apiv2.humanmaximizer.com/api/v1/support/post-support",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(issueData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

const getPerformerListByDate = async (date) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage
    console.log("Fetching performer list for date:", date || "all dates");

    const url = date
      ? `https://apiv2.humanmaximizer.com/api/v1/admin/performer-list?date=${date}`
      : `https://apiv2.humanmaximizer.com/api/v1/admin/performer-list`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return response.data.data; // Return the data part of the response
    } else {
      throw new Error(
        response.data.message || "Failed to fetch performer list"
      );
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch performer list"
    );
  }
};

const addIssue = async (issueDetails) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();

    // Append issue details to the FormData object
    for (let key in issueDetails) {
      formData.append(key, issueDetails[key]);
    }

    // Log the FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/issues`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding issue:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add issue");
  }
};

// const addIssue = async (issueDetails) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found. Please log in.");
//     }

//     const response = await axios.post(
//       `https://apiv2.humanmaximizer.com/api/v1/issues`, // Corrected Endpoint
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

// Define the function to fetch issues
async function getIssuesEmployee(accessToken) {
  const url = "https://apiv2.humanmaximizer.com/api/v1/employee/issues";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}

// Function to update an issue

const fetchAllIssuesAdmin = async (queryDepartment = "", queryTeam = "") => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Create query params only if queryDepartment and queryTeam are provided
    const queryParams = new URLSearchParams();
    if (queryDepartment && queryDepartment !== "All") {
      queryParams.append("queryDepartment", queryDepartment);
    }
    if (queryTeam && queryTeam !== "All") {
      queryParams.append("queryTeam", queryTeam);
    }

    // Construct the URL, adding queryParams only if they exist
    const apiUrl = `https://apiv2.humanmaximizer.com/api/v1/admin/v2/issuesquery${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    // Use error chaining to display more relevant error information
    throw new Error(error.response?.data?.message || "Failed to fetch issues");
  }
};
const fetchAllIssuesSuperAdmin = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      "https://apiv2.humanmaximizer.com/api/v1/superadmin/issue",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Use error chaining to display more relevant error information
    throw new Error(error.response?.data?.message || "Failed to fetch issues");
  }
};

const deleteIssueByIdAdmin = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.delete(
      `https://apiv2.humanmaximizer.com/api/v1/admin/issues/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete issue");
  }
};

const updateIssueByIdAdmin = async (id, updatedData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.put(
      `https://apiv2.humanmaximizer.com/api/v1/admin/issues/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update issue");
  }
};

const fetchAllIssuesManager = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `https://apiv2.humanmaximizer.com/api/v1/manager/v2/issues`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch issues");
  }
};

const updateIssueByIdManager = async (id, updatedData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.put(
      `https://apiv2.humanmaximizer.com/api/v1/manager/issues/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update issue");
  }
};

const postCommentOnIssueAdmin = async (issueId, message) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/admin/issues/comment/${issueId}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to post comment");
  }
};

const getCommentsForIssueAdmin = async (issueId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `https://apiv2.humanmaximizer.com/api/v1/admin/issues/comment/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

const postCommentOnIssueForManager = async (issueId, message) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      `https://apiv2.humanmaximizer.com/api/v1/manager/issues/comment/${issueId}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to post comment");
  }
};

const getCommentsForIssueForManager = async (issueId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `https://apiv2.humanmaximizer.com/api/v1/manager/issues/comment/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

const actionTrackerAssignTaskForManager = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      "https://apiv2.humanmaximizer.com/api/v1/manager/assigntask",

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to assign task");
  }
};

const getAttendance = async (params = {}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const response = await axios.get(
      `https://apiv2.humanmaximizer.com/api/v1/admin/attendence/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params, // employee_Id, startDate, endDate
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching attendance:",
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch attendance"
    );
  }
};

// // Fetch all users (to list subordinates)
// const getAllUsers = async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await axios.get(
//       `https://apiv2.humanmaximizer.com/api/v1/admin/users`,
//       {
//         // Ensure this endpoint exists
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error.response || error.message);
//     throw new Error(error.response?.data?.message || "Failed to fetch users");
//   }
// };

const getSubordinates = async (employeeId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const response = await axios.get(
      `https://apiv2.humanmaximizer.com/api/v1/admin/subordinates`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subordinates:",
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch subordinates"
    );
  }
};

//  hello
export default {
  login,
  verifyOtp,
  resendOtp,
  register,
  getUserProfile,
  getAllUsers,
  getChart,
  updateUserStatus,
  getUserDetails,
  editUserProfile,
  logout,
  postLeave,
  // getManagerLeaveRequests,
  getManagerLeaveRequestsByStatus,
  getEmployeeLeaveRequestsByStatus,
  handleLeaveRequest,
  fetchLeave,
  approveLeave,
  rejectLeave,
  fetchEmployeeLeave,
  addTask,
  fetchEmployeeTasks,
  getTaskListByDate,
  getManagerUserList,
  fetchManagerLeaveList,
  getManagerTaskList,
  addUserForManager,
  deleteUser,
  deleteManagerUser,
  addPerformer,
  fetchPerformerList,
  addAnnouncement,
  fetchAnnouncementList,
  submitSupportIssue,
  getSupport,
  getPerformerListByDate,
  addIssue,
  getIssuesEmployee,
  fetchAllIssuesAdmin,
  deleteIssueByIdAdmin,
  updateIssueByIdAdmin,
  fetchAllIssuesManager,
  updateIssueByIdManager,
  postCommentOnIssueAdmin,
  getCommentsForIssueAdmin,
  postCommentOnIssueForManager,
  getCommentsForIssueForManager,
  actionTrackerAssignTaskForManager,
  deleteSuperUser,
  registerSuperAdmin,
  registerSuperAdminadmin,
  fetchAnnouncementListEmployee,
  fetchAnnouncementListManager,
  fetchAllIssuesSuperAdmin,
  getAttendance,
  // getAllUserss,
  getSubordinates,
};
