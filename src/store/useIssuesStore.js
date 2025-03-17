

import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; // Adjust the path as needed

const useIssuesStore = create((set, get) => ({
  // ----- State -----
  issues: [],
  loading: false,
  error: null,
  selectedIssue: null, // For storing the currently selected issue (if needed)
  comments: [], // Comments for the selected issue
  isCommentLoading: false, // Loading flag for comment-related operations

  // ----- Actions -----

  // 1) Fetch department issues
  fetchDeptIssues: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/issues/department");
      if (data.success) {
        set({ issues: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },

  // 2) Fetch all issues
  fetchAllIssues: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/issues/all");
      if (data.success) {
        set({ issues: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },

  // 3) Fetch own issues
  fetchOwnIssues: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/issues");
      if (data.success) {
        set({ issues: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },

  // 4) Create a new issue
  createIssue: async (payload) => {
    try {
      set({ loading: true });
      // Build FormData to support file upload (if any)
      const formData = new FormData();
      if (payload.attachment) {
        formData.append("file", payload.attachment);
      }
      formData.append("issueTitle", payload.issueTitle);
      formData.append("issueDescription", payload.issueDescription || "");
      formData.append("priority", payload.priority || "Low");
      formData.append("assignedTo", payload.assignedTo || "");
      formData.append("issueStatus", payload.issueStatus || "Pending");
      
      const response = await axiosInstance.post("/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = response.data;
      if (res.success && res.data) {
        // Append the new issue to the existing list
        set((state) => ({ issues: [...state.issues, res.data] }));
        toast.success("Issue created successfully!");
      } else {
        throw new Error(res.message || "Failed to create issue");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error creating issue");
    } finally {
      set({ loading: false });
    }
  },

  // 5) Update an existing issue
  editIssue: async (issueId, payload) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      // Append file if available (expects field "files" on server-side)
      if (payload.attachment) {
        formData.append("files", payload.attachment);
      }
      // Append other fields if provided
      if (payload.issueTitle) formData.append("issueTitle", payload.issueTitle);
      if (payload.issueDescription) formData.append("issueDescription", payload.issueDescription);
      if (payload.priority) formData.append("priority", payload.priority);
      if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);
      if (payload.issueStatus) formData.append("issueStatus", payload.issueStatus);
      
      const response = await axiosInstance.put(`/issues/${issueId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = response.data;
      if (res.success && res.data) {
        set((state) => ({
          issues: state.issues.map((iss) =>
            iss._id === issueId ? res.data : iss
          ),
        }));
        toast.success("Issue updated successfully!");
      } else {
        throw new Error(res.message || "Failed to update issue");
      }
    } catch (err) {
      toast.error(err.message || "Error updating issue");
    } finally {
      set({ loading: false });
    }
  },

  // 6) Delete an issue
  removeIssue: async (issueId) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.delete(`/issues/${issueId}`);
      if (data.success) {
        set((state) => ({
          issues: state.issues.filter((iss) => iss._id !== issueId),
        }));
        toast.success("Issue deleted successfully!");
      } else {
        throw new Error(data.message || "Failed to delete issue");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  // 7) Update issue status
  changeIssueStatus: async (issueId, statusPayload) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.put(
        `/issues/${issueId}/status`,
        statusPayload
      );
      if (data.success && data.data) {
        set((state) => ({
          issues: state.issues.map((iss) =>
            iss._id === issueId ? data.data : iss
          ),
        }));
        toast.success(`Issue status updated to ${data.data.issueStatus}`);
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  // ----- Comments -----

  // 8) Fetch comments for a specific issue
  fetchComments: async (issueId) => {
    set({ isCommentLoading: true, comments: [] });
    try {
      const { data } = await axiosInstance.get(`/issues/${issueId}/comments`);
      if (data.success && Array.isArray(data.data)) {
        set({ comments: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch comments");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCommentLoading: false });
    }
  },

  // 9) Post a comment on an issue
  postComment: async (issueId, commentText) => {
    try {
      set({ isCommentLoading: true });
      const { data } = await axiosInstance.post(`/issues/${issueId}/comments`, {
        comment: commentText,
      });
      if (data.success && data.data) {
        set((state) => ({
          comments: [...state.comments, data.data],
        }));
        toast.success("Comment added successfully!");
      } else {
        throw new Error(data.message || "Failed to add comment");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCommentLoading: false });
    }
  },
}));

export default useIssuesStore;
