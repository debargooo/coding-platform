import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  // 🚀 Prevent redirect while checking token in cookies
  if (authToken === null) {
    return null; // Or show a loading spinner
  }

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
