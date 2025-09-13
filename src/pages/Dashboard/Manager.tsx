// src/pages/Dashboard/Manager.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import ManagerDashboardContent from "./ManagerDashboardContent";
import { Roles } from "../../roles";

export default function Manager() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

