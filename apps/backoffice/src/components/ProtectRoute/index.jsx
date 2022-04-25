import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectPath = '/login', children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  if (children) {
    return children;
  }
  return <Outlet />;
}

export default ProtectedRoute;
