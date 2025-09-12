import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * HOC to protect routes by role.
 * Usage:
 *   const AdminPage = withRoleGuard(["admin"])(() => <div>Admin only</div>);
 */
export default function withRoleGuard(allowedRoles) {
  return function GuardedComponent(Component) {
    return function Wrapped(props) {
      const { user, role } = useAuth();

      if (!user) {
        return <Navigate to="/login" replace />;
      }

      if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
      }

      return <Component {...props} />;
    };
  };
}
