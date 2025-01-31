// src/services/issueService.js



import axiosInstance from "./axiosInstance";


export const fetchDepartmentIssues = async () => {
  const { data } = await axiosInstance.get(`/issues/department`);
  return data; // { success, data, ... }
};

export const fetchAllIssues = async () => {
  const { data } = await axiosInstance.get(`/issues/all`);
  return data; // { success, data, ... }
};
export const fetchOwnIssues = async () => {
  const { data } = await axiosInstance.get(`/issues`);
  return data; // { success, data, ... }
};

// export const addIssue = async (payload) => {
//   // For file upload, build FormData if needed
//   // const formData = new FormData();
//   // formData.append('file', payload.file);
//   // formData.append('issueTitle', payload.issueTitle);
//   // ...
//   const { data } = await axiosInstance.post(`/issues`, payload);
//   return data; // { success, data: {...} }
// };

// CREATE new issue (POST /issues) => expects single file => "file"
export const addIssue = async (payload) => {
    try {
      const formData = new FormData();
  
      // If user attached a file in payload.attachment
      if (payload.attachment) {
        formData.append("file", payload.attachment); 
      }
  
      // Append the other text fields
      formData.append("issueTitle", payload.issueTitle);
      formData.append("issueDescription", payload.issueDescription || "");
      formData.append("priority", payload.priority || "Low");
      formData.append("assignedTo", payload.assignedTo || "");
      formData.append("issueStatus", payload.issueStatus || "Pending");
  
      // Optionally: if you have date / empId / etc.
      // formData.append("someDate", payload.date?.toISOString() || "");
  
      // Use multipart/form-data headers
      const response = await axiosInstance.post(`/issues`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // { success, data, ... }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

// export const updateIssue = async (issueId, payload) => {
//   const { data } = await axiosInstance.put(`/issues/${issueId}`, payload);
//   return data; // { success, data: {...} }
// };

// UPDATE existing issue (PUT /issues/:id) => expects array("files", 5)
export const updateIssue = async (issueId, payload) => {
    try {
      const formData = new FormData();
  
      // If user wants to upload 1 file (the route expects an array "files")
      if (payload.attachment) {
        formData.append("files", payload.attachment);
      }
      // If you have multiple files in an array, you'd do:
      // payload.attachments.forEach(file => formData.append("files", file))
  
      // Append the other text fields
      if (payload.issueTitle) formData.append("issueTitle", payload.issueTitle);
      if (payload.issueDescription) {
        formData.append("issueDescription", payload.issueDescription);
      }
      if (payload.priority) formData.append("priority", payload.priority);
      if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);
      if (payload.issueStatus) formData.append("issueStatus", payload.issueStatus);
  
      const response = await axiosInstance.put(`/issues/${issueId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

export const deleteIssue = async (issueId) => {
  const { data } = await axiosInstance.delete(`/issues/${issueId}`);
  return data; // { success, message: "..."}
};

export const updateIssueStatus = async (issueId, payload) => {
  // e.g. { issueStatus: "Resolved" }
  const { data } = await axiosInstance.put(`/issues/${issueId}/status`, payload);
  return data; // { success, data: {...} }
};

export const getCommentsForIssue = async (issueId) => {
  const { data } = await axiosInstance.get(`/issues/${issueId}/comments`);
  return data; // { success, data: [...] }
};

export const postCommentOnIssue = async (issueId, comment) => {
  const { data } = await axiosInstance.post(`/issues/${issueId}/comments`, { comment });
  return data; // { success, data: {...} }
};
