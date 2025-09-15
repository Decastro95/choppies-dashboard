import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function withRoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user || !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}
