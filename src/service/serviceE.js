// src/service/service.js
import axiosInstance from './axiosInstance';

// Role Management Services
export const createRole = async (roleData) => {
  const response = await axiosInstance.post('/roles', roleData);
  return response.data;
};

export const getRoles = async () => {
  const response = await axiosInstance.get('/roles');
  return response.data;
};

export const updateRole = async (roleId, roleData) => {
  const response = await axiosInstance.put(`/roles/${roleId}`, roleData);
  return response.data;
};

export const deleteRole = async (roleId) => {
  const response = await axiosInstance.delete(`/roles/${roleId}`);
  return response.data;
};

// Permission Management Services
export const createPermission = async (permissionData) => {
  const response = await axiosInstance.post('/permissions', permissionData);
  return response.data;
};

export const getPermissions = async () => {
  const response = await axiosInstance.get('/permissions');
  return response.data;
};

export const updatePermission = async (permissionId, permissionData) => {
  const response = await axiosInstance.put(`/permissions/${permissionId}`, permissionData);
  return response.data;
};

export const deletePermission = async (permissionId) => {
  const response = await axiosInstance.delete(`/permissions/${permissionId}`);
  return response.data;
};

// User Moderation Services
export const assignRoleToUser = async (userId, roleName) => {
  const response = await axiosInstance.put(`/users/${userId}/assign-role`, { roleName });
  return response.data;
};

export const updateUserEngagementPermissions = async (userId, permissions) => {
  const response = await axiosInstance.put(`/users/${userId}/engagement-permissions`, { permissions });
  return response.data;
};

export const banUser = async (userId) => {
  const response = await axiosInstance.put(`/users/${userId}/ban`);
  return response.data;
};

export const unbanUser = async (userId) => {
  const response = await axiosInstance.put(`/users/${userId}/unban`);
  return response.data;
};

// Post Services
export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post('/posts', postData);
  return response.data;
};

export const editPost = async (postId, postData) => {
  const response = await axiosInstance.put(`/moderation/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/moderation/posts/${postId}`);
  return response.data;
};

// Comment Services
export const fetchComments = async (postId, page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/comments/posts/${postId}/comments?page=${page}&limit=${limit}`);
  return response.data;
};

export const createComment = async (postId, commentData) => {
  const response = await axiosInstance.post(`/comments/posts/${postId}/comments`, commentData);
  return response.data;
};

export const editComment = async (commentId, commentData) => {
  const response = await axiosInstance.put(`/moderation/comments/${commentId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/moderation/comments/${commentId}`);
  return response.data;
};
