// // src/routes/PrivateRoute.js
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuthStore from '../store/store';

// const PrivateRoute = () => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default PrivateRoute;


// src/routes/EnhancedPrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/store';
import useEngagementStore from '../store/engagementStore';

const PrivateRoute = ({ requiredPermissions = [] }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userPermissions = useEngagementStore((state) => state.permissions);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // If no permissions are required, allow access
  if (requiredPermissions.length === 0) {
    return <Outlet />;
  }
  const hasPermissions = requiredPermissions.every((perm) => userPermissions.includes(perm));

  if (!hasPermissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
