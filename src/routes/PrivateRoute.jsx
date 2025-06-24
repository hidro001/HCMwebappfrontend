

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../store/store";
import useEngagementStore from "../store/store";

const PrivateRoute = ({ requiredPermissions = [] }) => {
  const { isAuthenticated, logout } = useAuthStore();
  const userPermissions = useEngagementStore((s) => s.permissions);

  // 1) Raw token check
  const token = localStorage.getItem("accessToken");
  if (!token) {
    logout();
    return <Navigate to="/" replace />;
  }

  // 2) Decode & expiry check
  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      logout();
      return <Navigate to="/" replace />;
    }
  } catch {
    logout();
    return <Navigate to="/" replace />;
  }

  // 3) Zustand flag double-check
  if (!isAuthenticated) {
    logout();
    return <Navigate to="/" replace />;
  }

  // 4) Permissions guard
  if (requiredPermissions.length) {
    const ok = requiredPermissions.every((p) => userPermissions.includes(p));
    if (!ok) return <Navigate to="/unauthorized" replace />;
  }

  // ✅ All good
  return <Outlet />;
};

export default PrivateRoute;
