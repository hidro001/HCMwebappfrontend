// // src/routes/PrivateRoute.js
//

// ;
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuthStore from '../store/store';

// const PrivateRoute = () => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default PrivateRoute;

// src/components/common/PrivateRoute.js

// import { Navigate, Outlet } from 'react-router-dom';
// import useAuthStore from '../store/store';
// import useEngagementStore from '../store/store';

// const PrivateRoute = ({ requiredPermissions = [] }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const userPermissions = useEngagementStore((state) => state.permissions);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If no permissions are required, allow access
//   if (requiredPermissions.length === 0) {
//     return <Outlet />;
//   }

//   const hasPermissions = requiredPermissions.every((perm) =>
//     userPermissions.includes(perm)
//   );

//   if (!hasPermissions) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;

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
