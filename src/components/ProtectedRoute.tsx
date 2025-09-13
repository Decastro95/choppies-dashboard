import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ instead of next/router
import { useAuth } from "../context/AuthContext"; // ✅ correct path
import { Role } from "../../roles"; // ✅ roles.ts is in project root

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!allowedRoles.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, allowedRoles, navigate]);

  if (!user || !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
}
