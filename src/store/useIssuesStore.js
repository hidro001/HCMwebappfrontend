// src/store/useIssuesStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  addIssue,
  updateIssue,
  deleteIssue,
  updateIssueStatus,
  getCommentsForIssue,
  postCommentOnIssue,
  fetchDepartmentIssues, // Make sure you imported it
  fetchAllIssues,
  fetchOwnIssues
} from "../service/issueService";

const useIssuesStore = create((set, get) => ({
  // ----- State -----
  issues: [],
  loading: false,
  error: null,
  selectedIssue: null, // If you want to store the current selected issue
  comments: [], // Comments for selected issue
  isCommentLoading: false, // If comment fetch is in progress

  // ----- Actions -----
  // 1) Fetch department issues
  fetchDeptIssues: async () => {
    set({ loading: true, error: null });
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const response = await fetchDepartmentIssues();
      if (response.success) {
        set({ issues: response.data });
      } else {
        throw new Error(response.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },

  //fetch all issue
  fetchAllIssues: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchAllIssues();
      if (response.success) {
        set({ issues: response.data });
      } else {
        throw new Error(response.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },
  fetchOwnIssues: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchOwnIssues();
      if (response.success) {
        set({ issues: response.data });
      } else {
        throw new Error(response.message || "Failed to fetch issues");
      }
    } catch (err) {
      set({ error: err?.message });
      toast.error(err?.message);
    } finally {
      set({ loading: false });
    }
  },

  createIssue: async (payload) => {
    // payload may contain 'attachment' (File) + text fields
    try {
      set({ loading: true });
      const res = await addIssue(payload);
      if (res.success && res.data) {
        set((state) => ({ issues: [...state.issues, res.data] }));
        toast.success("Issue created successfully!");
      } else {
        throw new Error(res.message || "Failed to create issue");
      }
    } catch (err) {
        console.log(err)
      toast.error(err.message || "Error creating issue");

    } finally {
      set({ loading: false });
    }
  },

  editIssue: async (issueId, payload) => {
    // payload may contain 'attachment' (File) + text fields
    try {
      set({ loading: true });
      const res = await updateIssue(issueId, payload);
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

  // 4) Delete an Issue
  removeIssue: async (issueId) => {
    try {
      set({ loading: true });
      const res = await deleteIssue(issueId);
      if (res.success) {
        set((state) => ({
          issues: state.issues.filter((iss) => iss._id !== issueId),
        }));
        toast.success("Issue deleted successfully!");
      } else {
        throw new Error(res.message || "Failed to delete issue");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  // 5) Update Issue Status Only
  changeIssueStatus: async (issueId, statusPayload) => {
    try {
      set({ loading: true });
      const res = await updateIssueStatus(issueId, statusPayload);
      if (res.success && res.data) {
        set((state) => ({
          issues: state.issues.map((iss) =>
            iss._id === issueId ? res.data : iss
          ),
        }));
        toast.success(`Issue status updated to ${res.data.issueStatus}`);
      } else {
        throw new Error(res.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  // ----- Comments -----
  fetchComments: async (issueId) => {
    set({ isCommentLoading: true, comments: [] });
    try {
      const res = await getCommentsForIssue(issueId);
      if (res.success && Array.isArray(res.data)) {
        set({ comments: res.data });
      } else {
        throw new Error(res.message || "Failed to fetch comments");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCommentLoading: false });
    }
  },

  postComment: async (issueId, commentText) => {
    try {
      set({ isCommentLoading: true });
      const res = await postCommentOnIssue(issueId, commentText);
      if (res.success && res.data) {
        // Insert the newly added comment into local store
        set((state) => ({
          comments: [...state.comments, res.data],
        }));
        toast.success("Comment added successfully!");
      } else {
        throw new Error(res.message || "Failed to add comment");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCommentLoading: false });
    }
  },
}));

export default useIssuesStore;
