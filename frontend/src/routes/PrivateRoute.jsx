import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(auth.role)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
