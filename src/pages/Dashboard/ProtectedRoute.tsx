import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { Roles } from "../roles"; // adjust path if needed

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (!allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [user, role]);

  if (!user || !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}