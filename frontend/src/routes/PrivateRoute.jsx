// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(auth.role)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
