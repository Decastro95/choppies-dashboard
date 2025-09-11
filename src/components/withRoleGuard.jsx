import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // adjust path if needed

/**
 * Higher-order component that restricts access based on user role.
 *
 * @param {React.ComponentType} Component - The component to protect
 * @param {string} allowedRole - The role allowed to access this component
 */
export default function withRoleGuard(Component, allowedRole) {
  return function RoleGuardWrapper(props) {
    const { role } = useAuth();

    if (role !== allowedRole) {
      // React Router v6: Navigate replaces Redirect
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component {...props} />;
  };
}
