import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!admin || admin.role !== "admin" || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtected;
