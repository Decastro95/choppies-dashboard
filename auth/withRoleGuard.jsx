import React from "react";
import Unauthorized from "./Unauthorized";
import { useAuth } from "../context/AuthContext";

export default function withRoleGuard(Component, allowedRoles) {
  return function RoleProtected(props) {
    const { user } = useAuth();

    if (!user) {
      return <Unauthorized />;
    }

    const hasAccess = allowedRoles.includes(user.role);
    return hasAccess ? <Component {...props} /> : <Unauthorized />;
  };
}
