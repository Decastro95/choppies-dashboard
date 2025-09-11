import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function withRoleGuard(Component, allowedRole) {
  return function GuardedComponent(props) {
    const { role } = useAuth();
    if (role !== allowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
    return <Component {...props} />;
  };
}
