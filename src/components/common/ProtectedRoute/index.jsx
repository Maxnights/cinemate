import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  const isGuest = user?.guest;

  if (!user && !isGuest) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
}
