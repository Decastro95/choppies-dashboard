import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Cashier from "./pages/Cashier";
import Ceo from "./pages/Ceo";
import Unauthorized from "./auth/Unauthorized";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/ceo" element={<Ceo />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}

      {/* Unauthorized fallback */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
