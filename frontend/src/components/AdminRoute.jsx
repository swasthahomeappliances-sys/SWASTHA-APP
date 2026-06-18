// src/components/AdminRoute.jsx

import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const adminToken =
    localStorage.getItem(
      "adminToken"
    );

  return adminToken
    ? children
    : <Navigate to="/admin/login" />;
}

export default AdminRoute;